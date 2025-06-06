'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Header from '@/components/common/Header';
import IncorrectQuestionCard from '@/components/exam/IncorrectQuestionCard';
import WrongQuestionListSkeleton from '@/components/exam/skeleton/WrongQuestionListSkeleton';
import StopWatchActiveButton from '@/components/stopwatch/StopWatchActiveButton';
import useAllIncorrectQuestions from '@/lib/hooks/useAllIncorrectQuestions';
import { ReviewIncorrectAnswers, ReviewIncorrectAnswersContent } from '@/types/global';

const IncorrectQuestion = () => {
  const [ref, inView] = useInView();
  const { incorrectQuestions, setSize, mutate, isLoading } = useAllIncorrectQuestions();
  const [openCardId, setOpenCardId] = useState<number | null>(null); // ✅ 현재 열려있는 카드 ID

  const getMoreItem = useCallback(async () => {
    if (incorrectQuestions) {
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
      <Header headerType={'dynamic'} title={'틀린문제 모아보기'} className={'pt-10'} />
      <div className={'h-[80px]'} />
      <div className={'flex flex-col bg-gray0 p-5 gap-y-5 min-h-screen'}>
        {isLoading && <WrongQuestionListSkeleton />}
        {incorrectQuestions
          ? incorrectQuestions.map((pastWrongQuestion: ReviewIncorrectAnswers) => {
              return pastWrongQuestion.result.content.map(
                (wrongQuestion: ReviewIncorrectAnswersContent, index: number) => {
                  return (
                    <div key={index} ref={ref}>
                      <IncorrectQuestionCard
                        isOpen={openCardId === wrongQuestion.userAnswerId}
                        onToggle={() =>
                          setOpenCardId((prev) =>
                            prev === wrongQuestion.userAnswerId ? null : wrongQuestion.userAnswerId,
                          )
                        }
                        incorrectQuestionsMutate={mutate}
                        userAnswerId={wrongQuestion.userAnswerId}
                        selectOptionSeq={wrongQuestion.selectOptionSeq}
                        mockExam={wrongQuestion.question.mockExam}
                        correctOption={wrongQuestion.question.correctOption}
                        questionOptions={wrongQuestion.question.questionOptions}
                        questionText={wrongQuestion.question.questionText}
                        questionSeq={wrongQuestion.question.questionSeq}
                      />
                    </div>
                  );
                },
              );
            })
          : null}
      </div>
      <StopWatchActiveButton className={'bottom-5'} />
    </>
  );
};

export default IncorrectQuestion;
