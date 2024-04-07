'use client';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import FilterModal from '@/components/common/FilterModal';
import DetailedGradeReport from '@/components/home/DetailedGradeReport';
import GrowthChart from '@/components/home/GrowthChart';
import useGetMockExamStatistics from '@/lib/hooks/useGetMockExamStatistics';
import useGetUserGoals from '@/lib/hooks/useGetUserGoals';
import {
  selectedDateTypeState,
  selectedPrepareTimeState,
  selectedPrepareWeeksBetweenState,
  selectedReportTypeState,
} from '@/recoil/home/atom';
import GoalPeriodFilter from '@/components/home/GoalPeriodFilter';
import useGetMockExamDetail from '@/lib/hooks/useGetMockExamDetail';
import { ScoreAVGListType } from '@/types/home/type';

const GrowthChartView = () => {
  const { userGoals } = useGetUserGoals(1);
  const [selectedPrepareWeeksBetween, setSelectedPrepareWeeksBetweenState] = useRecoilState(
    selectedPrepareWeeksBetweenState,
  );
  const [selectedPrepareTime, setSelectedPrepareTime] = useRecoilState(selectedPrepareTimeState);
  const [selectedReportType, setSelectedReportType] = useRecoilState<'WEEK' | 'MONTH' | 'YEAR'>(
    selectedReportTypeState,
  );
  const [selectedDateType, setSelectedDateType] = useRecoilState<'DATE' | 'WEEK_OF_MONTH' | 'MONTH'>(
    selectedDateTypeState,
  );
  const { statisticsData } = useGetMockExamStatistics(
    selectedReportType,
    selectedPrepareWeeksBetween.prepareYear,
    selectedPrepareWeeksBetween.prepareMonth,
    selectedPrepareWeeksBetween.prepareWeek,
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

  const convertDayOfWeekToKorean = (scoreAVG) => {
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
  const convertWeekOfMonth = (scoreAVG) => {
    if (scoreAVG.weekOfMonth === 1) {
      return '1주차';
    }
    if (scoreAVG.weekOfMonth === 2) {
      return '2주차';
    }
    if (scoreAVG.weekOfMonth === 3) {
      return '3주차';
    }
    if (scoreAVG.weekOfMonth === 4) {
      return '4주차';
    }
    if (scoreAVG.weekOfMonth === 5) {
      return '5주차';
    }
    if (scoreAVG.weekOfMonth === 6) {
      return '6주차';
    }
  };

  const convertMonth = (scoreAVG) => {
    if (scoreAVG.month === 1) {
      return '1월';
    }
    if (scoreAVG.month === 2) {
      return '2월';
    }
    if (scoreAVG.month === 3) {
      return '3월';
    }
    if (scoreAVG.month === 4) {
      return '4월';
    }
    if (scoreAVG.month === 5) {
      return '5월';
    }
    if (scoreAVG.month === 6) {
      return '6월';
    }
    if (scoreAVG.month === 7) {
      return '7월';
    }
    if (scoreAVG.month === 8) {
      return '8월';
    }
    if (scoreAVG.month === 9) {
      return '9월';
    }
    if (scoreAVG.month === 10) {
      return '10월';
    }
    if (scoreAVG.month === 11) {
      return '11월';
    }
    if (scoreAVG.month === 12) {
      return '12월';
    }
  };

  return (
    <div className={'bg-gray0'}>
      <div className={'m-5 flex flex-col gap-y-[24px]'}>
        <div
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={'flex items-center gap-x-1 bg-white py-[6px] px-[12px] w-fit rounded-full'}>
          <div className={'text-h6'}>{goalPeriod}</div> {isFilterOpen ? <DropUpIcon /> : <DropDownIcon />}
        </div>
        {isFilterOpen ? (
          <GoalPeriodFilter
            usage={'overallGoalPeriod'}
            data={userGoals}
            setIsOpen={setIsFilterOpen}
            setDataState={setGoalPeriod}
          />
        ) : null}
        <GrowthChart />
        <div className={'flex flex-col gap-y-[8px]'}>
          <div className={'text-h3 font-bold ml-2'}>주간 성적 자세히 보기</div>
          <div className={'flex flex-col gap-y-[12px]'}>
            {statisticsData?.scoreAVGList.map((scoreAVG: ScoreAVGListType, index) => {
              return (
                <DetailedGradeReport
                  prepareYear={
                    selectedReportType === 'WEEK'
                      ? parseInt(getYear(new Date(scoreAVG.date)))
                      : selectedReportType === 'MONTH'
                        ? selectedPrepareWeeksBetween.prepareYear
                        : selectedReportType === 'YEAR'
                          ? selectedPrepareWeeksBetween.prepareYear
                          : 0
                  }
                  prepareMonth={
                    selectedReportType === 'WEEK'
                      ? getMonth(new Date(scoreAVG.date))
                      : selectedReportType === 'MONTH'
                        ? selectedPrepareWeeksBetween.prepareMonth
                        : selectedReportType === 'YEAR'
                          ? scoreAVG.month
                          : 0
                  }
                  prepareWeek={
                    selectedReportType === 'WEEK'
                      ? getWeek(new Date(scoreAVG.date))
                      : selectedReportType === 'MONTH'
                        ? scoreAVG.weekOfMonth
                        : 0
                  }
                  prepareDate={selectedReportType === 'WEEK' ? new Date(scoreAVG.date).toISOString() : ''}
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
