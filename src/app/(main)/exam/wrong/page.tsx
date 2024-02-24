'use client';

import { AxiosResponse } from 'axios';
import { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import IncorrectQuestionCard from '@/components/exam/IncorrectQuestionCard';
import useAllIncorrectQuestions from '@/lib/hooks/useAllIncorrectQuestions';
import { ReviewIncorrectAnswers, ReviewIncorrectAnswersContent } from '@/types/global';

const IncorrectQuestion = () => {
  const [ref, inView] = useInView();
  const { incorrectQuestions, setSize } = useAllIncorrectQuestions();

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
      <div className={'flex flex-col bg-gray0 p-5 gap-y-5'}>
        {incorrectQuestions
          ? incorrectQuestions.map((pastWrongQuestion: AxiosResponse<ReviewIncorrectAnswers>) => {
              return pastWrongQuestion.result.content.map(
                (wrongQuestion: ReviewIncorrectAnswersContent, index: number) => {
                  return (
                    <div key={index} ref={ref}>
                      <IncorrectQuestionCard
                        selectOptionSeq={wrongQuestion.selectOptionSeq}
                        mockExam={wrongQuestion.question.mockExam}
                        correctOption={wrongQuestion.question.correctOption}
                        questionOptions={wrongQuestion.question.questionOptions}
                        questionText={wrongQuestion.question.questionText}
                        questionSeq={wrongQuestion.question.questionSeq}></IncorrectQuestionCard>
                    </div>
                  );
                },
              );
            })
          : null}
      </div>
    </>
  );
};

export default IncorrectQuestion;
