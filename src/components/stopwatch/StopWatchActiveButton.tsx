import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { twMerge } from 'tailwind-merge';

import {
  hStopwatchTimeState,
  isStartState,
  isStopState,
  mStopwatchTimeState,
  onModalAtom,
  sStopwatchTimeState,
  timeBoolState,
} from '@/recoil/stopwatch/atom';

interface Props {
  className?: string; //bottom 위치 수정
}

const StopWatchActiveButton = (props: Props) => {
  const { className } = props;
  const [isActiveButtonClicked, setIsActiveButtonClicked] = useState(false);
  const [timebool, setTimebool] = useRecoilState(timeBoolState); // true: 시작 버튼 / false: 일시정지 버튼
  const setIsStart = useSetRecoilState(isStartState); //시작 여부
  const setIsStop = useSetRecoilState(isStopState); //멈춤 여부
  const hStopwatchTime = useRecoilValue(hStopwatchTimeState); //시 기록
  const mStopwatchTime = useRecoilValue(mStopwatchTimeState); //분 기록
  const sStopwatchTime = useRecoilValue(sStopwatchTimeState); //초 기록
  const setOnModal = useSetRecoilState<boolean>(onModalAtom); //기록하기 알림창 onoff조절

  return (
    <div className={twMerge('fixed flex flex-col bottom-28 z-20 right-3 gap-y-2', className)}>
      <AnimatePresence>
        {isActiveButtonClicked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={'flex flex-col gap-y-2'}>
            <button
              onClick={() => {
                setOnModal(true); //모달창 열기
                setIsStop(true); //멈춤 설정
                setTimebool(true); // true: 시작 버튼
              }}
              className={
                'flex flex-col w-[72px] h-[72px] rounded-full bg-gray0 shadow-[0_2px_15px_rgba(0,0,0,0.25)] items-center justify-center'
              }>
              <Image
                src="/stopwatch/StopIcon.svg"
                alt="Logo"
                width={24}
                height={24}
                style={{ width: 24, height: 24 }}
              />
              <p
                className={'text-gray4 text-center font-normal text-[14px] leading-[21px] tracking-[-0.28px] font-pre'}>
                종료
              </p>
            </button>
            <button
              onClick={() => {
                if (timebool) {
                  setIsStart(true); //시작 여부 true
                  setTimebool(false); // false: 일시정지 버튼
                  setIsStop(false);
                } else {
                  setIsStart(false);
                  setIsStop(true); //멈춤
                  setTimebool(true); //true: 시작 버튼
                }
              }}
              className={
                'flex flex-col w-[72px] h-[72px] rounded-full bg-gray0 shadow-[0_2px_15px_rgba(0,0,0,0.25)] items-center justify-center'
              }>
              <Image
                src={timebool ? '/stopwatch/StartIcon.svg' : '/stopwatch/PauseIcon.svg'}
                alt="Logo"
                width={24}
                height={24}
                style={{ width: 24, height: 24 }}
              />
              <p
                className={'text-gray4 text-center font-normal text-[14px] leading-[21px] tracking-[-0.28px] font-pre'}>
                {timebool ? '시작' : '일시정지'}
              </p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {timebool ? (
        <button
          onClick={() => {
            setIsActiveButtonClicked(!isActiveButtonClicked);
          }}
          className={
            'flex flex-col bg-second justify-center items-center w-[72px] h-[72px] rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.25)]'
          }>
          <Image src={'/stopwatch/TimerIcon.svg'} alt="Logo" width={24} height={24} style={{ width: 24, height: 24 }} />
          <span className={'text-white text-h6'}>
            {hStopwatchTime === 0
              ? `${mStopwatchTime.toString().padStart(2, '0')}:${sStopwatchTime.toString().padStart(2, '0')}`
              : `${hStopwatchTime.toString().padStart(2, '0')}:${mStopwatchTime.toString().padStart(2, '0')}`}
          </span>
        </button>
      ) : (
        <button
          onClick={() => {
            setIsActiveButtonClicked(!isActiveButtonClicked);
          }}
          className={
            'flex flex-col bg-point justify-center items-center w-[72px] h-[72px] rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.25)]'
          }>
          <Image src={'/stopwatch/TimerIcon.svg'} alt="Logo" width={24} height={24} style={{ width: 24, height: 24 }} />
          <span className={'text-white text-h6'}>
            {hStopwatchTime === 0
              ? `${mStopwatchTime.toString().padStart(2, '0')}:${sStopwatchTime.toString().padStart(2, '0')}`
              : `${hStopwatchTime.toString().padStart(2, '0')}:${mStopwatchTime.toString().padStart(2, '0')}`}
          </span>
        </button>
      )}
    </div>
  );
};
export default StopWatchActiveButton;
