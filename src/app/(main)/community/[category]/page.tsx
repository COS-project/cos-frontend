'use client';

import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import React, { SVGProps, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import RoundFilter from '@/components/community/RoundFilter';
import WriteButton from '@/components/community/WriteButton';
import WriteExplanationPost from '@/components/community/WriteExplanationPost';
import WriteNormalPost from '@/components/community/WriteNormalPost';
import WriteTipPost from '@/components/community/WriteTipPost';
import YearFilter from '@/components/community/YearFilter';
import MyPageFilter from '@/components/mypage/MyPageFilter';
import MyWritingMenu from '@/components/mypage/MyWritingMenu';
import Post from '@/components/mypage/Post';
import useDebounce from '@/hooks/useDebounce';
import useGetCommentarySearchResults from '@/lib/hooks/useGetCommentarySearchResults';
import useGetMockExams from '@/lib/hooks/useGetMockExams';
import useGetMockExamYears from '@/lib/hooks/useGetMockExamYears';
import useGetTotalSearchResults from '@/lib/hooks/useGetTotalSearchResults';
import { commentarySearchQuestionSequence } from '@/recoil/community/atom';
import { BoardType, PostType, ResponsePostType } from '@/types/community/type';
import { filterNormalAndTipContent } from '@/utils/community/FilterContent';

export default function CommunityCategoryPage() {
  const [ref, inView] = useInView();
  //필터값
  const [isOpenNormalAndTipFilter, setIsOpenNormalAndTipFilter] = useState<boolean>(false);
  const [isOpenCommentaryYearFilter, setIsOpenCommentaryYearFilter] = useState<boolean>(false);
  const [isOpenCommentaryRoundFilter, setIsOpenCommentaryRoundFilter] = useState<boolean>(false);
  const [selectedNormalAndTipFilterContent, setSelectedNormalAndTipFilterContent] = useState<string>('최신순');
  const [selectedCommentaryYearFilterContent, setSelectedCommentaryYearFilterContent] = useState<number | string>(
    '전체',
  );
  const [selectedCommentaryRoundFilterContent, setSelectedCommentaryRoundFilterContent] = useState<number | string>(
    '전체',
  );
  const [sortKey, setSortKey] = useState<string>('createdAt'); //최신순 인기순
  const { examYears } = useGetMockExamYears(); //해설 년도 필터값
  const { mockExams } = useGetMockExams(1, selectedCommentaryYearFilterContent); //해설 회차 필터값
  //보드 타입
  const [boardType, setBoardType] = useState<BoardType>('COMMENTARY');
  const { userPostsList, setSize } = useGetTotalSearchResults(boardType, 1, sortKey);
  const [boardTypeForPost, setBoardTypeForPost] = useState<BoardType>('COMMENTARY');
  //글쓰기 버튼
  const [isClickedWriteButton, setIsClickedWriteButton] = useState(false);
  const router = useRouter();
  //해설 게시글 검색
  const [searchValue, setSearchValue] = useRecoilState<number>(commentarySearchQuestionSequence);
  const debouncedValue = useDebounce<number>(searchValue, 100);
  const { commentarySearchResults } = useGetCommentarySearchResults(
    1,
    selectedCommentaryYearFilterContent,
    selectedCommentaryRoundFilterContent,
    searchValue,
  );

  /**
   * 전체를 선택했을 경우 회차 선택되지 않도록
   */
  const controlDisabledFilter = () => {
    if (selectedCommentaryYearFilterContent === '전체') {
      return true;
    } else {
      return false;
    }
  };

  /**
   * 무한 스크롤 뷰 감지하고 size+1 해줌
   */
  const getMoreItem = useCallback(async () => {
    if (userPostsList) {
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
      setSortKey('createdAt');
    } else if (selectedNormalAndTipFilterContent == '인기순') {
      setSortKey('likeCount');
    }
  }, [selectedNormalAndTipFilterContent]);

  /**
   * boardType 이 변경되면 필터값 초기화
   */
  useEffect(() => {
    setSelectedNormalAndTipFilterContent('최신순');
    setSelectedCommentaryYearFilterContent('전체');
  }, [boardType]);

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

  const onMoveSrearchPage = () => {
    router.push('/search');
  };

  const commentaryTopElement = (year: number, round: number, number: number) => {
    return (
      <div className={'flex gap-x-[6px] pb-3'}>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{year}년도</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{round}회차</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{number}번</div>
      </div>
    );
  };

  const tipTopElement = () => {
    return (
      <div className={'pb-2'}>
        <div className={'px-3 py-[2px] text-white bg-primary rounded-full w-fit font-light'}>BEST</div>
      </div>
    );
  };

  const updateFilterByPostType = () => {
    if (boardType === 'NORMAL' || boardType === 'TIP') {
      return (
        <div>
          <div className={' w-fit flex px-3 py-1 rounded-full bg-white '}>
            <span className={'text-gray4 text-h6'}>{selectedNormalAndTipFilterContent}</span>
            {isOpenNormalAndTipFilter ? (
              <ActivationIcon onClick={() => setIsOpenNormalAndTipFilter(!isOpenNormalAndTipFilter)} />
            ) : (
              <DisableIcon onClick={() => setIsOpenNormalAndTipFilter(!isOpenNormalAndTipFilter)} />
            )}
          </div>
          {isOpenNormalAndTipFilter ? (
            <MyPageFilter
              isOpenFilter={isOpenNormalAndTipFilter}
              setSelectedFilterContent={setSelectedNormalAndTipFilterContent}
              setIsOpenFilter={setIsOpenNormalAndTipFilter}
              data={filterNormalAndTipContent}
            />
          ) : null}
        </div>
      );
    } else if (boardType === 'COMMENTARY') {
      return (
        <div className={'flex gap-x-2'}>
          {/*년도 필터*/}
          <div className={'flex-shrink-0 w-fit flex px-3 py-1 rounded-full bg-white '}>
            <span className={'text-gray4 text-h6'}>{selectedCommentaryYearFilterContent}년도</span>
            {isOpenCommentaryYearFilter ? (
              <ActivationIcon onClick={() => setIsOpenCommentaryYearFilter(!isOpenCommentaryYearFilter)} />
            ) : (
              <DisableIcon onClick={() => setIsOpenCommentaryYearFilter(!isOpenCommentaryYearFilter)} />
            )}
          </div>
          {isOpenCommentaryYearFilter ? (
            <YearFilter
              isOpenFilter={isOpenCommentaryYearFilter}
              setSelectedFilterContent={setSelectedCommentaryYearFilterContent}
              setIsOpenFilter={setIsOpenCommentaryYearFilter}
              data={examYears}
            />
          ) : null}

          {/*회차 필터*/}
          <button
            disabled={controlDisabledFilter()}
            className={'flex-shrink-0 w-fit flex px-3 py-1 rounded-full bg-white '}>
            <span className={'text-gray4 text-h6'}>{selectedCommentaryRoundFilterContent}회차</span>
            {isOpenCommentaryRoundFilter ? (
              <ActivationIcon onClick={() => setIsOpenCommentaryRoundFilter(!isOpenCommentaryRoundFilter)} />
            ) : (
              <DisableIcon onClick={() => setIsOpenCommentaryRoundFilter(!isOpenCommentaryRoundFilter)} />
            )}
          </button>
          {isOpenCommentaryRoundFilter ? (
            <RoundFilter
              isOpenFilter={isOpenCommentaryRoundFilter}
              setSelectedFilterContent={setSelectedCommentaryRoundFilterContent}
              setIsOpenFilter={setIsOpenCommentaryRoundFilter}
              data={mockExams}
            />
          ) : null}

          {/*문제 번호 검색 필터*/}
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className={'flex items-center gap-x-1 py-1 px-3 bg-white rounded-full w-fit'}>
            <input
              value={searchValue}
              type={'number'}
              onChange={(e) => {
                setSearchValue(parseInt(e.target.value));
              }}
              className={'text-h6 text-black outline-none w-[80px] placeholder:text-gray4 border-b-[1px] border-black'}
              placeholder={'문항번호 검색'}
            />
            <QuestionSeqSearchIcon />
          </form>
        </div>
      );
    }
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
        <div className={'relative px-5 flex flex-col gap-y-4 '}>
          {/*boardType 에 따른 필터*/}
          {updateFilterByPostType()}
          <div className={'flex flex-col gap-y-4'}>
            {/*post*/}
            {boardType === 'COMMENTARY'
              ? commentarySearchResults.map((userPosts: AxiosResponse<ResponsePostType>) => {
                  return userPosts?.result.content.map((userPost: PostType) => {
                    return (
                      <div key={userPost.postId} ref={ref}>
                        <Post
                          postId={userPost.postId}
                          content={userPost.postContent.content}
                          title={userPost.postContent.title}
                          commentCount={userPost.postStatus.commentCount}
                          createdAt={'2023.7.12'}
                          imageUrl={
                            userPost.postContent.images.length !== 0 ? userPost.postContent.images[0].imageUrl : null
                          }
                          likeCount={userPost.postStatus.likeCount}
                          topElement={
                            userPost.question
                              ? commentaryTopElement(
                                  userPost.question.mockExam.examYear,
                                  userPost.question.mockExam.round,
                                  userPost.question.questionSeq,
                                )
                              : userPost.recommendTags
                              ? tipTopElement()
                              : null
                          }></Post>
                      </div>
                    );
                  });
                })
              : userPostsList
              ? userPostsList.map((userPosts: AxiosResponse<ResponsePostType>) => {
                  return userPosts?.result.content.map((userPost: PostType) => {
                    return (
                      <div key={userPost.postId} ref={ref}>
                        <Post
                          postId={userPost.postId}
                          content={userPost.postContent.content}
                          title={userPost.postContent.title}
                          commentCount={userPost.postStatus.commentCount}
                          createdAt={'2023.7.12'}
                          imageUrl={
                            userPost.postContent.images.length !== 0 ? userPost.postContent.images[0].imageUrl : null
                          }
                          likeCount={userPost.postStatus.likeCount}
                          topElement={
                            userPost.question
                              ? commentaryTopElement(
                                  userPost.question.mockExam.examYear,
                                  userPost.question.mockExam.round,
                                  userPost.question.questionSeq,
                                )
                              : userPost.recommendTags
                              ? tipTopElement()
                              : null
                          }></Post>
                      </div>
                    );
                  });
                })
              : null}
            {}
          </div>
        </div>
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
const DisableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#727375" strokeLinecap="round" d="M13.5 9 10 12 6.5 9" />
  </svg>
);
const ActivationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#727375" strokeLinecap="round" d="M6.5 12 10 9l3.5 3" />
  </svg>
);
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

const QuestionSeqSearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} fill="none" {...props}>
    <mask
      id="a"
      width={21}
      height={20}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M.646 0h20v20h-20z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#1C1B1F"
        d="m16.535 16.647-4.963-4.963a5 5 0 0 1-1.37.735q-.746.26-1.54.26-1.95 0-3.314-1.364Q3.982 9.95 3.982 8q0-1.948 1.365-3.314Q6.713 3.32 8.66 3.32q1.95 0 3.315 1.365T13.341 8q0 .817-.268 1.563a5 5 0 0 1-.727 1.346l4.963 4.963zm-7.873-5.05q1.506-.001 2.551-1.046T12.258 8t-1.045-2.551q-1.044-1.045-2.551-1.045T6.11 5.449 5.066 8t1.044 2.551 2.552 1.045"
      />
    </g>
  </svg>
);
