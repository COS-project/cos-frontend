'use client';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import StickGraph from '@/components/exam/StickGraph';
import GoalPeriodFilter from '@/components/home/GoalPeriodFilter';
import useGetMockExamStatistics from '@/lib/hooks/useGetMockExamStatistics';
import useGetUserGoals from '@/lib/hooks/useGetUserGoals';
import {
  selectedDateTypeState,
  selectedPrepareTimeState,
  selectedPrepareWeeksBetweenState,
  selectedReportTypeState,
} from '@/recoil/home/atom';
import { ScoreAVGListType } from '@/types/home/type';

const GrowthChart = () => {
  const [selectedReportType, setSelectedReportType] = useRecoilState<'WEEK' | 'MONTH' | 'YEAR'>(
    selectedReportTypeState,
  );
  const [selectedDateType, setSelectedDateType] = useRecoilState<'DATE' | 'WEEK_OF_MONTH' | 'MONTH'>(
    selectedDateTypeState,
  );
  const [selectedPrepareWeeksBetween, setSelectedPrepareWeeksBetweenState] = useRecoilState(
    selectedPrepareWeeksBetweenState,
  );
  const [selectedPrepareTime, setSelectedPrepareTime] = useRecoilState(selectedPrepareTimeState);
  const { statisticsData } = useGetMockExamStatistics(
    selectedReportType,
    selectedPrepareWeeksBetween.prepareYear,
    selectedPrepareWeeksBetween.prepareMonth,
    selectedPrepareWeeksBetween.prepareWeek,
  );
  const { userGoals } = useGetUserGoals(1);
  const [goalDate, setGoalDate] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // console.log('선택된 목표 기간 시작 날짜', selectedPrepareTime.prepareStartDateTime);
    // console.log('선택된 목표 기간 종료 날짜', selectedPrepareTime.prepareFinishDateTime);
    console.log(
      '주차 계산',
      getWeeksBetween(
        new Date(selectedPrepareTime.prepareStartDateTime),
        new Date(selectedPrepareTime.prepareFinishDateTime),
      ),
    );
  }, [selectedPrepareTime]);

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

  /**
   * 목표기간중 주차가 얼마나 있는지 계산해주는 함수
   * @param startDate 목표 시작날짜 Date 객체
   * @param endDate 목표 종료날짜 Date 객체
   */
  const getWeeksBetween = (startDate: Date, endDate: Date) => {
    let currentWeekStart = new Date(startDate.getTime()); // 시작 날짜를 주의 시작으로 설정

    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay()); // 해당 주의 일요일로 설정
    const weeks = [];

    while (currentWeekStart < endDate) {
      weeks.push(new Date(currentWeekStart));
      currentWeekStart.setDate(currentWeekStart.getDate() + 7); // 다음 주로 이동
    }

    return weeks.map((weekStart, index) => {
      return {
        prepareYear: getYear(new Date(weekStart.toISOString().slice(0, 10))), //몇 년인지
        prepareMonth: getMonth(new Date(weekStart.toISOString().slice(0, 10))), //몇 월인지
        prepareWeek: getWeek(new Date(weekStart.toISOString().slice(0, 10))), //몇 주인지
        prepareDate: new Date(weekStart.toISOString().slice(0, 10)).toISOString(), //몇 주인지
        prepareWeekString: `${getMonth(new Date(weekStart.toISOString().slice(0, 10)))}월 ${getWeek(new Date(weekStart.toISOString().slice(0, 10)))}주차`, //00월 00주
      };
    });
  };

  const weeklyGraph = () => {
    const dayOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

    // Week 배열을 기반으로 요일별 StickGraph를 렌더링합니다.
    return dayOfWeek.map((day, dayIndex) => {
      // 해당 요일에 해당하는 데이터가 있는지 확인합니다.
      const scoreAVG = statisticsData?.scoreAVGList.find((score: ScoreAVGListType) => score.dayOfWeek === day);

      console.log('scoreAVG', scoreAVG);
      const height = scoreAVG ? scoreAVG.scoreAverage : 0;
      return (
        <div key={dayIndex} className="w-full flex justify-center">
          <StickGraph height={height} color="blue" />
        </div>
      );
    });
  };

  const monthlyGraph = () => {
    const weekOfMonth = [1, 2, 3, 4, 5, 6];

    // Week 배열을 기반으로 요일별 StickGraph를 렌더링합니다.
    return weekOfMonth.map((week, weekIndex) => {
      // 해당 요일에 해당하는 데이터가 있는지 확인합니다.
      const scoreAVG = statisticsData?.scoreAVGList.find((score: ScoreAVGListType) => score.weekOfMonth === week);

      const height = scoreAVG ? scoreAVG.scoreAverage : 0;
      return (
        <div key={weekIndex} className="w-full flex justify-center">
          <StickGraph height={height} color="blue" />
        </div>
      );
    });
  };

  const renderGraphLabelsByReportType = () => {
    if (selectedReportType === 'WEEK') {
      return weeklyGraph();
    } else if (selectedReportType === 'MONTH') {
      return monthlyGraph();
    } else if (selectedReportType === 'YEAR' && statisticsData?.scoreAVGList) {
      // JSX 배열을 반환하도록 수정
      return statisticsData.scoreAVGList.map((scoreAVG: ScoreAVGListType, index: number) => {
        return (
          <div key={index} className="w-full flex justify-center">
            <StickGraph height={scoreAVG.scoreAverage} color="blue" />
          </div>
        );
      });
    } else {
      return <div />;
    }
  };

  const xAxisLabelYear = (scoreAVG: ScoreAVGListType, index: number) => {
    if (scoreAVG.month === 1) {
      return (
        <div key={index} className="w-full flex justify-center text-h6">
          {'1월'}
        </div>
      );
    }
    if (scoreAVG.month === 2) {
      return (
        <div key={index} className="w-full flex justify-center text-h6">
          {'2월'}
        </div>
      );
    }
    if (scoreAVG.month === 3) {
      return (
        <div key={index} className="w-full flex justify-center text-h6">
          {'3월'}
        </div>
      );
    }
    if (scoreAVG.month === 4) {
      return (
        <div key={index} className="w-full flex justify-center text-h6">
          {'4월'}
        </div>
      );
    }
    if (scoreAVG.month === 5) {
      return (
        <div key={index} className="w-full flex justify-center text-h6">
          {'5월'}
        </div>
      );
    }
    if (scoreAVG.month === 6) {
      return (
        <div key={index} className="w-full flex justify-center text-h6">
          {'6월'}
        </div>
      );
    }
    if (scoreAVG.month === 7) {
      return (
        <div key={index} className="w-full flex justify-center text-h6">
          {'7월'}
        </div>
      );
    }
    if (scoreAVG.month === 8) {
      return (
        <div key={index} className="w-full flex justify-center text-h6">
          {'8월'}
        </div>
      );
    }
    if (scoreAVG.month === 9) {
      return (
        <div key={index} className="w-full flex justify-center text-h6">
          {'9월'}
        </div>
      );
    }
    if (scoreAVG.month === 10) {
      return (
        <div key={index} className="w-full flex justify-center text-h6">
          {'10월'}
        </div>
      );
    }
    if (scoreAVG.month === 11) {
      return (
        <div key={index} className="w-full flex justify-center text-h6">
          {'11월'}
        </div>
      );
    }
    if (scoreAVG.month === 12) {
      return (
        <div key={index} className="w-full flex justify-center text-h6">
          {'12월'}
        </div>
      );
    }
  };
  const xAxisLabelMonth = () => {
    return (
      <div className={'w-[85%] flex justify-between'}>
        <div className="w-full flex justify-center text-h6">{'1주'}</div>
        <div className="w-full flex justify-center text-h6">{'2주'}</div>
        <div className="w-full flex justify-center text-h6">{'3주'}</div>
        <div className="w-full flex justify-center text-h6">{'4주'}</div>
        <div className="w-full flex justify-center text-h6">{'5주'}</div>
        <div className="w-full flex justify-center text-h6">{'6주'}</div>
      </div>
    );
  };
  const xAxisLabelWeek = () => {
    return (
      <div className={'w-[85%] flex justify-between'}>
        <div className="w-full flex justify-center text-h6">{'월'}</div>
        <div className="w-full flex justify-center text-h6">{'화'}</div>
        <div className="w-full flex justify-center text-h6">{'수'}</div>
        <div className="w-full flex justify-center text-h6">{'목'}</div>
        <div className="w-full flex justify-center text-h6">{'금'}</div>
        <div className="w-full flex justify-center text-h6">{'토'}</div>
        <div className="w-full flex justify-center text-h6">{'일'}</div>
      </div>
    );
  };

  const renderLabelComponent = (selectedReportType: string) => {
    if (selectedReportType === 'WEEK') {
      return xAxisLabelWeek();
    } else if (selectedReportType === 'MONTH') {
      return xAxisLabelMonth();
    } else if (selectedReportType === 'YEAR' && statisticsData?.scoreAVGList) {
      // map 함수의 결과를 직접 반환합니다.
      return statisticsData.scoreAVGList.map((scoreAVG: ScoreAVGListType, index: number) => {
        return xAxisLabelYear(scoreAVG, index);
      });
    } else {
      return <div />;
    }
  };

  return (
    <div>
      <div className="bg-white rounded-[32px] p-4 border-[1px] border-gray2">
        <div className="font-bold text-h3">성장그래프</div>

        {/*주간, 월간, 연간 필터 session*/}
        <div className={'flex w-[100%] justify-evenly rounded-[12px] border-[1px] border-gray1'}>
          <div
            onClick={() => {
              setSelectedReportType('WEEK');
              setSelectedDateType('DATE');
            }}
            className={
              selectedReportType === 'WEEK'
                ? 'flex px-8 py-1 w-full border-[1px] border-gray1 justify-center items-center rounded-[12px] bg-gray0'
                : 'flex px-8 py-1 w-full justify-center items-center rounded-[12px] text-gray4'
            }>
            주간
          </div>
          <div
            onClick={() => {
              setSelectedReportType('MONTH');
              setSelectedDateType('WEEK_OF_MONTH');
            }}
            className={
              selectedReportType === 'MONTH'
                ? 'flex px-8 py-1 w-full border-[1px] border-gray1 justify-center items-center rounded-[12px] bg-gray0'
                : 'flex px-8 py-1 w-full justify-center items-center rounded-[12px] text-gray4'
            }>
            월간
          </div>
          <div
            onClick={() => {
              setSelectedReportType('YEAR');
              setSelectedDateType('MONTH');
            }}
            className={
              selectedReportType === 'YEAR'
                ? 'flex px-8 py-1 w-full border-[1px] border-gray1 justify-center items-center rounded-[12px] bg-gray0'
                : 'flex px-8 py-1 w-full justify-center items-center rounded-[12px] text-gray4'
            }>
            연간
          </div>
        </div>

        {/*  */}
        <div className={'flex text-h6 gap-x-1 relative'}>
          <div onClick={() => setIsFilterOpen(!isFilterOpen)} className={'flex'}>
            <div>
              {selectedReportType === 'WEEK'
                ? selectedPrepareWeeksBetween.prepareWeekString
                : selectedReportType === 'MONTH'
                  ? `${selectedPrepareWeeksBetween.prepareMonth}월`
                  : selectedReportType === 'YEAR'
                    ? `${selectedPrepareWeeksBetween.prepareYear}년`
                    : null}
            </div>
            {isFilterOpen ? <DropUpIcon /> : <DropDownIcon />}
          </div>
          {isFilterOpen ? (
            <GoalPeriodFilter
              usage={'eachGoalPeriod'}
              reportType={selectedReportType}
              className={'absolute z-10 top-5'}
              setDataState={setSelectedPrepareWeeksBetweenState}
              data={getWeeksBetween(
                new Date(selectedPrepareTime.prepareStartDateTime),
                new Date(selectedPrepareTime.prepareFinishDateTime),
              )}
              setIsOpen={setIsFilterOpen}
            />
          ) : null}
          <div>평균 점수</div>
        </div>

        <div className={'font-semibold text-h3'}>{statisticsData?.average}점</div>

        <div className="flex items-center space-x-1">
          <div className="w-[86%] border-t border-gray1"></div>
          <div className="text-gray3 text-h5">100점</div>
        </div>

        <div className="flex items-end">
          <div className="w-[100%] justify-between">
            <div className="flex h-32">{renderGraphLabelsByReportType()}</div>
            <div className="border-t border-gray1"></div>
          </div>
          <div className="w-[15%] text-gray3 text-h5">0점</div>
        </div>

        <div className="flex w-[102%] justify-between">
          {renderLabelComponent(selectedReportType)}
          <div className="w-[15%] text-white text-h5">0분</div>
        </div>
      </div>
    </div>
  );
};
export default GrowthChart;

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
