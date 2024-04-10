'use client';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import FilterModal from '@/components/common/FilterModal';
import DetailedGradeReport from '@/components/home/DetailedGradeReport';
import GrowthChart from '@/components/home/GrowthChart';
import UserCertGoalPeriods from '@/components/home/UserCertGoalPeriods';
import useGetMockExamStatistics from '@/lib/hooks/useGetMockExamStatistics';
import useGetUserGoals from '@/lib/hooks/useGetUserGoals';
import {
  selectedDateTypeState,
  selectedPrepareTimeState,
  selectedPrepareWeeksBetweenState,
  selectedReportTypeState,
} from '@/recoil/home/atom';
import { ScoreAVGListType } from '@/types/home/type';

const GrowthChartView = () => {
  const { userGoals } = useGetUserGoals(1);
  const [selectedPrepareWeeksBetween, setSelectedPrepareWeeksBetweenState] = useRecoilState(
    selectedPrepareWeeksBetweenState,
  );
  const [selectedReportType, setSelectedReportType] = useRecoilState<'WEEK' | 'MONTH' | 'YEAR'>(
    selectedReportTypeState,
  );

  const { statisticsData } = useGetMockExamStatistics(
    selectedReportType,
    selectedPrepareWeeksBetween.prepareYear,
    selectedPrepareWeeksBetween.prepareMonth,
    selectedPrepareWeeksBetween.prepareWeekly,
  );
  const [goalPeriod, setGoalPeriod] = useState<string>('목표 기간 선택');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const getWeek = (date: Date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();

    return Math.ceil((currentDate + firstDay) / 7);
  };

  const getMonth = (date: Date) => {
    return date.getMonth() + 1;
  };

  /**
   * 목표 년도 계산해주는 함수
   * @param date 목표 날짜
   */
  const getYear = (date: Date) => {
    return date.getFullYear().toString().slice(-4);
  };

  const convertDayOfWeekToKorean = (scoreAVG: ScoreAVGListType) => {
    if (scoreAVG.dayOfWeek === 'MONDAY') {
      return '월요일';
    }
    if (scoreAVG.dayOfWeek === 'TUESDAY') {
      return '화요일';
    }
    if (scoreAVG.dayOfWeek === 'WEDNESDAY') {
      return '수요일';
    }
    if (scoreAVG.dayOfWeek === 'THURSDAY') {
      return '목요일';
    }
    if (scoreAVG.dayOfWeek === 'FRIDAY') {
      return '금요일';
    }
    if (scoreAVG.dayOfWeek === 'SATURDAY') {
      return '토요일';
    }
    if (scoreAVG.dayOfWeek === 'SUNDAY') {
      return '일요일';
    }
  };
  const convertWeekOfMonth = (scoreAVG: ScoreAVGListType) => {
    return `${scoreAVG.weekOfMonth}주차`;
  };

  const convertMonth = (scoreAVG: ScoreAVGListType) => {
    return `${scoreAVG.month}월`;
  };

  return (
    <div className={'bg-gray0'}>
      <div className={'m-5 flex flex-col gap-y-[24px]'}>
        {/*유저별 목표 기간 전체 필터*/}
        <div
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={'flex items-center gap-x-1 bg-white py-[6px] px-[12px] w-fit rounded-full'}>
          <div className={'text-h6'}>{goalPeriod}</div> {isFilterOpen ? <DropUpIcon /> : <DropDownIcon />}
        </div>
        {isFilterOpen ? (
          <UserCertGoalPeriods setIsOpen={setIsFilterOpen} data={userGoals} setDataState={setGoalPeriod} />
        ) : null}

        {/*막대 그래프*/}
        <GrowthChart />

        {/*주간 성적 자세히 보기*/}
        <div className={'flex flex-col gap-y-[8px]'}>
          <div className={'text-h3 font-bold ml-2'}>주간 성적 자세히 보기</div>
          <div className={'flex flex-col gap-y-[12px]'}>
            {statisticsData?.scoreAVGList.map((scoreAVG: ScoreAVGListType, index: number) => {
              return (
                <DetailedGradeReport
                  prepareYear={
                    selectedReportType === 'WEEK'
                      ? getYear(new Date(scoreAVG.date))
                      : selectedReportType === 'MONTH'
                        ? selectedPrepareWeeksBetween.prepareYear.toString()
                        : selectedReportType === 'YEAR'
                          ? selectedPrepareWeeksBetween.prepareYear.toString()
                          : ''
                  }
                  prepareMonth={
                    selectedReportType === 'WEEK'
                      ? getMonth(new Date(scoreAVG.date))
                      : selectedReportType === 'MONTH'
                        ? selectedPrepareWeeksBetween.prepareMonth
                        : selectedReportType === 'YEAR'
                          ? scoreAVG.month
                          : undefined
                  }
                  prepareWeekly={
                    selectedReportType === 'WEEK'
                      ? getWeek(new Date(scoreAVG.date))
                      : selectedReportType === 'MONTH'
                        ? scoreAVG.weekOfMonth
                        : undefined
                  }
                  prepareDate={selectedReportType === 'WEEK' ? new Date(scoreAVG.date).toISOString() : undefined}
                  key={index}
                  dayOfWeek={
                    selectedReportType === 'WEEK'
                      ? convertDayOfWeekToKorean(scoreAVG)
                      : selectedReportType === 'MONTH'
                        ? convertWeekOfMonth(scoreAVG)
                        : convertMonth(scoreAVG)
                  }
                  scoreAverage={scoreAVG.scoreAverage}
                />
              );
            })}
            `
          </div>
        </div>
      </div>
    </div>
  );
};
export default GrowthChartView;

function DropDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={21} height={21} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13.654 9l-3.5 3-3.5-3" stroke="#0D0E10" strokeLinecap="round" />
    </svg>
  );
}
function DropUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={21} height={21} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.654 12l3.5-3 3.5 3" stroke="#0D0E10" strokeLinecap="round" />
    </svg>
  );
}
