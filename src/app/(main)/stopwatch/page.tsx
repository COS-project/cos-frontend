'use client';

import { hStopwatchTimeState, mStopwatchTimeState, sStopwatchTimeState } from '@/recoil/stopwatch/atom';
import React, { useEffect, useMemo } from 'react';
import { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';

export default function StopWatch() {
  const [integralTime, setIntegralTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [timebool, setTimebool] = useState<boolean>(true);
  const [hStopwatchTime, setHStopwatchTime] = useRecoilState(hStopwatchTimeState);
  const [mStopwachTime, setMStopwatchTime] = useRecoilState(mStopwatchTimeState);
  const [sSopwatchTime, setSStopwatchTime] = useRecoilState(sStopwatchTimeState);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 100);
  }

  function handleContinue() {
    setStartTime(Date.now());
    setNow(Date.now());

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 100);
  }

  function handleStop(): void {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    if (startTime != null && now != null) {
      setIntegralTime(secondsPassed);
    }
  }
  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000 + integralTime;
  }

  let location;
  let stringLocation = '';
  location = Math.floor((secondsPassed * 6) % 360);

  stringLocation = location.toString();
  let hour = Math.floor(Math.floor(secondsPassed) / 3600);
  let min = Math.floor(Math.floor(secondsPassed) / 60);

  let sec = Math.floor(secondsPassed) % 60;

  let h = hour.toString();
  let m = min.toString();
  let s = sec.toString();

  let th = h.padStart(2, '0');

  let tm = m.padStart(2, '0');

  let ts = s.padStart(2, '0');

  const ratateStyle = useMemo(() => {
    return { transform: `rotate(${stringLocation}deg)` };
  }, [stringLocation]);

  useEffect(() => {
    setHStopwatchTime(hour);
  }, [th]);

  useEffect(() => {
    setMStopwatchTime(tm);
  }, [tm]);

  useEffect(() => {
    setSStopwatchTime(ts);
  }, [ts]);

  return (
    <>
      <div className="relative flex justify-center items-center">
        <div className="w-80 h-[449px] flex-col justify-start items-center gap-6 flex">
          {/* <div className={twMerge('h-[320px] w-[320px] border border-gray2 rounded-full', className)}> */}
          <div style={ratateStyle} className="h-[320px] w-[320px] border border-gray2 rounded-full">
            <div className="absolute z-10 left-1/2 -top-2 h-4 w-4 bg-second rounded-full"></div>
          </div>
          <div className="absolute justify-center items-center gap-2 inline-flex w-full h-[290px]">
            <h1 className=" text-[48px] font-['Pretendard Variable']">
              {/* <div class="text-neutral-950 text-5xl font-medium font-['Pretendard Variable'] leading-[48px]">01 : 20 : 35</div> */}
              {th} : {tm} : {ts}
            </h1>
          </div>

          <div className="self-stretch px-2 justify-between items-start inline-flex">
            <div className="flex-col justify-start items-center gap-1 inline-flex">
              <button
                onClick={() => handleStart()}
                className="w-20 h-20 p-2 bg-gray0 rounded-[999px] justify-center items-center gap-2 inline-flex">
                <div className="w-[18px] h-[18px] bg-gray4 rounded-sm"></div>
              </button>
              <div className="text-neutral-500 text-sm font-normal font-['Pretendard Variable'] leading-[21px]">
                재설정
              </div>
            </div>
            <div className="flex-col justify-start items-center gap-1 inline-flex">
              {timebool ? (
                <div className="flex-col justify-start items-center gap-1 inline-flex">
                  <button
                    onClick={() => {
                      if (secondsPassed == 0) {
                        handleStart();
                      } else {
                        handleContinue();
                      }
                      setTimebool(false);
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
                      handleStop();
                      setTimebool(true);
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
