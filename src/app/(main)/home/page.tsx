'use client';

import { EventSourcePolyfill } from 'event-source-polyfill';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { SVGProps, useEffect } from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

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

export default function Home() {
  const certificateId = useRecoilValue(certificateIdAtom);
  const [alarmEvent, setAlarmEvent] = useState(undefined);
  const EventSource = EventSourcePolyfill;
  const parameter = useSearchParams();
  const accessToken = parameter.get('accessToken');
  const refreshToken = parameter.get('refreshToken');
  const [isGoalPeriodFilterOpen, setIsGoalPeriodFilterOpen] = useState(false);
  const [goalPeriodContent, setGoalPeriodContent] = useState<string>('목표 기간 선택');
  let totalTakenTime = 0;
  const [isGoalSettingStatusModalOpen, setIsGoalSettingStatusModalOpen] = useState(false);
  const { certificationInfo } = useGetCertificationInfo();
  const { userGoals } = useGetUserGoals(certificateId);
  const { goalAchievementData } = useGoalAchievement(certificateId);
  const { averageSubjectList } = useAverageSubjectInfo(certificateId);
  const { goalSettingStatus } = useGoalSettingStatus(certificateId);

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    console.log('액세스 토큰', localStorage.getItem('accessToken'));
    console.log('리프레시 토큰', localStorage.getItem('refreshToken'));
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      const eventSource = new EventSource('http://cercat.o-r.kr/api/v2/alarms/subscribe', {
        headers: {
          'Access-Token': localStorage.getItem('accessToken'),
        },
      });
      eventSource.addEventListener('connect', (event: any) => {
        const { data: receivedConnectData } = event;
        if (receivedConnectData === 'SSE 연결이 완료되었습니다.') {
          console.log('SSE CONNECTED');
        } else {
          console.log(event);
        }
      });
      return () => {
        eventSource.close();
      };
    }
  }, [accessToken]);

  const sumTotalTakenTime = () => {
    if (averageSubjectList) {
      averageSubjectList.map((subjectResult) => {
        totalTakenTime += subjectResult.totalTakenTime;
      });
      return totalTakenTime;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    console.log('goalAchievementData', goalAchievementData);
  }, [goalAchievementData]);

  useEffect(() => {
    if (goalSettingStatus) {
      setIsGoalSettingStatusModalOpen(!goalSettingStatus.result);
    }
  }, [goalSettingStatus]);

  return (
    <main>
      {isGoalSettingStatusModalOpen ? (
        <GoalSettingStatusModal
          isGoalSettingStatusModalOpen={isGoalSettingStatusModalOpen}
          setIsGoalSettingStatusModalOpen={setIsGoalSettingStatusModalOpen}
        />
      ) : null}
      <div className="bg-gray0 h-screen overflow-y-auto">
        <Header />
        <Header headerType={'second'}></Header>
        <div className={'mt-4 px-5 flex flex-col gap-y-5'}>
          {!isGoalSettingStatusModalOpen ? (
            <div>
              <button
                onClick={() => {
                  setIsGoalPeriodFilterOpen(!isGoalPeriodFilterOpen);
                }}
                className={'flex py-[6px] px-3 rounded-full bg-white w-fit items-center'}>
                {goalPeriodContent}
                {isGoalPeriodFilterOpen ? <DropDownIcon /> : <DropUpIcon />}
              </button>
              {isGoalPeriodFilterOpen ? (
                <UserCertGoalPeriods
                  setIsOpen={setIsGoalPeriodFilterOpen}
                  data={userGoals}
                  setDataState={setGoalPeriodContent}
                  className={'absolute top-10 h-fit'}
                />
              ) : null}
            </div>
          ) : null}
          <GoalBox />
          <TodayGoal />
          <RecentGrowthChart />
          <AverageAccurayChat subjectResults={averageSubjectList || []} />
          <AverageTakenTimeGraphReport
            totalTakenTime={sumTotalTakenTime}
            subjectResults={averageSubjectList}
            timeLimit={certificationInfo?.result.examInfo.examTimeLimit.practicalExamTimeLimit}
          />
          <BestTip />
        </div>
        <div className={'h-[80px]'}></div>
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
