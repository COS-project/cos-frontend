'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Header from '@/components/common/Header';
import DetailedGradeReport from '@/components/home/DetailedGradeReport';
import GrowthChart from '@/components/home/GrowthChart';
import UserCertGoalPeriods from '@/components/home/UserCertGoalPeriods';
import useGetMockExamStatistics from '@/lib/hooks/useGetMockExamStatistics';
import useGetUserGoals from '@/lib/hooks/useGetUserGoals';
import { certificateIdAtom } from '@/recoil/atom';
import {
  selectedPrepareTimeState,
  selectedPrepareWeeksBetweenState,
  selectedReportTypeState,
} from '@/recoil/home/atom';
import { ScoreAVGListType, UserCertGoalPeriodType } from '@/types/home/type';
import { getDate } from 'date-fns';

const GrowthChartView = () => {
  const certificateId = useRecoilValue(certificateIdAtom);
  const { userGoals } = useGetUserGoals(certificateId);
  const [selectedPrepareWeeksBetween, setSelectedPrepareWeeksBetweenState] = useRecoilState(
    selectedPrepareWeeksBetweenState,
  );

  const [selectedReportType, setSelectedReportType] = useRecoilState<'WEEKLY' | 'MONTHLY' | 'YEARLY'>(
    selectedReportTypeState,
  );

  const { statisticsData } = useGetMockExamStatistics(
    certificateId,
    selectedReportType,
    selectedPrepareWeeksBetween.prepareYear,
    selectedPrepareWeeksBetween.prepareMonth,
    selectedPrepareWeeksBetween.prepareWeekly,
  );
  const [goalPeriod, setGoalPeriod] = useState<string>('목표 기간 선택');
  const [selectedPrepareTime, setSelectedPrepareTime] = useRecoilState(selectedPrepareTimeState);

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const router = useRouter();

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

  useEffect(() => {
    if (userGoals) {
      setGoalPeriod(
        formatGoalPeriod(
          new Date(userGoals[0].prepareStartDateTime),
          new Date(userGoals[0].prepareStartDateTime),
          userGoals[0],
        ),
      );
      setSelectedPrepareTime((prevState) => ({
        ...prevState,
        prepareFinishDateTime: userGoals[0].prepareFinishDateTime,
        prepareStartDateTime: userGoals[0].prepareStartDateTime,
        goalId: userGoals[0].goalId,
      }));
    }
    console.log('성적그래프 통계', statisticsData);
  }, [userGoals]);

  /**
   * 목표 주차 계산해주는 함수
   * @param date 목표 날짜
   */
  const getWeek = (date: Date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();

    return Math.ceil((currentDate + firstDay) / 7);
  };

  /**
   * 목표 월 계산해주는 함수
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
    return date.getFullYear().toString().slice(-4);
  };

  /**
   * 요일 영어 값을 한국어로 바꿔주는 함수
   */
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

  /**
   * 주차 변경해주는 함수
   */
  const convertWeekOfMonth = (scoreAVG: ScoreAVGListType) => {
    return `${scoreAVG.weekOfMonth}주차`;
  };

  /**
   * 월 변경해주는 함수
   */
  const convertMonth = (scoreAVG: ScoreAVGListType) => {
    return `${scoreAVG.month}월`;
  };

  const onBack = () => {
    router.push('/home');
  };

  return (
    <div className={'bg-gray0 min-h-screen pb-6'}>
      <Header title={'성장그래프 자세히보기'} headerType={'dynamic'} onBack={onBack} />
      <div className={'relative m-5 flex flex-col gap-y-[24px]'}>
        {/*유저별 목표 기간 전체 필터*/}
        <section className={'flex flex-col gap-y-[16px]'}>
          <div
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={'flex items-center gap-x-1 bg-white py-[6px] px-[12px] w-fit rounded-full'}>
            <div className={'text-h6'}>{goalPeriod}</div>
            {isFilterOpen ? <DropUpIcon /> : <DropDownIcon />}
          </div>
          {isFilterOpen ? (
            <UserCertGoalPeriods
              setIsOpen={setIsFilterOpen}
              data={userGoals}
              setDataState={setGoalPeriod}
              className={'absolute top-10 h-fit'}
            />
          ) : null}

          {/*막대 그래프*/}
          <GrowthChart />
        </section>

        {/*주간 성적 자세히 보기*/}
        <div className={'flex flex-col gap-y-[8px]'}>
          {statisticsData && statisticsData?.scoreAVGList.length !== 0 && (
            <div className={'text-h3 font-bold ml-2'}>
              {selectedReportType === 'WEEKLY' ? '주간' : selectedReportType === 'MONTHLY' ? '월간' : '년간'} 성적
              자세히 보기
            </div>
          )}
          <div className={'flex flex-col gap-y-[12px]'}>
            {statisticsData?.scoreAVGList.map((scoreAVG: ScoreAVGListType, index: number) => {
              return (
                <DetailedGradeReport
                  prepareYear={
                    selectedReportType === 'WEEKLY'
                      ? getYear(new Date(scoreAVG.date))
                      : selectedReportType === 'MONTHLY'
                      ? selectedPrepareWeeksBetween.prepareYear.toString()
                      : selectedReportType === 'YEARLY'
                      ? selectedPrepareWeeksBetween.prepareYear.toString()
                      : ''
                  }
                  prepareMonth={
                    selectedReportType === 'WEEKLY'
                      ? getMonth(new Date(scoreAVG.date))
                      : selectedReportType === 'MONTHLY'
                      ? selectedPrepareWeeksBetween.prepareMonth
                      : selectedReportType === 'YEARLY'
                      ? scoreAVG.month
                      : undefined
                  }
                  prepareWeekly={
                    selectedReportType === 'WEEKLY'
                      ? getWeek(new Date(scoreAVG.date))
                      : selectedReportType === 'MONTHLY'
                      ? scoreAVG.weekOfMonth
                      : undefined
                  }
                  prepareDate={selectedReportType === 'WEEKLY' ? new Date(scoreAVG.date).toISOString() : undefined}
                  key={index}
                  dayOfWeek={
                    selectedReportType === 'WEEKLY'
                      ? convertDayOfWeekToKorean(scoreAVG)
                      : selectedReportType === 'MONTHLY'
                      ? convertWeekOfMonth(scoreAVG)
                      : convertMonth(scoreAVG)
                  }
                  scoreAverage={scoreAVG.scoreAverage}
                />
              );
            })}
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
