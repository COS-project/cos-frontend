'use client';

import { EventSourcePolyfill } from 'event-source-polyfill';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import React, { memo, Suspense, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import Spinner from '@/components/common/Spinner';
import AverageAccurayChat from '@/components/home/AverageAccurayChat';
import AverageTakenTimeGraphReport from '@/components/home/AverageTakenTimeGraphReport';
import BestTip from '@/components/home/BestTip';
import GoalSettingStatusModal from '@/components/home/goal-setting/GoalSettingStatusModal';
import GoalBox from '@/components/home/GoalBox';
import RecentGrowthChart from '@/components/home/RecentGrowthChart';
import AverageAccurayChatSkeleton from '@/components/home/skeleton/AverageAccurayChatSkeleton';
import AverageTakenTimeGraphReportSkeleton from '@/components/home/skeleton/AverageTakenTimeGraphReportSkeleton';
import GoalBoxSkeleton from '@/components/home/skeleton/GoalBoxSkeleton';
import HomeSkeleton from '@/components/home/skeleton/HomeSkeleton';
import TodayGoalSkeleton from '@/components/home/skeleton/TodayGoalSkeleton';
import StopWatchActiveButton from '@/components/stopwatch/StopWatchActiveButton';
import TodayGoal from '@/components/TodayGoal';
import { getAlarms, getAlarmUnreadCount } from '@/lib/api/alarm';
import useAverageSubjectInfo from '@/lib/hooks/useAverageSubjectInfo';
import useBest3TipPosts from '@/lib/hooks/useBest3TipPosts';
import useGetUserGoals from '@/lib/hooks/useGetUserGoals';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import useGoalAchievement from '@/lib/hooks/useGoalAchievement';
import useGoalSettingStatus from '@/lib/hooks/UserGoalSettingStatus';
import { alarmAtom, readAlarmListAtom, unreadAlarmCountAtom } from '@/recoil/alarm/atom';
import { certificateIdAtom, isInitialCertificateIdSetAtom } from '@/recoil/atom';
import { selectedPrepareTimeState } from '@/recoil/home/atom';
import { Alarm } from '@/types/alarm/type';
import { ResponseType } from '@/types/common/type';
import { UserCertGoalPeriodType } from '@/types/home/type';

// ✅ 변경: React.memo()로 감싸줍니다.
const MemoizedGoalBox = memo(GoalBox);
const MemoizedTodayGoal = memo(TodayGoal);
const MemoizedRecentGrowthChart = memo(RecentGrowthChart); // RecentGrowthChart가 props를 잘 받는지 확인 필요
const MemoizedAverageAccurayChat = memo(AverageAccurayChat);
const MemoizedAverageTakenTimeGraphReport = memo(AverageTakenTimeGraphReport);
const MemoizedBestTip = memo(BestTip); // BestTip이 props를 잘 받는지 확인 필요

function HomeComponents() {
  const searchParams = useSearchParams();
  const certificateId = useRecoilValue(certificateIdAtom);
  const isCertIdInitialized = useRecoilValue(isInitialCertificateIdSetAtom);
  const { userProfile } = useGetUserProfile();
  const [goalPeriodContent, setGoalPeriodContent] = useState<string>('목표 기간 선택');
  const [isGoalSettingStatusModalOpen, setIsGoalSettingStatusModalOpen] = useState(false);

  const setSelectedPrepareTime = useSetRecoilState(selectedPrepareTimeState);

  const rawAccessToken = searchParams.get('accessToken') || '';
  const rawRefreshToken = searchParams.get('refreshToken') || '';

  const accessToken = rawAccessToken.replace('%20', ' ');
  const refreshToken = rawRefreshToken.replace('%20', ' ');

  const [isCookieSet, setIsCookieSet] = useState(false); // ✅ 쿠키 저장 여부

  const { userGoals } = useGetUserGoals(isCertIdInitialized ? certificateId : null);
  const { goalAchievementData } = useGoalAchievement(isCertIdInitialized ? certificateId : null);
  const { averageSubjectList } = useAverageSubjectInfo(isCertIdInitialized ? certificateId : null);
  const { goalSettingStatus } = useGoalSettingStatus(isCertIdInitialized ? certificateId : null);
  const { bestTipPosts } = useBest3TipPosts(isCertIdInitialized ? certificateId : null);

  const [alarms, setAlarms] = useRecoilState<Alarm[]>(alarmAtom);
  const [readAlarmList, setReadAlarmList] = useRecoilState<number[]>(readAlarmListAtom);
  const unreadCount = useRecoilValue(unreadAlarmCountAtom);
  const setUnreadCount = useSetRecoilState(unreadAlarmCountAtom);

  // AccessToken, RefreshToken 저장
  useEffect(() => {
    const existingAccessToken = Cookies.get('accessToken');
    const existingRefreshToken = Cookies.get('refreshToken');

    // ✅ 쿼리에 토큰이 있으면 무조건 쿠키 갱신
    if (accessToken && refreshToken) {
      Cookies.set('accessToken', accessToken, { expires: Date.now() + 604800000 });
      Cookies.set('refreshToken', refreshToken, { expires: Date.now() + 604800000 });
      setIsCookieSet(true);
      return;
    }

    // ✅ 쿼리 없지만 쿠키 있으면 그대로 진행
    if (existingAccessToken && existingRefreshToken) {
      setIsCookieSet(true);
    } else {
      setIsCookieSet(false);
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (userProfile) {
      Cookies.set('userId', String(userProfile.userId), { expires: Date.now() + 604800000 });
    }
  }, [userProfile]);

  useEffect(() => {
    const connect = () => {
      const accessToken = Cookies.get('accessToken');

      if (!accessToken) {
        console.error('Access token is missing.');
        return;
      }

      const eventSource = new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_ALARM_URL}/v2/alarms/subscribe`, {
        headers: {
          'Access-Token': accessToken,
        },
      });

      eventSource.onopen = () => {
        getAlarms().then((res: ResponseType<Alarm[]>) => {
          console.log('res', res.result);
          if (res && res.result) {
            setAlarms(res.result);
          }
        });
      };

      eventSource.addEventListener('alarm', (event: any) => {
        try {
          const newAlarm = JSON.parse(event.data);
          setAlarms((prevAlarms) => [newAlarm, ...prevAlarms]);

          getAlarmUnreadCount().then((res: ResponseType<number>) => {
            if (res && res.result !== undefined) {
              setUnreadCount(res.result);
            }
          });
        } catch (e) {
          console.error('알림 데이터 파싱 오류:', e);
        }
      });

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    };

    connect();
  }, []);

  useEffect(() => {
    if (alarms) {
      // 새로운 alarmId 중 readAlarmList에 없는 값만 필터링
      const newAlarmIds = alarms.map((alarm) => alarm.id).filter((alarmId) => !readAlarmList.includes(alarmId)); // 중복 체크

      // 새로운 alarmId가 있을 때만 상태 업데이트
      if (newAlarmIds.length > 0) {
        setReadAlarmList((prevList) => [...prevList, ...newAlarmIds]);
      }
    }
  }, [alarms, readAlarmList]); // alarms나 readAlarmList가 변경될 때 실행

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

  // userGoals가 불러와지면 (isCertIdInitialized가 true가 된 후) 목표 기간 설정
  useEffect(() => {
    if (userGoals && userGoals.length > 0) {
      // userGoals 데이터가 있을 때만 실행
      setGoalPeriodContent(
        formatGoalPeriod(
          new Date(userGoals[userGoals.length - 1].prepareStartDateTime),
          new Date(userGoals[userGoals.length - 1].prepareFinishDateTime), // 종료 날짜도 formatGoalPeriod에 전달해야 합니다.
          userGoals[userGoals.length - 1],
        ),
      );
      setSelectedPrepareTime((prevState) => ({
        ...prevState,
        prepareFinishDateTime: userGoals[userGoals.length - 1].prepareFinishDateTime,
        prepareStartDateTime: userGoals[userGoals.length - 1].prepareStartDateTime,
        goalId: userGoals[userGoals.length - 1].goalId,
      }));
    }
  }, [userGoals, isCertIdInitialized, setSelectedPrepareTime]); // 의존성 배열에 userGoals와 isCertIdInitialized 추가

  const sumTotalTakenTime = () => {
    return averageSubjectList ? averageSubjectList.reduce((sum, subject) => sum + subject.totalTakenTime, 0) : 0;
  };

  useEffect(() => {
    if (goalSettingStatus && !goalSettingStatus.result) {
      setIsGoalSettingStatusModalOpen(true);
    } else if (goalSettingStatus && goalSettingStatus.result) {
      setIsGoalSettingStatusModalOpen(false);
    }
  }, [goalSettingStatus]);

  if (!isCookieSet) {
    return <Spinner />;
  }

  if (userGoals === undefined && isCertIdInitialized) {
    return <HomeSkeleton />;
  }

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
        <div className={'h-[146px]'} />
        {userGoals ? (
          <div className={'mt-4 px-5 flex flex-col gap-y-5'}>
            {goalAchievementData ? (
              <MemoizedGoalBox
                goalMockExams={goalAchievementData.result.goalMockExams}
                currentMockExams={goalAchievementData.result.currentMockExams}
                goalStudyTime={goalAchievementData.result.goalStudyTime}
                currentStudyTime={goalAchievementData.result.currentStudyTime}
                maxScore={goalAchievementData.result.maxScore}
                goalScore={goalAchievementData.result.goalScore}
              />
            ) : (
              <GoalBoxSkeleton />
            )}
            {goalAchievementData ? (
              <MemoizedTodayGoal
                todayMockExams={goalAchievementData.result.todayMockExams}
                mockExamsPerDay={goalAchievementData.result.mockExamsPerDay}
                todayStudyTime={goalAchievementData.result.todayStudyTime}
                studyTimePerDay={goalAchievementData.result.studyTimePerDay}
              />
            ) : (
              <TodayGoalSkeleton />
            )}
            <MemoizedRecentGrowthChart />

            {averageSubjectList ? (
              <MemoizedAverageAccurayChat subjectResults={averageSubjectList} />
            ) : (
              <AverageAccurayChatSkeleton />
            )}
            {averageSubjectList ? (
              <MemoizedAverageTakenTimeGraphReport
                totalTakenTime={sumTotalTakenTime()}
                subjectResults={averageSubjectList}
                timeLimit={averageSubjectList && averageSubjectList.length > 0 ? averageSubjectList[0].timeLimit : 0}
              />
            ) : (
              <AverageTakenTimeGraphReportSkeleton />
            )}
            {bestTipPosts && bestTipPosts?.length > 0 ? <MemoizedBestTip /> : null}
          </div>
        ) : (
          <HomeSkeleton />
        )}
        <div className={'h-[120px]'}></div>
        <StopWatchActiveButton />
        <NavBar />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<Spinner />}>
      <HomeComponents />
    </Suspense>
  );
}
