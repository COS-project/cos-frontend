import React, { useState } from 'react';
import SessionModal from './SessionModal';
import { SubjectInfo } from '@/types/global';

interface SubjectSessionCardProps {
  selectedSubject: SubjectInfo | null;
  subjectData: SubjectInfo[] | undefined;
}

const SubjectSessionCard: React.FC<SubjectSessionCardProps> = ({ selectedSubject, subjectData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
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
              <li className="font-bold text-h2">{`${session.totalcorrect}점`}</li>
              <div className="mt-1 text-gray3">/50점</div>
            </ul>
            <button onClick={() => openModal()} className="w-full bg-gray1 rounded-3xl py-3 mt-4 text-h6 font-bold">
              시험 보기
            </button>

            {modalIsOpen && <SessionModal closeModal={closeModal} />}
          </div>
        </div>
      ))}
    </>
  );
};

export default SubjectSessionCard;
