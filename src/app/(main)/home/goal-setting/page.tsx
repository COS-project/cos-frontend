'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import Button from '@/components/common/Button';
import PreparationPeriodSetting from '@/components/home/goal-setting/PreparationPeriodSetting';
import SelectCertification from '@/components/home/goal-setting/SelectCertification';
import SetDailyGoals from '@/components/home/goal-setting/SetDailyGoals';
import SetGoalScore from '@/components/home/goal-setting/SetGoalScore';
import { postGoalSettingData, putGoalSettingData } from '@/lib/api/home';
import useGetGoalSettingData from '@/lib/hooks/useGetGoalSettingData';
import { goalSettingState } from '@/recoil/home/atom';
import { GoalSettingInfo } from '@/types/global';

const GoalSetting = () => {
  // 데이터 패칭
  const { goalSettingData, isLoading, isError } = useGetGoalSettingData();

  const [goalData, setGoalData] = useRecoilState(goalSettingState);

  /**
   * Recoil 상태를 초기화하는 함수
   * @param apiResponse goalSettingData.result
   */
  const initializeGoalSettingState = (apiResponse: GoalSettingInfo) => {
    return {
      goalScore: apiResponse.goalScore,
      prepareStartDateTime: apiResponse.prepareStartDateTime,
      prepareFinishDateTime: apiResponse.prepareFinishDateTime,
      goalPrepareDays: apiResponse.goalPrepareDays,
      mockExamsPerDay: apiResponse.mockExamsPerDay,
      goalMockExams: apiResponse.goalMockExams,
      mockExamRepeatDays: apiResponse.mockExamRepeatDays,
      studyTimePerDay: apiResponse.studyTimePerDay,
      goalStudyTime: apiResponse.goalStudyTime,
      studyRepeatDays: apiResponse.studyRepeatDays,
    };
  };

  /**
   * API 에서 데이터를 가져와 Recoil 상태 업데이트 해주는 함수
   */
  const fetchDataAndUpdateState = async () => {
    try {
      const response = goalSettingData;
      if (response) {
        const initialState: GoalSettingInfo = initializeGoalSettingState(response.result);
        setGoalData(initialState);
      } else {
        // 에러 처리를 수행할 수 있습니다.
        console.error('Failed to fetch goal setting data');
      }
    } catch (error) {
      // 네트워크 오류 또는 다른 예외에 대한 처리를 수행할 수 있습니다.
      console.error('Error fetching goal setting data:', error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchDataAndUpdateState();
  }, [goalSettingData]);

  return (
    <div className="flex flex-col gap-y-8 mx-5">
      {goalSettingData ? (
        //수정버튼
        <Button
          onClick={() => {
            putGoalSettingData(goalData);
          }}
          className={'absolute right-0 w-fit'}>
          저장
        </Button>
      ) : (
        //처음 생성 버튼
        <Button
          onClick={() => {
            postGoalSettingData(goalData);
          }}
          className={'absolute right-0 w-fit'}>
          저장
        </Button>
      )}
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
