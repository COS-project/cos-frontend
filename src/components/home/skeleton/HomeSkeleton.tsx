'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import AverageAccurayChatSkeleton from '@/components/home/skeleton/AverageAccurayChatSkeleton';
import AverageTakenTimeGraphReportSkeleton from '@/components/home/skeleton/AverageTakenTimeGraphReportSkeleton';
import BestTipSkeleton from '@/components/home/skeleton/BestTipSkeleton';
import GoalBoxSkeleton from '@/components/home/skeleton/GoalBoxSkeleton';
import RecentGrowthChartSkeleton from '@/components/home/skeleton/RecentGrowthChartSkeleton';
import TodayGoalSkeleton from '@/components/home/skeleton/TodayGoalSkeleton';

const HomeSkeleton = () => {
  return (
    <section className={'mt-4 px-5 flex flex-col gap-y-5'}>
      <GoalBoxSkeleton />
      <TodayGoalSkeleton />
      <RecentGrowthChartSkeleton />
      <AverageAccurayChatSkeleton />
      <AverageTakenTimeGraphReportSkeleton />
      <BestTipSkeleton />
    </section>
  );
};
export default HomeSkeleton;
