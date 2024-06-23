import { useRouter } from 'next/navigation';
import qs from 'query-string';
import React, { SVGProps, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import RoundFilter from '@/components/community/RoundFilter';
import YearFilter from '@/components/community/YearFilter';
import Post from '@/components/mypage/Post';
import useGetCommentarySearchResults from '@/lib/hooks/useGetCommentarySearchResults';
import useGetMockExams from '@/lib/hooks/useGetMockExams';
import useGetMockExamYears from '@/lib/hooks/useGetMockExamYears';
import { BoardType, PostType, ResponsePostType } from '@/types/community/type';

interface Props {
  boardType: BoardType;
  searchValue: number;
  debouncedValue: number;
  setSearchValue: React.Dispatch<React.SetStateAction<number>>;
}
const CommentaryBoardList = (props: Props) => {
  const { boardType, debouncedValue, searchValue, setSearchValue } = props;
  const [isOpenCommentaryRoundFilter, setIsOpenCommentaryRoundFilter] = useState<boolean>(false);
  const [isOpenCommentaryYearFilter, setIsOpenCommentaryYearFilter] = useState<boolean>(false);
  const [selectedCommentaryYearFilterContent, setSelectedCommentaryYearFilterContent] = useState<number | string>(
    '전체',
  );
  const [selectedCommentaryRoundFilterContent, setSelectedCommentaryRoundFilterContent] = useState<number | string>(
    '전체',
  );
  const { examYears } = useGetMockExamYears(); //해설 년도 필터값
  const { mockExams } = useGetMockExams(1, selectedCommentaryYearFilterContent); //해설 회차 필터값
  const [ref, inView] = useInView();
  const router = useRouter();
  const { commentarySearchResults, setSize } = useGetCommentarySearchResults(
    1,
    selectedCommentaryYearFilterContent,
    selectedCommentaryRoundFilterContent,
    searchValue,
  );
  //필터 값에 '전체'를 추가하기 위한 트리거
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  /**
   * 필터 값에 '전체'를 추가하는 기능
   */
  useEffect(() => {
    if (examYears && isInitialLoad) {
      examYears.unshift('전체');
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  /**
   * 무한 스크롤 뷰 감지하고 size+1 해줌
   */
  const getMoreItem = useCallback(async () => {
    if (commentarySearchResults) {
      await setSize((prev: number) => prev + 1);
    }
    return;
  }, [setSize]);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView, getMoreItem]);

  const commentaryTopElement = (year: number, round: number, number: number) => {
    return (
      <div className={'flex gap-x-[6px] pb-3'}>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{year}년도</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{round}회차</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{number}번</div>
      </div>
    );
  };

  /**
   * 전체를 선택했을 경우 회차 선택되지 않도록
   */
  const controlDisabledFilter = () => {
    return selectedCommentaryYearFilterContent === '전체';
  };

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

  /**
   * 해설 게시판 년도 필터가 전체면 회차 필터도 전체로 변경
   */
  useEffect(() => {
    if (selectedCommentaryYearFilterContent === '전체') {
      setSelectedCommentaryRoundFilterContent('전체');
    }
  }, [selectedCommentaryYearFilterContent]);

  /**
   * boardType 이 변경되면 필터값 초기화
   */
  useEffect(() => {
    setSelectedCommentaryYearFilterContent('전체');
  }, [boardType]);

  return (
    <div className={'relative px-5 flex flex-col gap-y-4 '}>
      {/*필터*/}
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
            data={examYears}
            isOpenFilter={isOpenCommentaryYearFilter}
            setSelectedFilterContent={setSelectedCommentaryYearFilterContent}
            setIsOpenFilter={setIsOpenCommentaryYearFilter}
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
            data={mockExams}
            isOpenFilter={isOpenCommentaryRoundFilter}
            setSelectedFilterContent={setSelectedCommentaryRoundFilterContent}
            setIsOpenFilter={setIsOpenCommentaryRoundFilter}
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
      <div className={'flex flex-col gap-y-4'}>
        {commentarySearchResults.map((userPosts: ResponsePostType, index: number) => {
          return userPosts?.result.content.map((userPost: PostType, postIndex: number) => {
            const isLastElement =
              index === commentarySearchResults.length - 1 && postIndex === userPosts?.result.content.length - 1;
            return (
              <div key={userPost.postId} ref={isLastElement ? ref : null}>
                <Post
                  postId={userPost.postId}
                  content={userPost.postContent.content}
                  title={userPost.postContent.title}
                  commentCount={userPost.postStatus.commentCount}
                  createdAt={'2023.7.12'}
                  imageUrl={userPost.postContent.images.length !== 0 ? userPost.postContent.images[0].imageUrl : null}
                  likeCount={userPost.postStatus.likeCount}
                  topElement={
                    userPost.question
                      ? commentaryTopElement(
                          userPost.question.mockExam.examYear,
                          userPost.question.mockExam.round,
                          userPost.question.questionSeq,
                        )
                      : null
                  }></Post>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};
export default CommentaryBoardList;

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
