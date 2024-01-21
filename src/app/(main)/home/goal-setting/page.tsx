'use client';

import * as React from 'react';
import { useRecoilValue } from 'recoil';

import Button from '@/components/common/Button';
import PreparationPeriodSetting from '@/components/home/goal-setting/PreparationPeriodSetting';
import SelectCertification from '@/components/home/goal-setting/SelectCertification';
import SetDailyGoals from '@/components/home/goal-setting/SetDailyGoals';
import SetGoalScore from '@/components/home/goal-setting/SetGoalScore';
import { postGoalSettingData } from '@/lib/api/home';
import { goalSettingState } from '@/recoil/home/atom';

const GoalSetting = () => {
  const goalSettingData = useRecoilValue(goalSettingState);

  return (
    <div className="flex flex-col gap-y-8 mx-5">
      <Button onClick={() => {postGoalSettingData(goalSettingData);}} className={'absolute right-0 w-fit'}>저장</Button>
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
