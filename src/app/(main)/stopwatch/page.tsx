'use client';

import React, { useMemo } from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import {
  hStopwatchTimeState,
  isResetState,
  isStartState,
  isStopState,
  mStopwatchTimeState,
  nowTimeState,
  sStopwatchTimeState,
  startTimeState,
  stringLocationState,
  timeBoolState,
} from '@/recoil/stopwatch/atom';

export default function StopWatch() {
  const [startTime, setStartTime] = useRecoilState(startTimeState); //시작 시간
  const [now, setNow] = useRecoilState(nowTimeState); //현재 시간

  const [timebool, setTimebool] = useRecoilState(timeBoolState); // true: 시작 버튼/ false: 일시정지 버튼
  const [onModal, setOnModal] = useState<boolean>(false); //기록하기 알림창 onoff조절
  const [onAccumulatedModal, setOnAccumulatedModal] = useState<boolean>(false); //기록완료 알림창 onoff조절
  const [isStart, setIsStart] = useRecoilState(isStartState); //시작 여부
  const [isStop, setIsStop] = useRecoilState(isStopState); //멈춤 여부
  const [isReset, setIsReset] = useRecoilState(isResetState); //리셋 여부
  const [stringLocation, setStringLocation] = useRecoilState(stringLocationState); //스톱워치 돌아가는 원의 위치
  const [hStopwatchTime, setHStopwatchTime] = useRecoilState(hStopwatchTimeState); //시 기록
  const [mStopwatchTime, setMStopwatchTime] = useRecoilState(mStopwatchTimeState); //분 기록
  const [sStopwatchTime, setSStopwatchTime] = useRecoilState(sStopwatchTimeState); //초 기록

  const ratateStyle = useMemo(() => {
    return { transform: `rotate(${stringLocation}deg)` }; //원의 위치가 변경될 수 있도록 함
  }, [stringLocation]);

  function StopwatchAlert() {
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

  function AccumulatedTime() {
    //기록 완료 알림창
    return (
      <>
        <div className="">
          <div className="absolute z-40 w-full h-full px-5 py-8 bg-black bg-opacity-60 flex-col justify-center items-center gap-2 inline-flex ">
            <div className="relative self-stretch px-2 justify-center items-center inline-flex">
              <div className="w-52"></div>
              <div
                className="flex cursor-pointer"
                onClick={() => {
                  setOnAccumulatedModal(false); //현재창 닫기
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
            <div className="px-5 py-6 w-[257px] bg-white rounded-[32px] flex-col justify-center gap-2 flex">
              <div className="self-stretch flex-col gap-4 flex">
                <div className="self-stretch flex-col gap-1 flex">
                  <div className="self-stretch text-neutral-900 text-h4 font-bold font-['Pretendard Variable'] leading-[30px]">
                    전체 누적 시간
                  </div>
                  <div className="self-stretch text-primary text-h1 font-bold font-['Pretendard Variable'] leading-[30px]">
                    {hStopwatchTime}시간 {mStopwatchTime}분 {sStopwatchTime}초
                  </div>
                  <div className="self-stretch text-neutral-900 text-h4 font-bold font-['Pretendard Variable'] leading-[30px]">
                    <br />
                    목표 기간 동안의 누적 시간
                  </div>
                  <div className="self-stretch text-primary text-h1 font-bold font-['Pretendard Variable'] leading-[30px]">
                    {hStopwatchTime}시간 {mStopwatchTime}분 {sStopwatchTime}초{' '}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {onModal ? ( //기록하기 알림창 열림OnOff
        <StopwatchAlert></StopwatchAlert>
      ) : null}
      {onAccumulatedModal ? ( //기록완료 알림창OnOff
        <AccumulatedTime></AccumulatedTime>
      ) : null}
      <Header headerType={'second'}></Header>
      <div className="relative flex justify-center items-center mt-[100px]">
        <div className="w-80 h-[449px] flex-col justify-start items-center gap-6 flex">
          {/* <div className={twMerge('h-[320px] w-[320px] border border-gray2 rounded-full', className)}> */}
          <div style={ratateStyle} className="h-[320px] w-[320px] border border-gray2 rounded-full">
            <div className="absolute z-10 left-1/2 -top-2 h-4 w-4 bg-second rounded-full"></div>
          </div>
          <div className="absolute justify-center items-center gap-2 inline-flex w-full h-[290px]">
            <h1 className=" text-[48px] font-['Pretendard Variable']">
              {/* 스톱워치 시간 */}
              {/* <div class="text-neutral-950 text-5xl font-medium font-['Pretendard Variable'] leading-[48px]">01 : 20 : 35</div> */}
              {hStopwatchTime.toString().padStart(2, '0')} : {mStopwatchTime.toString().padStart(2, '0')} :{' '}
              {sStopwatchTime.toString().padStart(2, '0')}
            </h1>
          </div>

          <div className="self-stretch px-2 justify-between items-start inline-flex">
            <div className="flex-col justify-start items-center gap-1 inline-flex">
              <button
                onClick={() => {
                  setOnModal(true); //모달창 열기
                  setIsStop(true); //멈춤 설정
                  setTimebool(true); // true: 시작 버튼
                }}
                className="w-20 h-20 p-2 bg-gray0 rounded-[999px] justify-center items-center gap-2 inline-flex">
                <div className="w-[18px] h-[18px] bg-gray4 rounded-sm"></div>
              </button>
              <div className="text-neutral-500 text-sm font-normal font-['Pretendard Variable'] leading-[21px]">
                재설정
              </div>
            </div>
            <div className="flex-col justify-start items-center gap-1 inline-flex">
              {timebool ? (
                // true: 시작 버튼/ false: 일시정지 버튼
                <div className="flex-col justify-start items-center gap-1 inline-flex">
                  <button
                    onClick={() => {
                      setIsStart(true); //시작 여부 true
                      setTimebool(false); // false: 일시정지 버튼
                      setIsStop(false);
                    }}
                    className="w-20 h-20 p-2 bg-second rounded-[999px] justify-center items-center gap-2 inline-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" fill="none" viewBox="0 0 16 22">
                      <path
                        fill="#fff"
                        d="M14.735 9.448 3.907.65C2.6-.412.646.518.646 2.202v17.596c0 1.684 1.954 2.614 3.26 1.552l10.83-8.798a2 2 0 0 0 0-3.104Z"
                      />
                    </svg>
                  </button>
                  <div className="text-neutral-500 text-sm font-normal font-['Pretendard Variable'] leading-[21px]">
                    시작
                  </div>
                </div>
              ) : (
                <div className="flex-col justify-start items-center gap-1 inline-flex">
                  <button
                    onClick={() => {
                      setIsStart(false);
                      setIsStop(true); //멈춤
                      setTimebool(true); //true: 시작 버튼
                    }}
                    className="w-20 h-20 p-2 bg-point rounded-[999px] justify-center items-center gap-2 inline-flex">
                    <div className="justify-center items-center gap-1.5 flex">
                      <div className="w-1.5 h-[18px] bg-white rounded-sm"></div>
                      <div className="w-1.5 h-[18px] bg-white rounded-sm"></div>
                    </div>
                  </button>
                  <div className="text-neutral-500 text-sm font-normal font-['Pretendard Variable'] leading-[21px]">
                    일시정지
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
