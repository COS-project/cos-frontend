'use client';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import QuestionContent from '@/components/exam/QuestionContent';
import { userAnswerRequests } from '@/recoil/exam/atom';
import { Question, ReviewIncorrectMockExam, UserAnswerRequests } from '@/types/global';

interface Props {
  selectOptionSeq: number;
  mockExam: ReviewIncorrectMockExam;
  correctOption: number;
  questionOptions: Question[];
  questionText: string;
  questionSeq: number;
}

const IncorrectQuestionCard = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mockExam, questionSeq, questionText, questionOptions, correctOption, selectOptionSeq } = props;
  const [userAnswer, setUserAnswer] = useRecoilState<UserAnswerRequests>(userAnswerRequests);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [selectedAnswerInThePast, setSelectedAnswerInThePast] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const resetCorrectAnswer = () => {
    if (correctAnswer === 0) {
      setCorrectAnswer(correctOption);
      disabledQuestion();
    } else {
      setCorrectAnswer(0);
      disabledQuestion();
    }
  };

  const resetSelectedAnswerInThePast = () => {
    if (selectedAnswerInThePast === 0) {
      setSelectedAnswerInThePast(selectOptionSeq);
    } else {
      setSelectedAnswerInThePast(0);
    }
  };

  const disabledQuestion = () => {
    setDisabled(!disabled);
  };

  const resetUserAnswer = () => {
    setUserAnswer((prevState) => ({
      ...prevState,
      selectOptionSeq: 0,
    }));
  };

  const toggleQuestionModal = async () => {
    resetUserAnswer();
    setSelectedAnswerInThePast(0);
    setIsOpen(!isOpen);
  };

  return (
    <div className={'flex flex-col bg-white rounded-[32px] p-5 gap-y-[8px]'}>
      <div className={'flex justify-start bg-gray0 text-gray4 text-h6 px-2 w-fit rounded-[8px] py-1'}>
        {mockExam.examYear}년도 {mockExam.round}회차 {questionSeq}번
      </div>
      <div className={'text-h3 font-semibold'}>{questionText}</div>
      <div className={'flex justify-center items-center'}>
        {isOpen ? (
          <DropUpIcon
            onClick={() => {
              toggleQuestionModal();
              setCorrectAnswer(0);
              setDisabled(false);
            }}
          />
        ) : (
          <DropDownIcon onClick={() => toggleQuestionModal()} />
        )}
      </div>

      {isOpen && (
        <div className={'flex flex-col gap-y-5'}>
          <div className={'flex flex-col gap-y-4'}>
            {questionOptions.map((question, index) => {
              return (
                <QuestionContent
                  usage={'wrongQuestion'}
                  key={index}
                  questionSequence={question.optionSequence}
                  questionContent={question.optionContent}
                  questionImage={question.optionImage}
                  questionId={questionSeq}
                  userAnswer={userAnswer}
                  setUserAnswer={setUserAnswer}
                  correctAnswer={correctAnswer}
                  disabled={disabled}
                  selectedAnswerInThePast={selectedAnswerInThePast}
                  clickedSequence={userAnswer.selectOptionSeq}></QuestionContent>
              );
            })}
          </div>
          <div className={'flex gap-x-2 justify-end'}>
            <button onClick={() => resetSelectedAnswerInThePast()} className={'border-second-button'}>
              과거의 나
            </button>
            <button onClick={() => resetCorrectAnswer()} className={'bg-blue-button'}>
              정답보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default IncorrectQuestionCard;

function DropDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={29} height={28} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M22.646 10l-8 8-8-8" stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DropUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={29} height={28} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.646 18l8-8 8 8" stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
