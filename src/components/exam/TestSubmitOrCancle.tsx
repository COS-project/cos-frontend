'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import useCalculateScore from '@/hooks/useCalculateScore';
import { postSubjectResultRequestsList } from '@/lib/api/exam';
import {
  mockExamIdState,
  questionIndex,
  sessionRecordedState,
  stopwatchIsPaused,
  stopwatchIsRunning,
  stopwatchTime,
  subjectResultRequestsList,
  timerIsPaused,
  userAnswerRequestsList,
} from '@/recoil/exam/atom';
import { UserAnswerRequests } from '@/types/global';

interface Props {
  isUnsavedChangesWarningModalOpen: boolean;
  setIsUnsavedChangesWarningModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitConfirmationModalOpen: boolean;
  setIsSubmitConfirmationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAutoSubmitTimeUpModalOpen: boolean;
  setIsAutoSubmitTimeUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TestSubmitOrCancle = (props: Props) => {
  const {
    isUnsavedChangesWarningModalOpen,
    setIsUnsavedChangesWarningModalOpen,
    isSubmitConfirmationModalOpen,
    setIsSubmitConfirmationModalOpen,
    isAutoSubmitTimeUpModalOpen,
    setIsAutoSubmitTimeUpModalOpen,
  } = props;
  const [selectedMockExamId, setSelectedMockExamId] = useRecoilState(mockExamIdState);
  // 남은 시간(타이머) TODO: questions[0].mockExam.timeLimit으로 변경
  const [timeLeft, setTimeLeft] = useState(5400000); //5400000
  // 각 문제당 걸린 시간
  const [time, setTime] = useRecoilState<number>(stopwatchTime);
  const [isRunning, setIsRunning] = useRecoilState<boolean>(stopwatchIsRunning);
  // 모달창을 띄우면 타이머를 잠시 멈추게 하는 state
  const [isPausedTimer, setIsPausedTimer] = useRecoilState(timerIsPaused);
  // 문제당 머문시간을 잠시 멈추는
  const [isPausedStopWatch, setIsPausedStopWatch] = useRecoilState(stopwatchIsPaused);
  const [questionIdx, setQuestionIdx] = useRecoilState<number>(questionIndex);
  const [userAnswerList, setUserAnswerList] = useRecoilState<UserAnswerRequests[]>(userAnswerRequestsList);
  const [subjectResultList, setSubjectResultList] = useRecoilState(subjectResultRequestsList)

  // 제출버튼을 눌렀을 때 제출버튼을 누르는 페이지의 머문 시간까지 기록하기 위한 트릭
  const [sessionRecorded, setSessionRecorded] = useRecoilState(sessionRecordedState);
  // 시, 분, 초 계산
  const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');
  const { calculateScore, prepareAndScoreSubjectResults } = useCalculateScore(selectedMockExamId);

  /**
   * 시험 시간 타이머 기능
   */
  useEffect(() => {
    const id = setInterval(() => {
      if (!isPausedTimer && timeLeft > 0) {
        setTimeLeft((prevCount) => (prevCount <= 0 ? 0 : prevCount - 1000)); // 1초(1000밀리초) 감소
      }
    }, 1000);

    return () => clearInterval(id); // 컴포넌트 언마운트 시 인터벌 클리어
  }, [timeLeft, isPausedTimer]);

  /**
   * 각 문제당 걸린 시간 기록 함수
   */
  const recordSessionTime = () => {
    setUserAnswerList((prevResultList) => {
      const updatedResultList: UserAnswerRequests[] = prevResultList.map((answer, index) => {
        if (index === questionIdx) {
          // 현재 질문에 대해서만 시간 업데이트
          const updatedTime = answer.takenTime === 0 ? time : answer.takenTime + time;
          return { ...answer, takenTime: updatedTime };
        }
        return answer; // 다른 질문에 대한 답변은 변경하지 않음
      });

      return updatedResultList;
    });
  };
  /**
   * 각 문제당 채점
   */
  const handleSubmit = async () => {
    calculateScore();
  };

  useEffect(() => {
    if (!isRunning) {
      recordSessionTime();
      setSessionRecorded(true); //바로 다음 useEffect 실행시키기 위한 트릭
    }
  }, [isRunning]);

  useEffect(() => {
    if (sessionRecorded) {
      handleSubmit().then((r) => console.log('제출되어 체점 완료'));
      setSessionRecorded(false); // 다시 초기 상태로 설정
    }
  }, [sessionRecorded]);

  /**
   * 채점이 다 되어 userAnswerList 에 is_correct 프로퍼티가 추가된 다음
   * prepareAndScoreSubjectResults 를 실행시켜 과목별로 채점 및 post 데이터인 subjectResultList 정제
   */
  useEffect(() => {
    if (userAnswerList.some((answer) => answer.isCorrect !== undefined)) {
      prepareAndScoreSubjectResults();
    }
  }, [userAnswerList]);

  /**
   * prepareAndScoreSubjectResults 가 다 완료되고, subjectResultList 에 값이 다 저장될 때,
   * 서버에 post 요청을 보내는 코드
   */
  useEffect(() => {
    if (subjectResultList.length !== 0) {
      postSubjectResultRequestsList(subjectResultList, selectedMockExamId).then((r) => console.log('제출 되어야 함.', r));
      setSubjectResultList([]); //다시 제출 방지
    }
  }, [subjectResultList]);

  /**
   * 시간이 종료되었을 때, 자동 제출되는 로직
   */
  useEffect(() => {
    if (timeLeft < 0) {
      setIsRunning(false);
      setIsAutoSubmitTimeUpModalOpen(!isAutoSubmitTimeUpModalOpen);
    }
  }, [timeLeft]);

  return (
    <>
      <div className="flex justify-between items-center w-full py-4 px-5">
        <button
          className={'border-primary-button'}
          onClick={() => {
            setIsPausedTimer(!isPausedTimer);
            setIsPausedStopWatch(!isPausedStopWatch);
            setIsUnsavedChangesWarningModalOpen(!isUnsavedChangesWarningModalOpen);
          }}>
          그만두기
        </button>
        <span className={'px-10 rounded-lg bg-white'}>
          {hours} : {minutes} : {seconds}
        </span>
        <button
          onClick={() => {
            setIsPausedTimer(!isPausedTimer);
            setIsPausedStopWatch(!isPausedStopWatch);
            setIsSubmitConfirmationModalOpen(!isSubmitConfirmationModalOpen);
          }}
          className={'bg-blue-button'}>
          제출하기
        </button>
      </div>
    </>
  );
};

export default TestSubmitOrCancle;
