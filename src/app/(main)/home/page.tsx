'use client';

import { EventSourcePolyfill } from 'event-source-polyfill';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, SVGProps, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import AverageAccurayChat from '@/components/home/AverageAccurayChat';
import AverageTakenTimeGraphReport from '@/components/home/AverageTakenTimeGraphReport';
import BestTip from '@/components/home/BestTip';
import GoalSettingStatusModal from '@/components/home/goal-setting/GoalSettingStatusModal';
import GoalBox from '@/components/home/GoalBox';
import RecentGrowthChart from '@/components/home/RecentGrowthChart';
import UserCertGoalPeriods from '@/components/home/UserCertGoalPeriods';
import TodayGoal from '@/components/TodayGoal';
import useAverageSubjectInfo from '@/lib/hooks/useAverageSubjectInfo';
import useGetCertificationInfo from '@/lib/hooks/useGetCertificationInfo';
import useGetUserGoals from '@/lib/hooks/useGetUserGoals';
import useGoalAchievement from '@/lib/hooks/useGoalAchievement';
import useGoalSettingStatus from '@/lib/hooks/UserGoalSettingStatus';
import { certificateIdAtom } from '@/recoil/atom';
import { AverageSubjectInfoType, UserCertGoalPeriodType } from '@/types/home/type';
import { selectedPrepareTimeState } from '@/recoil/home/atom';
function HomeComponents() {
  const searchParams = useSearchParams();
  const certificateId = useRecoilValue(certificateIdAtom);
  const [alarmEvent, setAlarmEvent] = useState<undefined | EventSource>();
  const [isGoalPeriodFilterOpen, setIsGoalPeriodFilterOpen] = useState(false);
  const [goalPeriodContent, setGoalPeriodContent] = useState<string>('목표 기간 선택');
  const [isGoalSettingStatusModalOpen, setIsGoalSettingStatusModalOpen] = useState(false);
  const EventSource = EventSourcePolyfill;

  const setSelectedPrepareTime = useSetRecoilState(selectedPrepareTimeState);

  const accessToken = searchParams.get('accessToken') || '';
  const refreshToken = searchParams.get('refreshToken') || '';

  const { userGoals } = useGetUserGoals(certificateId);
  const { goalAchievementData } = useGoalAchievement(certificateId);
  const { averageSubjectList } = useAverageSubjectInfo(certificateId);
  const { goalSettingStatus } = useGoalSettingStatus(certificateId);

  // AccessToken, RefreshToken 저장
  useEffect(() => {
    if (typeof window !== 'undefined' && accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log('액세스 토큰 저장:', accessToken);
      console.log('리프레시 토큰 저장:', refreshToken);
    }
  }, [accessToken, refreshToken]);

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
      setGoalPeriodContent(
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
  }, [userGoals]);

  // // EventSource 연결
  // useEffect(() => {
  //   if (typeof window !== 'undefined' && localStorage.getItem('accessToken')) {
  //     const eventSource = new EventSourcePolyfill('http://cercat.o-r.kr/api/v2/alarms/subscribe', {
  //       headers: {
  //         'Access-Token': localStorage.getItem('accessToken') || '',
  //       },
  //     });
  //
  //     eventSource.addEventListener('connect', (event: any) => {
  //       const { data: receivedConnectData } = event;
  //       if (receivedConnectData === 'SSE 연결이 완료되었습니다.') {
  //         console.log('SSE CONNECTED');
  //       } else {
  //         console.log('Event:', event);
  //       }
  //     });
  //
  //     setAlarmEvent(eventSource);
  //
  //     return () => {
  //       eventSource.close();
  //     };
  //   }
  // }, [accessToken]);

  const sumTotalTakenTime = () => {
    return averageSubjectList ? averageSubjectList.reduce((sum, subject) => sum + subject.totalTakenTime, 0) : 0;
  };

  useEffect(() => {
    console.log('goalAchievementData:', goalAchievementData);
  }, [goalAchievementData]);

  useEffect(() => {
    if (goalSettingStatus) {
      setIsGoalSettingStatusModalOpen(!goalSettingStatus.result);
    }
  }, [goalSettingStatus]);

  return (
    <main>
      {isGoalSettingStatusModalOpen && (
        <GoalSettingStatusModal
          isGoalSettingStatusModalOpen={isGoalSettingStatusModalOpen}
          setIsGoalSettingStatusModalOpen={setIsGoalSettingStatusModalOpen}
        />
      )}
      <div className="bg-gray0 h-screen overflow-y-auto">
        <Header />
        <Header headerType={'second'}></Header>
        <div className={'mt-4 px-5 flex flex-col gap-y-5'}>
          {goalAchievementData && (
            <GoalBox
              goalMockExams={goalAchievementData.result.goalMockExams}
              currentMockExams={goalAchievementData.result.currentMockExams}
              goalStudyTime={goalAchievementData.result.goalStudyTime}
              currentStudyTime={goalAchievementData.result.currentStudyTime}
              maxScore={goalAchievementData.result.maxScore}
              goalScore={goalAchievementData.result.goalScore} />
          )}
          <TodayGoal />
          <RecentGrowthChart />
          <AverageAccurayChat subjectResults={averageSubjectList || []} />
          <AverageTakenTimeGraphReport
            totalTakenTime={sumTotalTakenTime()}
            subjectResults={averageSubjectList}
            timeLimit={averageSubjectList && averageSubjectList[0].timeLimit}
          />
          <BestTip />
        </div>
        <div className={'h-[120px]'}></div>
        <NavBar />
      </div>
    </main>
  );
}

const DropUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" d="M6.5 12 10 9l3.5 3" />
  </svg>
);

const DropDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" d="M13.5 9 10 12 6.5 9" />
  </svg>
);

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeComponents />
    </Suspense>
  );
}
