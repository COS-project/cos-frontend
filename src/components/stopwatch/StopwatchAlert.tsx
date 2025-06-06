import { motion } from 'framer-motion';
import React, { type SVGProps } from 'react';
import { useRecoilState } from 'recoil';

import { postStudyTimes } from '@/lib/api/stopwatch';
import { selectedPrepareTimeState } from '@/recoil/home/atom';
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
  const [selectedPrepareTime, setSelectedPrepareTime] = useRecoilState(selectedPrepareTimeState);

  const convertToMilliseconds = (hours: number, minutes: number, seconds: number): number => {
    const hoursInMs = hours * 60 * 60 * 1000; // 시를 밀리초로 변환
    const minutesInMs = minutes * 60 * 1000; // 분을 밀리초로 변환
    const secondsInMs = seconds * 1000; // 초를 밀리초로 변환

    return hoursInMs + minutesInMs + secondsInMs; // 모두 더해서 반환
  };

  //기록하기 알림창
  return (
    <>
      <div className="">
        <div className="fixed left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-[rgba(0,0,0,0.6)] px-8 min-h-screen">
          <motion.div
            className={'flex flex-col gap-y-2'}
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            {/* 닫기 버튼 */}
            <div
              onClick={() => {
                setOnModal(false);
              }}
              className={'flex justify-end items-center cursor-pointer'}>
              <div className={'text-white text-h6'}>닫기</div>
              <DeleteIcon />
            </div>

            {/* 모달창 */}
            <section className="flex flex-col gap-y-4 bg-white rounded-[32px] p-5">
              <div className="self-stretch flex-col gap-4 flex">
                <div className={'flex text-h2 font-bold gap-x-1'}>
                  <div className="self-stretch leading-[30px]">공부 시간</div>
                  <div className="self-stretch text-primary leading-[30px]">
                    {hStopwatchTime}시간 {mStopwatchTime}분 {sStopwatchTime}초
                  </div>
                </div>
                <div>
                  <div className="text-h6 leading-[21px]">기록할까요?</div>
                  <div className="text-h6 leading-[21px]">기록하지 않으면 타이머의 시간이 초기화됩니다.</div>
                </div>
                <div className="justify-end items-center gap-2 inline-flex">
                  <div
                    className="h-9 px-4 py-1 bg-gray1 cursor-pointer rounded-[999px] justify-center items-center gap-2 flex"
                    onClick={() => {
                      setStartTime(Date.now());
                      setNow(Date.now());
                      setIsReset(true);
                      setOnModal(false);
                    }}>
                    <div className="text-gray4 text-h6 font-medium font-['Pretendard Variable'] leading-[21px]">
                      아니요
                    </div>
                  </div>
                  <div className="h-9 px-4 py-1 cursor-pointer bg-black rounded-[999px] justify-center items-center gap-2 flex">
                    <div
                      className="text-white text-h6 font-['Pretendard Variable'] leading-[21px]"
                      onClick={() => {
                        postStudyTimes(
                          selectedPrepareTime.goalId,
                          convertToMilliseconds(hStopwatchTime, mStopwatchTime, sStopwatchTime),
                        ).then((res) => {
                          setOnAccumulatedModal(true); //모달창 열기
                          setOnModal(false); //현재창 닫기
                          setStartTime(Date.now());
                          setNow(Date.now());
                        });
                      }}>
                      기록하기
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default StopwatchAlert;

const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} fill="none" {...props}>
    <mask
      id="a"
      width={25}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M.974 0h24v24h-24z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#fff"
        d="m12.974 12.708-5.246 5.246a.5.5 0 0 1-.344.15.47.47 0 0 1-.364-.15.5.5 0 0 1-.16-.354.5.5 0 0 1 .16-.354L12.266 12 7.02 6.754a.5.5 0 0 1-.15-.344.47.47 0 0 1 .15-.364.5.5 0 0 1 .354-.16.5.5 0 0 1 .354.16l5.246 5.246 5.246-5.246a.5.5 0 0 1 .344-.15.47.47 0 0 1 .364.15.5.5 0 0 1 .16.354.5.5 0 0 1-.16.354L13.682 12l5.246 5.246a.5.5 0 0 1 .15.344.47.47 0 0 1-.15.364.5.5 0 0 1-.354.16.5.5 0 0 1-.354-.16z"
      />
    </g>
  </svg>
);
