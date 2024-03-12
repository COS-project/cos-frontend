'use client';

import { useEffect, useState } from 'react';

import FilterModal from '@/components/common/FilterModal';
import DetailedGradeReport from '@/components/home/DetailedGradeReport';
import GrowthChart from '@/components/home/GrowthChart';
import useGetUserGoals from '@/lib/hooks/useGetUserGoals';

const GrowthChartView = () => {
  const { userGoals } = useGetUserGoals();
  const [goalDuration, setGoalDuration] = useState();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    console.log('userGoals', userGoals);
  }, [userGoals]);

  return (
    <div className={'bg-gray0'}>
      <div className={'m-5 flex flex-col gap-y-[24px]'}>
        <div
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={'flex items-center gap-x-1 bg-white py-[6px] px-[12px] w-fit rounded-full'}>
          <div>목표 기간 선택</div> {isFilterOpen ? <DropUpIcon /> : <DropDownIcon />}
        </div>
        {isFilterOpen ? (
          <FilterModal
            data={userGoals}
            className={'w-fit'}
            setIsOpen={setIsFilterOpen}
            setDataState={setGoalDuration}
          />
        ) : null}
        <GrowthChart />
        <div className={'flex flex-col gap-y-[8px]'}>
          <div className={'text-h3 font-bold ml-2'}>주간 성적 자세히 보기</div>
          <div className={'flex flex-col gap-y-[12px]'}>
            <DetailedGradeReport />
            <DetailedGradeReport />
            <DetailedGradeReport />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GrowthChartView;

function DropDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={21}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13.654 9l-3.5 3-3.5-3" stroke="#0D0E10" strokeLinecap="round" />
    </svg>
  );
}
function DropUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={21}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6.654 12l3.5-3 3.5 3" stroke="#0D0E10" strokeLinecap="round" />
    </svg>
  );
}
