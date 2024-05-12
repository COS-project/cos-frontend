import React, { type SVGProps, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import useGetExamReview from '@/lib/hooks/useGetExamReview';
import { ExamDifficulty, ReviewPost } from '@/types/community/type';
import UserActionReminder from '@/components/community/UserActionReminder';
import { useRouter } from 'next/navigation';

const ExamReviewBoardList = () => {
  const [ref, inView] = useInView();
  const { examReviews, setSize } = useGetExamReview(1);
  const router = useRouter();

  /**
   * 무한 스크롤 뷰 감지하고 size+1 해줌
   */
  const getMoreItem = useCallback(async () => {
    if (examReviews) {
      await setSize((prev: number) => prev + 1);
    }
    return;
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  useEffect(() => {
    console.log('examReviews', examReviews);
  }, [examReviews]);

  const changeTagForExamDifficulty = (examDifficulty: ExamDifficulty) => {
    if (examDifficulty === 'TOO_EASY') {
      return <div className={'px-[10px] py-[2px] bg-[#49D8F8] text-white rounded-full text-h6'}>너무 쉬워요</div>;
    } else if (examDifficulty === 'EASY') {
      return <div className={'px-[10px] py-[2px] bg-[#4BEA3E] text-white rounded-full text-h6'}>쉬워요</div>;
    } else if (examDifficulty === 'NORMAL') {
      return <div className={'px-[10px] py-[2px] bg-[#F8BC49] text-white rounded-full text-h6'}>보통이에요</div>;
    } else if (examDifficulty === 'LITTLE_DIFFICULT') {
      return <div className={'px-[10px] py-[2px] bg-[#F89249] text-white rounded-full text-h6'}>조금 어려워요</div>;
    } else {
      return <div className={'px-[10px] py-[2px] bg-[#49D8F8] text-white rounded-full text-h6'}>어려워요</div>;
    }
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear(); // 연도
    const month = date.getMonth() + 1; // 월 (getMonth()는 0에서 시작하므로 +1)
    const day = date.getDate(); // 일

    // 숫자가 한 자리일 경우, 앞에 '0'을 붙여 두 자리로 만듦
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}.${formattedMonth}.${formattedDay}`;
  };

  const userActionReminderMove = () => {
    return (
      <button
        className={'px-3 py-1 rounded-full bg-white w-fit flex items-center'}
        onClick={() => router.push('/home/goal-setting')}>
        <div className={'text-second text-h6'}>따끈 후기 작성</div>
        <MoveIcon />
      </button>
    );
  };

  return (
    <div className={'relative px-5 flex flex-col gap-y-4 '}>
      {/**/}
      <UserActionReminder content={'크루들에게 따끈후기를 공유해주세요!'} button={userActionReminderMove()} />
      <div className={'flex flex-col gap-y-4'}>
        {examReviews
          ? examReviews.map((examReview) => {
              return examReview?.result.content.map((review: ReviewPost, index: number) => {
                return (
                  <div key={index} ref={ref} className={'flex flex-col gap-y-1 py-4 px-5 rounded-[32px] bg-white'}>
                    <div className={'flex flex-col gap-y-3'}>
                      <div className={'w-full flex items-center gap-x-[6px]'}>
                        <div className={'flex items-center gap-x-[9px]'}>
                          <div className={'truncate text-gray4 text-h6'}>{review.user.nickname}</div>
                          <div
                            className={'rounded-full border-[1px] border-gray2 py-[2px] px-[10px] text-gray4 text-h6'}>
                            준비기간 3개월
                          </div>
                        </div>
                        {changeTagForExamDifficulty(review.examDifficulty)}
                      </div>
                      <div className={''}>{review.content}</div>
                    </div>
                    <div className={'text-gray3 text-h6'}>작성일 {formatDate(new Date(review.createdAt))}</div>
                  </div>
                );
              });
            })
          : null}
      </div>
    </div>
  );
};
export default ExamReviewBoardList;

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path stroke="#6283FD" strokeLinecap="round" strokeLinejoin="round" d="m5 11 6-6M5 5h6v6" />
  </svg>
);
