'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';

import useCalculateScore from '@/hooks/useCalculateScore';
import { postSubjectResultRequestsList } from '@/lib/api/exam';
import useMockExamQuestions from '@/lib/hooks/useMockExamQuestions';
import {
  questionIndex,
  stopwatchIsRunning,
  stopwatchTime,
  subjectResultRequestsList,
  userAnswerRequestsList,
} from '@/recoil/exam/atom';
import { UserAnswerRequests } from '@/types/global';

const TestSubmitOrCancle = () => {
  const { calculateScore, prepareAndScoreSubjectResults } = useCalculateScore();
  // 남은 시간(타이머) TODO: questions[0].mockExam.timeLimit으로 변경
  const [timeLeft, setTimeLeft] = useState(5400000);
  // 각 문제당 걸린 시간
  const [time, setTime] = useRecoilState<number>(stopwatchTime);
  const [isRunning, setIsRunning] = useRecoilState<boolean>(stopwatchIsRunning);
  const [questionIdx, setQuestionIdx] = useRecoilState<number>(questionIndex);
  const [userAnswerList, setUserAnswerList] = useRecoilState<UserAnswerRequests[]>(userAnswerRequestsList);
  const [subjectResultList, setSubjectResultList] = useRecoilState(subjectResultRequestsList);
  // 제출버튼을 눌렀을 때 제출버튼을 누르는 페이지의 머문 시간까지 기록하기위한 트릭
  const [sessionRecorded, setSessionRecorded] = useState(false);
  // 시, 분, 초 계산
  const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  /**
   * 시험 시간 타이머 기능
   */
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((prevCount) => (prevCount <= 0 ? 0 : prevCount - 1000)); // 1초(1000밀리초) 감소
    }, 1000);

    return () => clearInterval(id); // 컴포넌트 언마운트 시 인터벌 클리어
  }, [timeLeft]);

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
      handleSubmit();
      setSessionRecorded(false); // 다시 초기 상태로 설정
    }
  }, [sessionRecorded]);

  /**
   * 채점이 다 되어 userAnswerList 에 is_correct 프로퍼티가 추가된 다음
   * prepareAndScoreSubjectResults 를 실행시켜 과목별로 채점 및 post 데이터 정제
   */
  useEffect(() => {
    if (userAnswerList[0]?.isCorrect) {
      prepareAndScoreSubjectResults();
    }
  }, [userAnswerList[0]?.isCorrect]);

  /**
   * prepareAndScoreSubjectResults 가 다 완료되고, subjectResultList 에 값이 다 저장될 때,
   * 서버에 post 요청을 보내는 코드
   */
  useEffect(() => {
    if (subjectResultList.length !== 0) {
      postSubjectResultRequestsList(subjectResultList).then((r) => console.log(r));
      setSubjectResultList([]); //다시 제출 방지
    }
  }, [subjectResultList]);

  return (
    <>
      <div className="flex justify-between items-center w-full py-4 px-5">
        <button
          className={'border-primary-button'}
          onClick={() =>
            Swal.fire({
              title: '그만 두시겠습니까?',
              text: '그만두면 기존에 풀었던 내용들은 저장되지 않습니다.',
              confirmButtonText: '그만두기',
              cancelButtonText: '닫기',
              confirmButtonColor: '#000000',
              cancelButtonColor: '#054354',
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire('그만둡니다.', '', 'info');
              }
            })
          }>
          그만두기
        </button>
        <span className={'px-10 rounded-lg bg-white'}>
          {hours} : {minutes} : {seconds}
        </span>
        <button
          onClick={() => {
            setIsRunning(false);
          }}
          className={'bg-blue-button'}>
          제출하기
        </button>
      </div>
    </>
  );
};

export default TestSubmitOrCancle;
