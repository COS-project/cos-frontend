'use client';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { selectedSessionState } from '@/utils/recoilState';

interface SessionModalProps {
  closeTimerModal: () => void;
  closeSessionModal: () => void;
}

const TimerModal: React.FC<SessionModalProps> = ({ closeTimerModal, closeSessionModal }) => {
  // 타이머 모달이 나타나면 기존 세션 모달을 종료 위한 동작
  useEffect(() => {
    // 타이머 모달이 나타난 후에 실행되는 부분
    closeSessionModal();
  }, [closeSessionModal]);
  // 체크박스 체크 여부 state
  const [isChecked, setIsChecked] = useState(false);

  // 체크박스 state 변경 함수
  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-[80%]">
        <button onClick={closeTimerModal} className="w-full flex justify-end text-white text-h6 px-2 my-2">
          닫기 X
        </button>
        <div className="bg-white rounded-3xl">
          <div className="w-[90%] mx-auto">
            <h2 className="flex justify-center text-h4 font-bold p-4">
              <div>{`n회차`}</div>
            </h2>
            <div className="border-t border-gray1"></div>
            <div className="flex justify-center font-bold my-4">시험 시간 설정</div>
            <div className="flex justify-center rounded-3xl bg-gray1 p-4">00시간 0분</div>
            <div className="flex justify-center mt-3">
              <label className="text-h5">
                <input className="mx-2" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
              </label>
              <div className="text-h5">종료 시 소리 알림</div>
            </div>
            <div className="flex justify-center">
              <button className="w-full bg-black text-white rounded-3xl text-h5 p-3 my-4">시험 보기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerModal;
