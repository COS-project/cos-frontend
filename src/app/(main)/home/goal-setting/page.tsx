'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useSWRConfig } from 'swr';

import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import PreparationPeriodSetting from '@/components/home/goal-setting/PreparationPeriodSetting';
import SelectCertification from '@/components/home/goal-setting/SelectCertification';
import SetDailyGoals from '@/components/home/goal-setting/SetDailyGoals';
import SetGoalScore from '@/components/home/goal-setting/SetGoalScore';
import SettingNewGoalModal from '@/components/home/goal-setting/SettingNewGoalModal';
import { postGoalSettingData, putGoalSettingData } from '@/lib/api/home';
import useGetGoalSettingData from '@/lib/hooks/useGetGoalSettingData';
import useGetMockExams from '@/lib/hooks/useGetMockExams';
import useGetUserGoals from '@/lib/hooks/useGetUserGoals';
import { certificateIdAtom } from '@/recoil/atom';
import { goalSettingCertificateId, goalSettingState } from '@/recoil/home/atom';

const GoalSetting = () => {
  const certificateId = useRecoilValue(certificateIdAtom);
  const { mockExams } = useGetMockExams(certificateId, 2024);
  // 선택된 자격증 Id
  const [selectedCertificationId, setSelectedCertificationId] = useRecoilState<number | undefined>(
    goalSettingCertificateId,
  );
  const [isSettingNewGoalModalOpen, setIsSettingNewGoalModalOpen] = useState(true);
  // 사용자의 목표 설정 Id를 불러오는 데이터 패칭
  const { userGoals } = useGetUserGoals(certificateId);
  const { mutate } = useSWRConfig();
  const router = useRouter();

  /**
   * 최근 목표ID를 불러오는 함수
   */
  const getLastGoalId = () => {
    if (userGoals && userGoals.length > 0) {
      return userGoals[userGoals.length - 1].goalId;
    }
    return null; // 또는 적절한 기본값/오류 처리
  };
  // 기존에 설정한 목표를 불러오는 데이터 패칭
  const { goalSettingData } = useGetGoalSettingData(getLastGoalId() || 0);
  const [goalData, setGoalData] = useRecoilState(goalSettingState);
  const [isResetButtonClick, setIsResetButtonClick] = useState(false);
  const [isTrigger, setIsTrigger] = useState(true);
  const [isGoalDataReady, setIsGoalDataReady] = useState(false);

  /**
   * Recoil 상태를 초기화하는 함수
   * @param apiResponse goalSettingData.result
   */
  const initializeGoalSettingState = (apiResponse: any) => {
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
   * 목표를 새로 생성할 때, state를 변경하는 함수
   */
  const resetGoalSettingState = () => {
    if (mockExams && mockExams.length > 0) {
      return {
        goalScore: mockExams[0].maxScore as number,
        prepareStartDateTime: new Date().toISOString(),
        prepareFinishDateTime: new Date().toISOString(),
        goalPrepareDays: 0,
        mockExamsPerDay: 0,
        goalMockExams: 0,
        mockExamRepeatDays: [],
        studyTimePerDay: 0,
        goalStudyTime: 0,
        studyRepeatDays: [],
      };
    } else {
      return {
        goalScore: 100,
        prepareStartDateTime: new Date().toISOString(),
        prepareFinishDateTime: new Date().toISOString(),
        goalPrepareDays: 0,
        mockExamsPerDay: 0,
        goalMockExams: 0,
        mockExamRepeatDays: [],
        studyTimePerDay: 0,
        goalStudyTime: 0,
        studyRepeatDays: [],
      };
    }
  };

  /**
   * API 에서 데이터를 가져와 Recoil 상태 업데이트 해주는 함수
   */
  const fetchDataAndUpdateState = async () => {
    try {
      const response = goalSettingData;
      if (response) {
        const initialState = initializeGoalSettingState(response.result);
        setGoalData(initialState);
        setIsGoalDataReady(true); // 🔥 렌더링 트리거
        setIsTrigger(false);
      } else {
        console.error('목표 데이터를 불러오지 못했습니다.');
        setIsTrigger(false);
      }
    } catch (error) {
      console.error('목표 데이터 로딩 실패:', error);
      setIsTrigger(false);
    }
  };

  /**
   * 목표를 새로 설정할 때의 함수
   */
  const resetData = () => {
    const resetState = resetGoalSettingState();
    setGoalData(resetState);
    setIsGoalDataReady(true); // 🔥 이게 있어야 새 목표도 바로 렌더됨
  };

  useEffect(() => {
    if (userGoals && userGoals.length === 0) {
      resetData();
      setIsResetButtonClick(true);
    }
  }, [userGoals]);

  return (
    <>
      {userGoals && userGoals.length !== 0 && isSettingNewGoalModalOpen ? (
        <SettingNewGoalModal
          isFirstGoalSetting={userGoals.length === 0} //새로 생성된 목표가 없을 경우
          fetchDataAndUpdateState={fetchDataAndUpdateState}
          setIsResetButtonClick={setIsResetButtonClick}
          resetData={resetData}
          isSettingNewGoalModal={isSettingNewGoalModalOpen}
          setIsSettingNewModal={setIsSettingNewGoalModalOpen}
        />
      ) : null}
      {!isGoalDataReady ? (
        <></>
      ) : (
        <div className={''}>
          <Header
            className={'fixed'}
            headerType={'dynamic'}
            title={'목표설정'}
            rightElement={
              isResetButtonClick ? (
                <Button
                  onClick={async () => {
                    await postGoalSettingData(goalData, selectedCertificationId).then((r) => {
                      console.log('목표 저장 성공~r', r);
                    });
                    await mutate(`/certificates/${certificateId}/goals`);
                    setIsResetButtonClick(false);
                    router.push('/home');
                  }}
                  className={' w-fit'}>
                  저장
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    putGoalSettingData(goalData, getLastGoalId() || 0).then((r) => {
                      console.log('목표 수정 성공', r, goalData);
                      router.push('/home');
                    });
                  }}
                  className={'w-fit'}>
                  수정
                </Button>
              )
            }></Header>
          <div className="flex flex-col gap-y-8 pt-20 mx-5 mb-8">
            {/*자격증 선택*/}
            {isResetButtonClick ? <SelectCertification /> : null}
            {/*목표 점수 설정*/}
            <SetGoalScore />
            {/*자격증 준비기간 설정*/}
            <PreparationPeriodSetting />
            {/*매일 목표 설정*/}
            <SetDailyGoals />
          </div>
        </div>
      )}
    </>
  );
};
export default GoalSetting;
