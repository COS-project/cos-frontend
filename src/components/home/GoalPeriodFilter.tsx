'use client';

import React, { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { twMerge } from 'tailwind-merge';

import { selectedPrepareTimeState } from '@/recoil/home/atom';
import { eachGoalPeriodType, UserGoalsType } from '@/types/home/type';

interface Props {
  usage: string; //overallGoalPeriod: 사용자의 전체 목표 기간, eachGoalPeriod: 그 중 하나만 선택한 목표 기간
  reportType?: string; // <'WEEK' | 'MONTH' | 'YEAR'>
  data: (UserGoalsType | eachGoalPeriodType)[];
  className?: string;
  setDataState: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<eachGoalPeriodType>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 필터 모달창입니다.
 */
const GoalPeriodFilter = (props: Props) => {
  const { usage, data, reportType, className, setDataState, setIsOpen } = props;
  const [selectedPrepareTime, setSelectedPrepareTime] = useRecoilState(selectedPrepareTimeState);

  /**
   * 일를 계산해주는 함수
   * @param date 목표 날짜
   */
  const getDate = (date: Date) => {
    return date.getDate();
  };
  /**
   * 주차를 계산해주는 함수
   * @param date 목표 날짜
   */
  const getWeek = (date: Date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();

    return Math.ceil((currentDate + firstDay) / 7);
  };

  /**
   * 목표 달을 계산해주는 함수
   * @param date 목표 날짜
   */
  const getMonth = (date: Date) => {
    return date.getMonth() + 1;
  };

  /**
   * 목표 년도 계산해주는 함수
   * @param date 목표 날짜
   */
  const getYear = (date: Date) => {
    return date.getFullYear().toString().slice(-2);
  };

  /**
   * 31일 이전이면 00년 00월 00알, 31일 이후이면 00년 00월 00주
   * @param prepareStartDateTime 목표 시작 날짜
   * @param prepareFinishDateTime 목표 종료 날짜
   * @param datum 목표 시작 날짜와 종료날짜를 담고있는 date
   */
  const formatGoalPeriod = (prepareStartDateTime: Date, prepareFinishDateTime: Date, datum: GoalPeriodType) => {
    const diff = prepareFinishDateTime.getTime() - prepareStartDateTime.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 31) {
      return `${getYear(new Date(datum.prepareStartDateTime))}년 ${getMonth(new Date(datum.prepareStartDateTime))}월 ${getDate(new Date(datum.prepareStartDateTime))}일 ~ ${getYear(new Date(datum.prepareFinishDateTime))}년 ${getMonth(new Date(datum.prepareFinishDateTime))}월 ${getDate(new Date(datum.prepareFinishDateTime))}일`;
    } else {
      return `${getYear(new Date(datum.prepareStartDateTime))}년 ${getMonth(new Date(datum.prepareStartDateTime))}월 ${getWeek(new Date(datum.prepareStartDateTime))}주차 ~ ${getYear(new Date(datum.prepareFinishDateTime))}년 ${getMonth(new Date(datum.prepareFinishDateTime))}월 ${getWeek(new Date(datum.prepareFinishDateTime))}주차`;
    }
  };

  // 중복을 제거한 데이터 배열 생성
  const uniqueData = useMemo(() => {
    const uniqueSet = new Map();

    data.forEach((item) => {
      if ('prepareYear' in item && 'prepareMonth' in item && 'prepareWeek' in item) {
        const key = `${item.prepareYear}-${item.prepareMonth}-${item.prepareWeek}-${item.prepareWeekString}`;
        if (!uniqueSet.has(key)) {
          uniqueSet.set(key, item);
        }
      }
    });

    return Array.from(uniqueSet.values());
  }, [data]);

  useEffect(() => {
    console.log('reportType', reportType);
  }, [reportType]);

  return (
    <div
      className={twMerge(
        'border-[1px] border-gray2 bg-white rounded-[16px] py-2 z-10 h-[250px] overflow-y-scroll',
        className,
      )}>
      {!data || data.length === 0 ? (
        <div>error</div>
      ) : (
        data.map((datum: UserGoalsType | eachGoalPeriodType, index) => {
          return (
            <div
              key={index}
              className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
              onClick={() => {
                if (usage === 'overallGoalPeriod') {
                  if ('prepareStartDateTime' in datum) {
                    setDataState(
                      formatGoalPeriod(
                        new Date(datum.prepareStartDateTime),
                        new Date(datum.prepareStartDateTime),
                        datum,
                      ),
                    );
                  }
                  if ('prepareFinishDateTime' in datum) {
                    setSelectedPrepareTime((prevState) => ({
                      ...prevState,
                      prepareFinishDateTime: datum.prepareFinishDateTime,
                      prepareStartDateTime: datum.prepareStartDateTime,
                      goalId: datum.goalId,
                    }));
                  }
                }
                if (usage === 'eachGoalPeriod') {
                  setDataState((prevState: eachGoalPeriodType) => ({
                    ...prevState,
                    prepareDate: datum.prepareDate,
                    prepareYear: datum.prepareYear,
                    prepareMonth: datum.prepareMonth,
                    prepareWeek: datum.prepareWeek,
                    prepareWeekString: datum.prepareWeekString,
                  }));
                }
                setIsOpen(false);
              }}>
              {usage === 'overallGoalPeriod'
                ? formatGoalPeriod(new Date(datum.prepareStartDateTime), new Date(datum.prepareEndDateTime), datum)
                : reportType === 'WEEK'
                  ? datum.prepareWeekString
                  : reportType === 'MONTH'
                    ? `${datum.prepareMonth}월`
                    : reportType === 'YEAR'
                      ? `${datum.prepareYear}년`
                      : 'dpfjdj'}
            </div>
          );
        })
      )}
    </div>
  );
};
export default GoalPeriodFilter;
