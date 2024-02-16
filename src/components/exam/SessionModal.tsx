import Link from 'next/link';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { Round, Session } from '@/types/global';
import { selectedSessionState } from '@/utils/recoilState';

import SubjectGradeCard from './SubjectGradeCard';

interface SessionModalProps {
  closeModal: () => void;
  openTimerModal: () => void;
  round: number;
  main: number;
  total: number;
}

const SessionModal: React.FC<SessionModalProps> = ({ closeModal, openTimerModal, round, main, total }) => {
  const [selectedSession, setSelectedSession] = useRecoilState<Session | null>(selectedSessionState);

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
                <div>{`${round}회차`}</div>
                <button>{'>'}</button>
              </h2>
              <div className="border-t border-gray1"></div>
              <div className="flex justify-between my-3">
                <div>
                  <div className="font-bold text-h6">최근 점수</div>
                  <div className="flex items-end">
                    <div className="font-bold text-h1">{`${main}점`}</div>
                    <div className="text-gray3 text-h6 mb-1">/{`${total}점`}</div>
                  </div>
                </div>
                <Link href={'/exam/report'} className="h-1/2 bg-gray0 rounded-3xl text-h6 font-bold p-2">
                  성적 리포트 ➚
                </Link>
              </div>
              <div className="text-h6 font-bold mt-5">과목별 맞춘 문제 수</div>
              <div className="flex my-2">
                {/* {subjects?.map((subject, index) => (
                  <SubjectGradeCard key={index} name={'하이'} correctAnswer={12} totalCorrect={50} />
                ))} */}
                <SubjectGradeCard name={'하이'} correctAnswer={12} totalCorrect={50} />
                <SubjectGradeCard name={'하이'} correctAnswer={12} totalCorrect={50} />
                <SubjectGradeCard name={'하이'} correctAnswer={12} totalCorrect={50} />
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
