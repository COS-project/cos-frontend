'use client';

import React from 'react';
import { useRecoilState } from 'recoil';
import { twMerge } from 'tailwind-merge';

import { selectedPrepareTimeState } from '@/recoil/home/atom';
import { UserCertGoalPeriodType } from '@/types/home/type';

interface Props {
  data: UserCertGoalPeriodType[] | null;
  className?: string;
  setDataState: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserCertGoalPeriods = (props: Props) => {
  const { data, className, setDataState, setIsOpen } = props;
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
   * 31일 이전이면 YY.MM.DD, 31일 이후이면 YY.MM.주차
   * @param prepareStartDateTime 목표 시작 날짜
   * @param prepareFinishDateTime 목표 종료 날짜
   * @param datum 목표 시작 날짜와 종료날짜를 담고있는 date
   */
  const formatGoalPeriod = (prepareStartDateTime: Date, prepareFinishDateTime: Date, datum: UserCertGoalPeriodType) => {
    const diff = prepareFinishDateTime.getTime() - prepareStartDateTime.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const formatDate = (date: Date) => {
      const year = date.getFullYear().toString().slice(-2); // 연도의 마지막 두 자리만 사용
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월을 두 자리로 맞추기
      const day = date.getDate().toString().padStart(2, '0'); // 일을 두 자리로 맞추기
      return `${year}.${month}.${day}`;
    };

    if (days < 31) {
      const startDate = new Date(datum.prepareStartDateTime);
      const finishDate = new Date(datum.prepareFinishDateTime);
      return `${formatDate(startDate)} ~ ${formatDate(finishDate)}`;
    } else {
      const startDate = new Date(datum.prepareStartDateTime);
      const finishDate = new Date(datum.prepareFinishDateTime);
      const startYear = startDate.getFullYear().toString().slice(-2);
      const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0');
      const startWeek = getWeek(startDate);

      const finishYear = finishDate.getFullYear().toString().slice(-2);
      const finishMonth = (finishDate.getMonth() + 1).toString().padStart(2, '0');
      const finishWeek = getWeek(finishDate);

      return `${startYear}.${startMonth}.${startWeek}주차 ~ ${finishYear}.${finishMonth}.${finishWeek}주차`;
    }
  };

  return (
    <div
      className={twMerge(
        'border-[1px] border-gray2 bg-white rounded-[16px] py-2 z-10 h-[250px] overflow-y-scroll',
        className,
      )}>
      {!data || data.length === 0 ? (
        <div>error</div>
      ) : (
        data.map((datum: UserCertGoalPeriodType, index: number) => {
          return (
            <div
              key={index}
              className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
              onClick={() => {
                setDataState(
                  formatGoalPeriod(new Date(datum.prepareStartDateTime), new Date(datum.prepareStartDateTime), datum),
                );
                setSelectedPrepareTime((prevState) => ({
                  ...prevState,
                  prepareFinishDateTime: datum.prepareFinishDateTime,
                  prepareStartDateTime: datum.prepareStartDateTime,
                  goalId: datum.goalId,
                }));
                setIsOpen(false);
              }}>
              {formatGoalPeriod(new Date(datum.prepareStartDateTime), new Date(datum.prepareFinishDateTime), datum)}
            </div>
          );
        })
      )}
    </div>
  );
};
export default UserCertGoalPeriods;
