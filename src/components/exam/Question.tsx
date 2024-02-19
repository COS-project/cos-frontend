import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import QuestionContent from '@/components/exam/QuestionContent';
import useMockExamQuestions from '@/lib/hooks/useMockExamQuestions';
import { subjectResultRequestsList, userAnswerRequests } from '@/recoil/exam/atom';
import { Question, UserAnswerRequests } from '@/types/global';

import { AllQuestionModal } from './AllQuestionModal';

const Question = () => {
  //problemidx = 0
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [allQuestionModalIsOpen, setAllQuestionModalIsOpen] = useState(false);

  const { questions, isLoading, isError } = useMockExamQuestions();

  const [userAnswer, setUserAnswer] = useRecoilState<UserAnswerRequests>(userAnswerRequests);
  const [userAnswerList, setUserAnswerList] = useRecoilState<UserAnswerRequests[]>(subjectResultRequestsList);

  const toggleQuestionModal = () => {
    setAllQuestionModalIsOpen(!allQuestionModalIsOpen);
  };

  /**
   * resultList에 답을 추가하는 함수.
   * resultList에 questionId가 없어야만 추가될 수 있음.
   */
  const addUserAnswerToUserAnswerList = async () => {
    return new Promise((resolve) => {
      if (!userAnswerList.map((item) => item.questionId).includes(questionIdx + 1)) {
        setUserAnswerList((prevState) => {
          const newState = [...prevState, userAnswer];
          resolve(newState); // Promise가 resolve되는 시점
          return newState;
        });
      } else {
        resolve(userAnswerList); // 이미 존재하는 경우 현재 상태를 그대로 resolve
      }
    });
  };

  /**
   * 다음으로 넘어갈 때, 선택지를 0으로 초기화하는 함수
   */
  const resetUserAnswerForNextQuestion = () => {
    return new Promise((resolve) => {
      setUserAnswer((prevState) => ({
        ...prevState,
        questionId: questionIdx + 2,
        selectOption: 0,
      }));
    });
  };

  /**
   * 기존에 선택한 답과 현재 선택한 답이 다르면 그 값으로 수정해주는 함수
   */
  const updateUserAnswerInUserAnswerList = () => {
    if (userAnswerList[questionIdx]) {
      if (userAnswer.selectOption !== userAnswerList[questionIdx].selectOption) {
        setUserAnswerList((prevResultList) => {
          const updatedFirstItem = { ...prevResultList[questionIdx], selectOption: userAnswer.selectOption };

          // 변경된 첫 번째 요소와 나머지 요소들을 포함하는 새로운 배열 생성
          const updatedResultList: UserAnswerRequests[] = [
            ...prevResultList.slice(0, questionIdx),
            updatedFirstItem,
            ...prevResultList.slice(questionIdx + 1),
          ];

          return updatedResultList; // 새로운 resultList로 상태 업데이트
        });
      }
    }
  };

  useEffect(() => {
    if (userAnswer.selectOption != 0) {
      addUserAnswerToUserAnswerList();
    }
  }, [userAnswer]);

  useEffect(() => {
    if (userAnswer.selectOption != 0) {
      updateUserAnswerInUserAnswerList();
    }
  }, [userAnswer]);

  return (
    <>
      <div className="flex flex-col gap-y-2 m-5 mt-[28px]">
        <div className={'flex text-h3 text-gray4 items-center font-bold'} onClick={toggleQuestionModal}>
          {questionIdx + 1}/{questions?.length}번
          <button className={'text-h3 text-black'}>
            {allQuestionModalIsOpen ? <EnabledIcon /> : <DisabledIcon />}
          </button>
        </div>

        {/*문제 선지 session*/}
        <div className="flex flex-col gap-y-8">
          <div className="text-h3 font-semibold">{questions ? questions[questionIdx].questionText : null}</div>
          <div className="flex flex-col gap-y-4">
            {questions
              ? questions[questionIdx].questionOptions.map((option: Question) => {
                  return (
                    <QuestionContent
                      key={option.optionSequence}
                      questionId={questions[questionIdx].questionId}
                      questionContent={option.optionContent}
                      questionImage={option.optionImage ? option.optionImage : null}
                      questionSequence={option.optionSequence}
                      setUserAnswer={setUserAnswer}
                      addSubjectResultRequests={addUserAnswerToUserAnswerList}
                      clickedSequence={
                        userAnswerList[questionIdx] ? userAnswerList[questionIdx].selectOption : userAnswer.selectOption
                      }></QuestionContent>
                  );
                })
              : null}
          </div>
        </div>
      </div>

      {/*이동 버튼*/}
      <div className={'absolute bottom-[8px] right-[20px] left-[20px] '}>
        {questionIdx + 1 === 1 ? (
          <button
            onClick={() => {
              setQuestionIdx((prev) => prev + 1);
              resetUserAnswerForNextQuestion();
              if (userAnswer.selectOption === 0) {
                addUserAnswerToUserAnswerList();
              }
            }}
            className={'relative w-full rounded-[16px] bg-blue text-white p-4'}>
            다음
            <NextIcon className={'absolute right-5 bottom-[18px]'}></NextIcon>
          </button>
        ) : questionIdx + 1 === questions?.length ? (
          <button
            className={'relative w-full rounded-[16px] text-blue p-4 border-blue border-[1px]'}
            onClick={() => setQuestionIdx((prev) => prev - 1)}>
            <BeforeIcon className={'absolute left-5 bottom-[18px]'}></BeforeIcon>
            이전
          </button>
        ) : (
          <div className={'flex gap-x-3'}>
            <button
              className={'relative w-full rounded-[16px] text-blue p-4 border-blue border-[1px]'}
              onClick={() => setQuestionIdx((prev) => prev - 1)}>
              <BeforeIcon className={'absolute left-5 bottom-[18px]'}></BeforeIcon>
              이전
            </button>
            <button
              className={'relative w-full rounded-[16px] bg-blue text-white p-4'}
              onClick={() => {
                setQuestionIdx((prev) => prev + 1);
                resetUserAnswerForNextQuestion();
                if (userAnswer.selectOption === 0) {
                  addUserAnswerToUserAnswerList();
                }
              }}>
              다음
              <NextIcon className={'absolute right-5 bottom-[18px]'}></NextIcon>
            </button>
          </div>
        )}
        {allQuestionModalIsOpen ? <AllQuestionModal toggleQuestionModal={toggleQuestionModal} /> : null}
      </div>
    </>
  );
};

export default Question;

function DisabledIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={28} height={28} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M22 10l-8 8-8-8" stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EnabledIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={28} height={28} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 18l8-8 8 8" stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.5 5l5 5-5 5" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BeforeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12.5 15l-5-5 5-5" stroke="#6283FD" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
