import { useRouter } from 'next/navigation';
import { SVGProps } from 'react';
import * as React from 'react';

interface Props {
  maxScore: number;
  currentStudyTime: number;
  currentMockExams: number;
  goalScore: number;
  goalStudyTime: number;
  goalMockExams: number;
}

import ScoredDonutChart from '@/components/home/goal-attaining/ScoredDonutChart';

const GoalBox = (props: Props) => {
  const { maxScore, currentStudyTime, currentMockExams, goalScore, goalStudyTime, goalMockExams } = props;

  const millisecondsToMinutes = (time: number | null) => {
    // 1분은 60000 밀리세컨드입니다.
    if (time !== null) {
      return Math.floor(time / 60000);
    }
  };

  const router = useRouter();
  const { maxScore, currentStudyTime, currentMockExams, goalScore, goalStudyTime, goalMockExams } = props;

  function convertMsToM(ms: number) {
    return Math.floor(ms / 60000); // 1분 = 60000ms
  }

  return (
    <div className={'flex flex-col gap-y-4 p-4 bg-white rounded-[32px]'}>
      <div className={'flex justify-between'}>
        <div className={'text-h3 font-semibold'}>목표 달성</div>
        <button
          onClick={() => {
            router.push('/home/goal-setting');
          }}
          className={'flex items-center py-1 px-3 rounded-full border-[1px] border-gray2 text-h6'}>
          목표 수정 <ArrowIcon />
        </button>
      </div>

      <div className={'flex justify-between'}>
        <div className="w-[33%]">
          <div className="flex justify-center items-center">
            <div className={'font-normal text-h6 px-[20px] py-[2px] rounded-full bg-gray0'}>목표점수</div>
          </div>
          <div className="relative mt-[10px]">
            <ScoredDonutChart mainscore={maxScore} totalscore={goalScore} unit="점" />
          </div>
        </div>
        <div className="w-[33%]">
          <div className="flex justify-center items-center">
            <div className={'font-normal text-h6 px-[20px] py-[2px] rounded-full bg-gray0'}>공부시간</div>
          </div>
          <div className="relative mt-[10px]">
            <ScoredDonutChart
              mainscore={millisecondsToMinutes(currentStudyTime)}
              totalscore={goalStudyTime}
              unit="분"
            />
          </div>
        </div>
        <div className="w-[33%]">
          <div className="flex justify-center items-center">
            <div className={'font-normal text-h6 px-[20px] py-[2px] rounded-full bg-gray0'}>모의고사</div>
          </div>
          <div className="relative mt-[10px]">
            <ScoredDonutChart mainscore={currentMockExams} totalscore={goalMockExams} unit="회" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalBox;

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m5 11.5 6-6M5 5.5h6v6" />
  </svg>
);
