import React, { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import useGetUserPosts from '@/lib/hooks/useGetUserPosts';
import { BoardType, ReviewPost } from '@/types/community/type';

interface Props {
  boardType: BoardType;
  isDeleteWarningModalOpen: boolean;
  setIsDeleteWarningModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletePostId: React.Dispatch<React.SetStateAction<number>>;
  selectedFilterContent: '최신순' | '작성순';
}
const MyPageExamReviewBoardList = (props: Props) => {
  const { boardType,isDeleteWarningModalOpen , setIsDeleteWarningModalOpen, setDeletePostId } = props;
  const [ref, inView] = useInView();
  const { userPostsList, setSize } = useGetUserPosts(boardType);

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

  return (
    <>
      <div>
        <div className={'flex flex-col gap-y-4'}>
          따끈후기..는 없..대?
          {/*{examReviews*/}
          {/*  ? examReviews.map((examReview) => {*/}
          {/*    return examReview?.result.content.map((review: ReviewPost, index: number) => {*/}
          {/*      return (*/}
          {/*        <div key={index} ref={ref} className={'flex flex-col gap-y-1 py-4 px-5 rounded-[32px] bg-white'}>*/}
          {/*          <div className={'flex flex-col gap-y-3'}>*/}
          {/*            <div className={'w-full flex items-center gap-x-[6px]'}>*/}
          {/*              <div className={'flex items-center gap-x-[9px]'}>*/}
          {/*                <div className={'truncate text-gray4 text-h6'}>{review.user.nickname}</div>*/}
          {/*                <div*/}
          {/*                  className={'rounded-full border-[1px] border-gray2 py-[2px] px-[10px] text-gray4 text-h6'}>*/}
          {/*                  준비기간 3개월*/}
          {/*                </div>*/}
          {/*              </div>*/}
          {/*              {changeTagForExamDifficulty(review.examDifficulty)}*/}
          {/*            </div>*/}
          {/*            <div className={''}>{review.content}</div>*/}
          {/*          </div>*/}
          {/*          <div className={'text-gray3 text-h6'}>작성일 {formatDate(new Date(review.createdAt))}</div>*/}
          {/*        </div>*/}
          {/*      );*/}
          {/*    });*/}
          {/*  })*/}
          {/*  : null}*/}
        </div>
      </div>
    </>
  );
};
export default MyPageExamReviewBoardList;
