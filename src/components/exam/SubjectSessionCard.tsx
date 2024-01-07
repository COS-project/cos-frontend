import React, { useState } from 'react';

import { Session, SubjectInfo } from '@/types/global';

import SessionModal from './SessionModal';

interface SubjectSessionCardProps {
  selectedSubject: SubjectInfo | null;
}

const SubjectSessionCard: React.FC<SubjectSessionCardProps> = ({ selectedSubject }) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (session: Session) => {
    setSelectedSession(session);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedSession(null);
    setModalIsOpen(false);
  };

  // 해당 연도의 세션 정보를 가져오기
  const sessions = selectedSubject?.sessions;

  if (!sessions) {
    return <div>해당 연도의 데이터가 없습니다.</div>;
  }

  return (
    <>
      {sessions.map((session, index) => (
        <div key={index} className="w-1/2 mb-4">
          <div className="w-[90%] mx-auto p-3 border border-gray2 rounded-3xl">
            <div className="text-black font-bold text-center">{`${session.sessionNumber}회차`}</div>
            <div className="border-t border-gray1 my-2"></div>
            <div className="text-black text-center text-h7">최근 점수</div>
            <ul className="flex text-center justify-center">
              <li className="font-bold text-h2">{`${session.totalCorrect}점`}</li>
              <div className="mt-1 text-gray3">{`/${session.totalProblem}점`}</div>
            </ul>
            <button
              onClick={() => openModal(session)}
              className="w-full bg-gray1 rounded-3xl py-3 mt-4 text-h6 font-bold">
              시험 보기
            </button>
          </div>
        </div>
      ))}
      {modalIsOpen && selectedSession && <SessionModal closeModal={closeModal} selectedSession={selectedSession} />}
    </>
  );
};

export default SubjectSessionCard;
