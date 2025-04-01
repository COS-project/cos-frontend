import { SVGProps, useState } from 'react';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { twMerge } from 'tailwind-merge';

import {
  hStopwatchTimeState,
  isResetState,
  isStartState,
  isStopState,
  mStopwatchTimeState,
  sStopwatchTimeState,
  timeBoolState,
} from '@/recoil/stopwatch/atom';

interface Props {
  className?: string; //bottom 위치 수정
}

const StopWatchActiveButton = (props: Props) => {
  const { className } = props;
  const [timebool, setTimebool] = useRecoilState(timeBoolState); // true: 시작 버튼 / false: 일시정지 버튼
  const [isStart, setIsStart] = useRecoilState(isStartState); //시작 여부
  const [isStop, setIsStop] = useRecoilState(isStopState); //멈춤 여부
  const [isReset, setIsReset] = useRecoilState(isResetState); //리셋 여부
  const [hStopwatchTime, setHStopwatchTime] = useRecoilState(hStopwatchTimeState); //시 기록
  const [mStopwatchTime, setMStopwatchTime] = useRecoilState(mStopwatchTimeState); //분 기록
  const [sStopwatchTime, setSStopwatchTime] = useRecoilState(sStopwatchTimeState); //초 기록

  return (
    <div className={twMerge('fixed flex flex-col bottom-28 z-20 right-3 gap-y-2', className)}>
      {timebool ? (
        <button
          onClick={() => {
            setIsStart(true); //시작 여부 true
            setTimebool(false); // false: 일시정지 버튼
            setIsStop(false);
          }}
          className={
            'flex flex-col gap-y-1 bg-second justify-center items-center w-[72px] h-[72px] rounded-full shadow-lg'
          }>
          <StartIcon />
          <span className={'text-white text-h6'}>
            {hStopwatchTime === 0
              ? `${mStopwatchTime.toString().padStart(2, '0')}:${sStopwatchTime.toString().padStart(2, '0')}`
              : `${hStopwatchTime.toString().padStart(2, '0')}:${mStopwatchTime.toString().padStart(2, '0')}`}
          </span>
        </button>
      ) : (
        <button
          onClick={() => {
            setIsStart(false);
            setIsStop(true); //멈춤
            setTimebool(true); //true: 시작 버튼
          }}
          className={
            'flex flex-col gap-y-1 bg-point justify-center items-center w-[72px] h-[72px] rounded-full shadow-lg'
          }>
          <StopIcon />
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

const StopIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={19} height={18} fill="none" {...props}>
    <rect width={6} height={18} x={0.646} fill="#ffffff" rx={2} />
    <rect width={6} height={18} x={12.646} fill="#ffffff" rx={2} />
  </svg>
);
const StartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={22} fill="none" {...props}>
    <path
      fill="#ffffff"
      d="M14.735 9.448 3.907.65C2.6-.412.646.518.646 2.202v17.596c0 1.684 1.954 2.614 3.26 1.552l10.83-8.798a2 2 0 0 0 0-3.104"
    />
  </svg>
);
