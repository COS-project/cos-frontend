'use client';

import * as React from 'react';

import SelectCertification from '@/components/home/goal-setting/SelectCertification';
import SetGoalScore from '@/components/home/goal-setting/SetGoalScore';
import SetDailyGoals from '@/components/home/goal-setting/SetDailyGoals';
import PreparationPeriodSetting from '@/components/home/goal-setting/PreparationPeriodSetting';
import Calendar from '@/components/home/goal-setting/Calendar';
import PushAlarm from '@/components/home/goal-setting/PushAlarm';

const GoalSetting = () => {
  return (
    <div className="flex flex-col gap-y-8 mx-5">
      {/*자격증 선택*/}
      <SelectCertification />
      <SetGoalScore />
      <PreparationPeriodSetting />
      <SetDailyGoals />
    </div>
  );
};
export default GoalSetting;

