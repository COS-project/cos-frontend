'use client';

import { usePathname, useRouter } from 'next/navigation';
import qs from 'query-string';
import React, { SVGProps, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilState, useRecoilValue } from 'recoil';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import BoardTypeMenu from '@/components/community/BoardTypeMenu';
import CommentaryBoardList from '@/components/community/CommentaryBoardList';
import ExamReviewBoardList from '@/components/community/ExamReviewBoardList';
import NormalAndTipBoardList from '@/components/community/NormalAndTipBoardList';
import WriteButton from '@/components/community/WriteButton';
import WriteExplanationPost from '@/components/community/WriteExplanationPost';
import WriteNormalPost from '@/components/community/WriteNormalPost';
import WriteReviewModal from '@/components/community/WriteReviewModal';
import WriteTipPost from '@/components/community/WriteTipPost';
import StopWatchActiveButton from '@/components/stopwatch/StopWatchActiveButton';
import useDebounce from '@/hooks/useDebounce';
import useCheckReviewPeriod from '@/lib/hooks/useCheckReviewPeriod';
import useCheckReviewWriteAccess from '@/lib/hooks/useCheckReviewWriteAccess';
import useGetCommentarySearchResults from '@/lib/hooks/useGetCommentarySearchResults';
import useGetTotalSearchResults from '@/lib/hooks/useGetTotalSearchResults';
import { certificateIdAtom, certificateNameAtom } from '@/recoil/atom';
import {
  boardTypeInitAtom,
  boardTypeStateAtom,
  commentarySearchQuestionSequence,
  selectedCommentaryRoundFilterContentAtom,
  selectedCommentaryYearFilterContentAtom,
  selectedNormalAndTipFilterContentAtom,
} from '@/recoil/community/atom';
import { BoardType, SortFieldKorType, SortFieldType } from '@/types/community/type';

