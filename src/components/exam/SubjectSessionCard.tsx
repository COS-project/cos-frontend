'use client';

import React, { useState } from 'react';
import SessionModal from './SessionModal';

const SubjectSessionCard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="w-1/2 mb-4">
      <div className="w-[90%] mx-auto p-3 border border-gray2 rounded-3xl">
        <div className="text-black font-bold text-center">{`1회차`}</div>
        <div className="border-t border-gray1 my-2"></div>
        <div className="text-black text-center text-h7">최근 점수</div>
        <ul className="flex text-center justify-center">
          <div className="font-bold text-h2">{`10점`}</div>
          <div className="mt-1 text-gray3">/50점</div>
        </ul>
        <button onClick={() => openModal()} className="w-full bg-gray1 rounded-3xl py-3 mt-4 text-h6 font-bold">
          시험 보기
        </button>

        {modalIsOpen && <SessionModal closeModal={closeModal} />}
      </div>
    </div>
  );
};

export default SubjectSessionCard;
