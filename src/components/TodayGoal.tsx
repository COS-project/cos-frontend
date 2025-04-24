import { useRouter } from 'next/navigation';
import { SVGProps } from 'react';
import * as React from 'react';

interface Props {
  todayMockExams: number;
  todayStudyTime: number;
  mockExamsPerDay: number;
  studyTimePerDay: number;
}

import GoalRunningGraph from '@/components/home/goal-attaining/GoalRunningGraph';

const TodayGoal = (props: Props) => {
  const { todayMockExams, todayStudyTime, mockExamsPerDay, studyTimePerDay } = props;
  const router = useRouter();

  const millisecondsToMinutes = (time: number | null) => {
    // 1분은 60000 밀리세컨드입니다.
    if (time !== null) {
      return Math.floor(time / 60000);
    }
  };

  return (
    <div className={'p-4 rounded-[32px] bg-white'}>
      <div className={'flex justify-between'}>
        <div className={'flex gap-x-[10px] items-center'}>
          <div className={'pl-1 text-h3 font-semibold'}>오늘 목표</div>
        </div>
      </div>
      <GoalRunningGraph
        goalRunningGraphType={'time'}
        maintitle=" 공부하기"
        subtitle="오늘 공부한 시간"
        goaltime={studyTimePerDay}
        presenttime={millisecondsToMinutes(todayStudyTime) || 0}
        unit="분"
      />
      <GoalRunningGraph
        goalRunningGraphType={'exam'}
        maintitle=" 모의고사 풀기"
        subtitle="오늘 푼 모의고사"
        goaltime={mockExamsPerDay}
        presenttime={todayMockExams}
        unit="회분"
      />
    </div>
  );
};
export default TodayGoal;

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m5 11.5 6-6M5 5.5h6v6" />
  </svg>
);