export default function CommunityCategoryPage() {
  const [ref, inView] = useInView();
  const certificateId = useRecoilValue(certificateIdAtom);
  const selectedCertificationName = useRecoilValue<string>(certificateNameAtom);
  //필터값
  const [selectedNormalAndTipFilterContent, setSelectedNormalAndTipFilterContent] = useRecoilState<SortFieldKorType>(
    selectedNormalAndTipFilterContentAtom,
  );
  const [selectedCommentaryYearFilterContent, setSelectedCommentaryYearFilterContent] = useRecoilState<number | string>(
    selectedCommentaryYearFilterContentAtom,
  );
  const [selectedCommentaryRoundFilterContent, setSelectedCommentaryRoundFilterContent] = useRecoilState<
    number | string
  >(selectedCommentaryRoundFilterContentAtom);
  const [sortField, setSortField] = useState<SortFieldType>('createdAt'); //최신순 인기순
  const { checkReviewPeriod, isError } = useCheckReviewPeriod(certificateId);
  //보드 타입
  const [boardType, setBoardType] = useRecoilState<BoardType>(boardTypeStateAtom);
  const { userPosts, setSize, mutate } = useGetTotalSearchResults(boardType, certificateId, sortField);
  //글쓰기 버튼
  const [isClickedWriteButton, setIsClickedWriteButton] = useState(false);
  const router = useRouter();
  //해설 게시글 검색
  const [searchValue, setSearchValue] = useRecoilState<number | undefined>(commentarySearchQuestionSequence);
  const debouncedValue = useDebounce<number | undefined>(searchValue, 100);
  const { commentarySearchResults } = useGetCommentarySearchResults(
    certificateId,
    selectedCommentaryYearFilterContent,
    selectedCommentaryRoundFilterContent,
    searchValue as number,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const { reviewWriteAccess } = useCheckReviewWriteAccess(certificateId);
  //처음 boardType 랜더링시만 -> 따끈후기 아닐 때
  const [boardTypeInit, setBoardTypeInit] = useRecoilState(boardTypeInitAtom);
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState<string | null>(null);

  useEffect(() => {
    if (prevPath !== null && pathname !== prevPath) {
      setBoardTypeInit(false); // 페이지 이동 감지 후 초기화
    }
    setPrevPath(pathname);
  }, [pathname]);

  //따끈후기 기간이 아닌 경우에는 해설 게시판이 default로 보이도록 조작
  useEffect(() => {
    if (boardTypeInit) {
      if (boardType === 'TIP' && selectedNormalAndTipFilterContent === '인기순') {
        setBoardTypeInit(false);
        return;
      }
      if (isError && isError.response.data.responseCode === 'CRT_003') {
        setBoardType('COMMENTARY');
        setBoardTypeInit(false);
      }
      if (isError && isError.response.data.responseCode === 'CRT_004') {
        setBoardType('COMMENTARY');
        setBoardTypeInit(false);
      }
      if (checkReviewPeriod && !checkReviewPeriod.result) {
        setBoardType('COMMENTARY');
        setBoardTypeInit(false);
      }
    }
  }, [isError]);

  /**
   * 무한 스크롤 뷰 감지하고 size+1 해줌
   */
  const getMoreItem = useCallback(async () => {
    if (userPosts) {
      setSize((prev: number) => prev + 1);
    }
    return;
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  /**
   * 해설 게시판 년도 필터가 전체면 회차 필터도 전체로 변경
   */
  useEffect(() => {
    if (selectedCommentaryYearFilterContent === '전체') {
      setSelectedCommentaryRoundFilterContent('전체');
    }
  }, [selectedCommentaryYearFilterContent]);

  /**
   * 일반, 꿀팁 게시판 필터
   */
  useEffect(() => {
    if (selectedNormalAndTipFilterContent == '최신순') {
      setSortField('createdAt');
    } else if (selectedNormalAndTipFilterContent == '인기순') {
      setSortField('count');
    }
  }, [selectedNormalAndTipFilterContent]);

  /**
   * 쿼리파라미터에서 검색어
   */
  useEffect(() => {
    const query = {
      keyword: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/community/1',
      query: query,
    });

    router.push(url);
  }, [debouncedValue, router, commentarySearchResults]);

  const onMoveSearchPage = () => {
    router.push('/search');
  };

  const onMoveCommunityMenuPage = () => {
    router.push('/community');
  };

  return boardType === 'COMMENTARY' && isClickedWriteButton ? (
    <WriteExplanationPost setIsClickedWriteButton={setIsClickedWriteButton} />
  ) : boardType === 'TIP' && isClickedWriteButton ? (
    <WriteTipPost setIsClickedWriteButton={setIsClickedWriteButton} mutate={mutate} />
  ) : boardType === 'NORMAL' && isClickedWriteButton ? (
    <WriteNormalPost setIsClickedWriteButton={setIsClickedWriteButton} mutate={mutate} />
  ) : (
    <div className={' bg-gray0'}>
      {reviewWriteAccess && reviewWriteAccess.result ? (
        <WriteReviewModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      ) : null}
      <Header
        headerType={'dynamic'}
        onBack={onMoveCommunityMenuPage}
        rightElement={
          <SearchIcon
            onClick={() => {
              onMoveSearchPage();
            }}
          />
        }
        className={'pt-10'}
        title={selectedCertificationName}
      />
      <div className={'h-[158px]'} />
      <div className={'flex flex-col gap-y-4 min-h-screen'}>
        {/*boardType 변경 메뉴*/}
        <BoardTypeMenu
          boardType={boardType}
          setBoardType={setBoardType}
          checkReviewPeriod={checkReviewPeriod?.result}
        />
        {/*post*/}
        {boardType === 'REVIEW' ? (
          checkReviewPeriod?.result && <ExamReviewBoardList setIsModalOpen={setIsModalOpen} />
        ) : boardType === 'COMMENTARY' ? (
          <CommentaryBoardList
            boardType={boardType}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            debouncedValue={debouncedValue as number}
          />
        ) : boardType === 'TIP' ? (
          <NormalAndTipBoardList boardType={boardType} init={boardTypeInit} />
        ) : boardType === 'NORMAL' ? (
          <NormalAndTipBoardList boardType={boardType} init={boardTypeInit} />
        ) : null}
      </div>
      {boardType === 'REVIEW' ? null : (
        <WriteButton
          setIsClickedWriteButton={setIsClickedWriteButton}
          boardType={boardType}
          setBoardTypeForPost={setBoardType}
        />
      )}
      <div className={'h-[120px] bg-gray0'} />
      <StopWatchActiveButton />
      <NavBar />
    </div>
  );
}

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={33} height={33} fill="none" {...props}>
    <mask
      id="a"
      width={33}
      height={33}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M.646.5h32v32h-32z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#1C1B1F"
        d="m26.755 27.367-8.473-8.474a7 7 0 0 1-2.306 1.349 7.8 7.8 0 0 1-2.64.468q-3.192 0-5.402-2.206T5.723 13.12 7.929 7.73t5.383-2.21 5.397 2.207 2.22 5.385q0 1.378-.492 2.692a7.2 7.2 0 0 1-1.347 2.28l8.479 8.45zm-13.424-7.785q2.722 0 4.596-1.87 1.874-1.869 1.874-4.597 0-2.727-1.874-4.597t-4.596-1.87q-2.725 0-4.603 1.87t-1.877 4.597 1.877 4.597q1.878 1.87 4.603 1.87"
      />
    </g>
  </svg>
);
