'use client';

import * as React from 'react';

import PreparationPeriodSetting from '@/components/home/goal-setting/PreparationPeriodSetting';
import SelectCertification from '@/components/home/goal-setting/SelectCertification';
import SetDailyGoals from '@/components/home/goal-setting/SetDailyGoals';
import SetGoalScore from '@/components/home/goal-setting/SetGoalScore';

const GoalSetting = () => {
  return (
    <div className="flex flex-col gap-y-8 mx-5">
      {/*자격증 선택*/}
      <SelectCertification />
      {/*목표 점수 설정*/}
      <SetGoalScore />
      {/*자격증 준비기간 설정*/}
      <PreparationPeriodSetting />
      {/*매일 목표 설정*/}
      <SetDailyGoals />
    </div>
  );
};
export default GoalSetting;

