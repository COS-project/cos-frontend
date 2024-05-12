'use client';

import { useRouter } from 'next/navigation';
import React, { SVGProps, useState } from 'react';
import { useRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import CommentaryBoardList from '@/components/community/CommentaryBoardList';
import ExamReviewBoardList from '@/components/community/ExamReviewBoardList';
import NormalAndTipBoardList from '@/components/community/NormalAndTipBoardList';
import WriteButton from '@/components/community/WriteButton';
import WriteExplanationPost from '@/components/community/WriteExplanationPost';
import WriteNormalPost from '@/components/community/WriteNormalPost';
import WriteTipPost from '@/components/community/WriteTipPost';
import MyWritingMenu from '@/components/mypage/MyWritingMenu';
import useDebounce from '@/hooks/useDebounce';
import { boardTypeState, commentarySearchQuestionSequence } from '@/recoil/community/atom';
import { BoardType } from '@/types/community/type';

export default function CommunityCategoryPage() {
  //보드 타입
  const [boardType, setBoardType] = useRecoilState<BoardType>(boardTypeState);
  const [boardTypeForPost, setBoardTypeForPost] = useState<BoardType>('REVIEW');
  //글쓰기 버튼
  const [isClickedWriteButton, setIsClickedWriteButton] = useState(false);
  const router = useRouter();
  //해설 게시글 검색
  const [searchValue, setSearchValue] = useRecoilState<number>(commentarySearchQuestionSequence);
  const debouncedValue = useDebounce<number>(searchValue, 100);

  const onMoveSrearchPage = () => {
    router.push('/search');
  };

  return boardTypeForPost === 'COMMENTARY' && isClickedWriteButton ? (
    <WriteExplanationPost />
  ) : boardTypeForPost === 'TIP' && isClickedWriteButton ? (
    <WriteTipPost />
  ) : boardTypeForPost === 'NORMAL' && isClickedWriteButton ? (
    <WriteNormalPost />
  ) : (
    <>
      <Header
        headerType={'dynamic'}
        rightElement={
          <SearchIcon
            onClick={() => {
              onMoveSrearchPage();
            }}
          />
        }
        title={'정보처리기사 게시판'} //TODO: 게시판 내용으로 바꿀 예정
      />
      <div className={'flex flex-col gap-y-4 bg-gray0 min-h-screen'}>
        {/*boardType 변경 메뉴*/}
        <MyWritingMenu boardType={boardType} setBoardType={setBoardType} />
        {/*post*/}
        {boardType === 'REVIEW' ? (
          <ExamReviewBoardList />
        ) : boardType === 'COMMENTARY' ? (
          <CommentaryBoardList
            boardType={boardType}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            debouncedValue={debouncedValue}
          />
        ) : boardType === 'TIP' ? (
          <NormalAndTipBoardList boardType={boardType} />
        ) : boardType === 'NORMAL' ? (
          <NormalAndTipBoardList boardType={boardType} />
        ) : null}
      </div>
      {boardTypeForPost === 'REVIEW' ? null : (
        <WriteButton
          setIsClickedWriteButton={setIsClickedWriteButton}
          boardType={boardType}
          setBoardTypeForPost={setBoardTypeForPost}
        />
      )}
      <NavBar />
    </>
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
