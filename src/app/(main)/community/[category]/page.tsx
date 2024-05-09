'use client';

import { AxiosResponse } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { SVGProps, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import WriteButton from '@/components/community/WriteButton';
import WriteExplanationPost from '@/components/community/WriteExplanationPost';
import WriteNormalPost from '@/components/community/WriteNormalPost';
import WriteTipPost from '@/components/community/WriteTipPost';
import MyPageFilter from '@/components/mypage/MyPageFilter';
import MyWritingMenu from '@/components/mypage/MyWritingMenu';
import Post from '@/components/mypage/Post';
import useGetTotalSearchResults from '@/lib/hooks/useGetTotalSearchResults';
import { BoardType, PostType, ResponsePostType } from '@/types/community/type';
import { filterNormalAndTipContent } from '@/utils/community/FilterContent';
import useGetMockExamYears from '@/lib/hooks/useGetMockExamYears';
import YearFilter from '@/components/community/YearFilter';
import useGetMockExams from '@/lib/hooks/useGetMockExams';
import RoundFilter from '@/components/community/RoundFilter';
import qs from 'query-string';
import useDebounce from '@/hooks/useDebounce';
import { useRecoilState } from 'recoil';
import { autoCompleteSearchKeywordState } from '@/recoil/community/atom';
import { getSearchResults } from '@/lib/api/community';
import useGetRecentSearchResults from '@/lib/hooks/useGetRecentSearchResults';

export default function CommunityCategoryPage() {
  const [ref, inView] = useInView();
  const parameter = useSearchParams();
  const [isOpenNormalAndTipFilter, setIsOpenNormalAndTipFilter] = useState<boolean>(false);
  const [isOpenCommentaryYearFilter, setIsOpenCommentaryYearFilter] = useState<boolean>(false);
  const [isOpenCommentaryRoundFilter, setIsOpenCommentaryRoundFilter] = useState<boolean>(false);
  const [selectedNormalAndTipFilterContent, setSelectedNormalAndTipFilterContent] = useState<string>('최신순');
  const [selectedCommentaryYearFilterContent, setSelectedCommentaryYearFilterContent] = useState<number>(2023);
  const [selectedCommentaryRoundFilterContent, setSelectedCommentaryRoundFilterContent] = useState<number>(1);
  const [boardType, setBoardType] = useState<BoardType>('TIP');
  const { userPostsList, setSize } = useGetTotalSearchResults(boardType, 1);
  const [boardTypeForPost, setBoardTypeForPost] = useState<BoardType>('TIP');
  const [isClickedWriteButton, setIsClickedWriteButton] = useState(false);
  const router = useRouter();
  const { examYears } = useGetMockExamYears();
  const { mockExams } = useGetMockExams(1, selectedCommentaryYearFilterContent);
  const [searchValue, setSearchValue] = useRecoilState<string>(autoCompleteSearchKeywordState);
  const debouncedValue = useDebounce<string>(searchValue, 100);
  const { recentSearchResults, mutate } = useGetRecentSearchResults();

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await getSearchResults(1, 'COMMENTARY', debouncedValue).then((r) => console.log(r.result.content));
    await mutate();
  };

  useEffect(() => {
    const query = {
      keyword: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/search',
      query: query,
    });

    router.push(url);
  }, [debouncedValue, router]);

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
          <div className={' w-fit flex px-3 py-1 rounded-full bg-white '}>
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
          <div className={' w-fit flex px-3 py-1 rounded-full bg-white '}>
            <span className={'text-gray4 text-h6'}>{selectedCommentaryRoundFilterContent}회차</span>
            {isOpenCommentaryRoundFilter ? (
              <ActivationIcon onClick={() => setIsOpenCommentaryRoundFilter(!isOpenCommentaryRoundFilter)} />
            ) : (
              <DisableIcon onClick={() => setIsOpenCommentaryRoundFilter(!isOpenCommentaryRoundFilter)} />
            )}
          </div>
          {isOpenCommentaryRoundFilter ? (
            <RoundFilter
              isOpenFilter={isOpenCommentaryRoundFilter}
              setSelectedFilterContent={setSelectedCommentaryRoundFilterContent}
              setIsOpenFilter={setIsOpenCommentaryRoundFilter}
              data={mockExams}
            />
          ) : null}
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
        <MyWritingMenu boardType={boardType} setBoardType={setBoardType} />
        <div className={'relative px-5 flex flex-col gap-y-4 '}>
          {updateFilterByPostType()}
          <div className={'flex flex-col gap-y-4'}>
            {userPostsList
              ? userPostsList.map((userPosts: AxiosResponse<ResponsePostType>) => {
                  return userPosts.result.content.map((userPost: PostType) => {
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
