import React from 'react';
import { useRecoilState } from 'recoil';

import {
  hStopwatchTimeState,
  isResetState,
  mStopwatchTimeState,
  nowTimeState,
  sStopwatchTimeState,
  startTimeState,
} from '@/recoil/stopwatch/atom';

interface Props {
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOnAccumulatedModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function StopwatchAlert(props: Props) {
  const { setOnModal, setOnAccumulatedModal } = props;
  const [now, setNow] = useRecoilState(nowTimeState); //현재 시간
  const [startTime, setStartTime] = useRecoilState(startTimeState); //시작 시간
  const [hStopwatchTime, setHStopwatchTime] = useRecoilState(hStopwatchTimeState); //시 기록
  const [mStopwatchTime, setMStopwatchTime] = useRecoilState(mStopwatchTimeState); //분 기록
  const [sStopwatchTime, setSStopwatchTime] = useRecoilState(sStopwatchTimeState); //초 기록
  const [isReset, setIsReset] = useRecoilState(isResetState); //리셋 여부

  //기록하기 알림창
  return (
    <>
      <div className="">
        <div className="absolute z-40 w-full h-full px-5 py-8 bg-black bg-opacity-60 flex-col justify-center items-center gap-2 inline-flex ">
          <div className="relative self-stretch px-2 justify-center items-center inline-flex">
            <div className="w-64"></div>
            <div
              className="flex cursor-pointer"
              onClick={() => {
                setOnModal(false);
              }}>
              <div className="text-center text-white text-base font-medium font-['Pretendard Variable'] leading-normal">
                닫기
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" viewBox="0 0 25 24">
                <mask id="a" width="25" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
                  <path fill="#D9D9D9" d="M.646 0h24v24h-24z" />
                </mask>
                <g mask="url(#a)">
                  <path
                    fill="#fff"
                    d="M12.646 12.708 7.4 17.954a.503.503 0 0 1-.345.15.467.467 0 0 1-.363-.15.49.49 0 0 1-.16-.354.49.49 0 0 1 .16-.354L11.938 12 6.692 6.754a.504.504 0 0 1-.15-.344.467.467 0 0 1 .15-.364.49.49 0 0 1 .354-.16.49.49 0 0 1 .354.16l5.246 5.246 5.246-5.246a.503.503 0 0 1 .344-.15.467.467 0 0 1 .364.15.49.49 0 0 1 .16.354.49.49 0 0 1-.16.354L13.353 12l5.247 5.246a.504.504 0 0 1 .15.344.467.467 0 0 1-.15.364.491.491 0 0 1-.354.16.49.49 0 0 1-.354-.16l-5.246-5.246Z"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div className="px-5 py-6 bg-white rounded-[32px] flex-col justify-center gap-2 flex">
            <div className="self-stretch flex-col gap-4 flex">
              <div className="self-stretch text-center flex-col gap-1 flex">
                <div className="self-stretch text-neutral-900 text-h6 font-bold font-['Pretendard Variable'] leading-[30px]">
                  누적 시간
                </div>
                <div className="self-stretch text-primary text-h2 font-bold font-['Pretendard Variable'] leading-[30px]">
                  {hStopwatchTime}시간 {mStopwatchTime}분 {sStopwatchTime}초
                </div>
                <div className="self-stretch text-neutral-950 text-h6 font-normal font-['Pretendard Variable'] leading-[21px]">
                  기록하시겠습니까?
                </div>
              </div>
              <div className="justify-end items-center gap-2 inline-flex">
                <div
                  className="h-9 px-4 py-1 bg-gray1 cursor-pointer rounded-[999px] justify-center items-center gap-2 flex"
                  onClick={() => {
                    setStartTime(Date.now());
                    setNow(Date.now());
                    setOnModal(false); //현재창 닫기
                    setIsReset(true); //테스트
                    setIsReset(false); //테스트
                  }}>
                  <div className="text-gray4 text-h6 font-medium font-['Pretendard Variable'] leading-[21px]">
                    아니요, 괜찮아요
                  </div>
                </div>
                <div className="h-9 px-4 py-1 cursor-pointer bg-black rounded-[999px] justify-center items-center gap-2 flex">
                  <div
                    className="text-white text-h6 font-medium font-['Pretendard Variable'] leading-[21px]"
                    onClick={() => {
                      setOnAccumulatedModal(true); //모달창 열기
                      setOnModal(false); //현재창 닫기
                      setStartTime(Date.now());
                      setNow(Date.now());
                      setIsReset(true); //테스트
                      setIsReset(false); //테스트
                    }}>
                    네, 기록할게요
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default StopwatchAlert;
