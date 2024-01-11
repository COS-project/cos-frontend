import Link from 'next/link';
import React, { useState } from 'react';

import { Session } from '@/types/global';

import SubjectGradeCard from './SubjectGradeCard';

interface SessionModalProps {
  selectedSession: Session; // 선택된 회차에 대한 데이터
  closeModal: () => void;
  openTimerModal: () => void;
}

const SessionModal: React.FC<SessionModalProps> = ({ closeModal, selectedSession, openTimerModal }) => {
  // 세부 과목에 대한 데이터를 더미 데이터 대신에 props로 받은 데이터 사용
  const subjects = selectedSession.subjects;

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="w-[80%]">
          <button onClick={closeModal} className="w-full flex justify-end text-white text-h6 px-2 my-2">
            닫기 X
          </button>
          <div className="bg-white rounded-3xl">
            <div className="w-[90%] mx-auto">
              <h2 className="flex justify-between text-h4 font-bold p-4">
                <button>{'<'}</button>
                <div>{`${selectedSession.sessionNumber}회차`}</div>
                <button>{'>'}</button>
              </h2>
              <div className="border-t border-gray1"></div>
              <div className="flex justify-between my-3">
                <div>
                  <div className="font-bold text-h6">최근 점수</div>
                  <div className="flex items-end">
                    <div className="font-bold text-h1">{`${selectedSession.totalCorrect}점`}</div>
                    <div className="text-gray3 text-h6 mb-1">/{`${selectedSession.totalProblem}점`}</div>
                  </div>
                </div>
                <Link href={'/exam/report'} className="h-1/2 bg-gray0 rounded-3xl text-h6 font-bold p-2">
                  성적 리포트 ➚
                </Link>
              </div>
              <div className="text-h6 font-bold mt-5">과목별 맞춘 문제 수</div>
              <div className="flex my-2">
                {subjects.map((subject, index) => (
                  <SubjectGradeCard
                    key={index}
                    name={subject.name}
                    correctAnswer={subject.correctAnswer}
                    totalCorrect={subject.totalProblems}
                  />
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => openTimerModal()}
                  className="w-full bg-black text-white rounded-3xl text-h5 p-4 my-4">
                  시험 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
