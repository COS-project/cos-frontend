'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { mockExamIdState } from '@/recoil/exam/atom';

interface SessionModalProps {
  mockExamId: number;
  closeTimerModal: () => void;
  closeSessionModal: () => void;
  round: number;
  timeLimit: number;
}

const TimerModal: React.FC<SessionModalProps> = ({
  mockExamId,
  timeLimit,
  round,
  closeTimerModal,
  closeSessionModal,
}) => {
  const [selectedMockExamId, setSelectedMockExamId] = useRecoilState(mockExamIdState);
  const router = useRouter();
  // 타이머 모달이 나타나면 기존 세션 모달을 종료 위한 동작
  useEffect(() => {
    // 타이머 모달이 나타난 후에 실행되는 부분
    closeSessionModal();
  }, [closeSessionModal]);

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-[80%]">
        <button onClick={closeTimerModal} className="w-full flex justify-end text-white text-h6 px-2 my-2">
          닫기 X
        </button>
        <div className="p-5 bg-white rounded-[32px] flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-4">
            <div className="flex justify-center text-h4 font-semibold">{`${round}회차`}</div>
            <div className="border-t border-gray1"></div>
            <div className={'flex flex-col gap-y-2'}>
              <div className="flex justify-center font-semibold">시험 시간 설정</div>
              <div className="flex gap-x-8 justify-center rounded-[24px] bg-gray0 p-4">
                <div className={'flex items-end gap-x-[2px]'}>
                  <span className={'text-h2 font-semibold text-gray3'}>{Math.floor(timeLimit / 3600000)}</span>
                  <span className={'text-h4 font-normal text-black pb-[3px]'}>시간</span>
                </div>
                <div className={'flex items-end gap-x-[2px]'}>
                  <span className={'text-h2 font-semibold text-gray3'}>{Math.floor(timeLimit / 60000)}</span>
                  <span className={'text-h4 font-normal text-black pb-[3px]'}>분</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedMockExamId(mockExamId);
              router.push('/exam/test');
            }}
            className="flex justify-center w-full bg-black text-white rounded-3xl text-h5 p-4">
            시험 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerModal;
