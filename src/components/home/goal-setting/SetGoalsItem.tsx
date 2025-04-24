'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import useGetMockExams from '@/lib/hooks/useGetMockExams';
import { certificateIdAtom } from '@/recoil/atom';
import { goalSettingState } from '@/recoil/home/atom';

interface Props {
  usage: 'goalScore' | 'goalStudyTime' | 'goalMockExam'; // 사용된 컴포넌트를 나타냄 ex) 목표 점수 설정, 공부량 설정, 공부 시간 설정
  ContentIcon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  //내용
  goalString: string;
  unitString: string;
  actionString: string;
}

/**
 * 목표 설정을 할 수 있는 컴포넌트 입니다.
 * '자격증 선택', '매일 목표 설정 - 모의고사, 시간' 컴포넌트에 사용됩니다.
 */
const SetGoalsItem = (props: Props) => {
  const { usage, ContentIcon, goalString, unitString, actionString } = props;
  const certificateId = useRecoilValue(certificateIdAtom);
  const { mockExams } = useGetMockExams(certificateId, 2024);

  let [goalData, setGoalData] = useRecoilState(goalSettingState);

  //점수 설정 버튼 제어
  const [goalScoreDownDisabled, setGoalScoreDownDisabled] = useState<boolean>(false);
  const [goalScoreUpDisabled, setGoalScoreUpDisabled] = useState<boolean>(false);
  //모의고사 횟수 설정 버튼 제어
  const [mockExamsPerDayDownDisabled, setMockExamsPerDayDownDisabled] = useState<boolean>(false);
  //공부 시간 설정 버튼 제어
  const [studyTimePerDayDownDisabled, setStudyTimePerDayDownDisabled] = useState<boolean>(false);

  /**
   * 점수가 최대 점수 이상 증가하는 것을 방지하도록
   * button 을 제어하는 함수
   */
  const UpButtonHandler = () => {
    if (mockExams && mockExams.length > 0) {
      if (goalData.goalScore >= mockExams[0].maxScore || goalData.goalScore + 10 > mockExams[0].maxScore) {
        setGoalScoreUpDisabled(true);
      } else {
        setGoalScoreUpDisabled(false);
      }
    }
  };

  /**
   * 점수가 0점 이하를 방지하도록
   * button 을 제어하는 함수
   */
  const downButtonHandler = () => {
    if (goalData.goalScore <= 0 || goalData.goalScore - 10 < 0) {
      setGoalScoreDownDisabled(true);
    } else {
      setGoalScoreDownDisabled(false);
    }

    if (goalData.mockExamsPerDay <= 0) {
      setMockExamsPerDayDownDisabled(true);
    } else {
      setMockExamsPerDayDownDisabled(false);
    }

    if (goalData.studyTimePerDay <= 0) {
      setStudyTimePerDayDownDisabled(true);
    } else {
      setStudyTimePerDayDownDisabled(false);
    }
  };

  useEffect(() => {
    // 목표 점수 설정일 때만 upButtonHandler 사용
    if (usage == 'goalScore') {
      UpButtonHandler();
      downButtonHandler();
    } else {
      downButtonHandler();
    }
  }, [goalData.goalScore, goalData.mockExamsPerDay, goalData.studyTimePerDay]);

  const disableButtonHandler = (usage: 'goalStudyTime' | 'goalScore' | 'goalMockExam') => {
    switch (usage) {
      case 'goalStudyTime':
        return !studyTimePerDayDownDisabled;
      case 'goalScore':
        return !goalScoreDownDisabled;
      default:
        return !mockExamsPerDayDownDisabled;
    }
  };

  return (
    <>
      <div className="goal-setting-content">
        <div className="flex gap-x-2 items-center">
          <ContentIcon />
          <div className="text-h6">{goalString}</div>
          <div className="text-h4 font-semibold">
            {usage == 'goalScore' ? (
              <input
                type={'number'}
                value={goalData.goalScore}
                className={'bg-gray0 w-[40px]'}
                onChange={(e) => {
                  setGoalData((prevGoalSettingData) => ({
                    ...prevGoalSettingData,
                    goalScore: parseInt(e.target.value),
                  }));
                }}
              />
            ) : null}
            {usage == 'goalStudyTime' ? goalData.studyTimePerDay : null}
            {usage == 'goalMockExam' ? goalData.mockExamsPerDay : null}
            {unitString}
          </div>

          {/*count 를 증가 감소하는 button*/}
          <div className="flex flex-col gap-y-2">
            {/*증가 버튼*/}
            {!goalScoreUpDisabled && (
              <button
                disabled={goalScoreUpDisabled}
                onClick={() => {
                  usage == 'goalStudyTime'
                    ? setGoalData((prevGoalSettingData) => ({
                        ...prevGoalSettingData,
                        studyTimePerDay: prevGoalSettingData.studyTimePerDay + 10,
                      }))
                    : usage == 'goalScore'
                    ? setGoalData((prevGoalSettingData) => ({
                        ...prevGoalSettingData,
                        goalScore: prevGoalSettingData.goalScore + 10,
                      }))
                    : setGoalData((prevGoalSettingData) => ({
                        ...prevGoalSettingData,
                        mockExamsPerDay: prevGoalSettingData.mockExamsPerDay + 1,
                      }));
                }}>
                <UpIcon />
              </button>
            )}
            {/*감소 버튼*/}
            {disableButtonHandler(usage) && (
              <button
                disabled={
                  usage == 'goalStudyTime'
                    ? studyTimePerDayDownDisabled
                    : usage == 'goalScore'
                    ? goalScoreDownDisabled
                    : mockExamsPerDayDownDisabled
                }
                onClick={() => {
                  usage == 'goalStudyTime'
                    ? setGoalData((prevGoalSettingData) => ({
                        ...prevGoalSettingData,
                        studyTimePerDay: prevGoalSettingData.studyTimePerDay - 10,
                      }))
                    : usage == 'goalScore'
                    ? setGoalData((prevGoalSettingData) => ({
                        ...prevGoalSettingData,
                        goalScore: prevGoalSettingData.goalScore - 10,
                      }))
                    : setGoalData((prevGoalSettingData) => ({
                        ...prevGoalSettingData,
                        mockExamsPerDay: prevGoalSettingData.mockExamsPerDay - 1,
                      }));
                }}>
                <DownIcon />
              </button>
            )}
          </div>
          <div>{actionString}</div>
        </div>
        {usage === 'goalScore' && goalScoreUpDisabled ? (
          <p className={'pl-8 mt-1 text-point font-pre text-h6'}>
            총점은 {mockExams && mockExams[0].maxScore}점 입니다.
          </p>
        ) : usage === 'goalScore' && !goalScoreUpDisabled ? (
          <p className={'pl-8 mt-1 text-gray4 font-pre text-h6'}>숫자를 클릭하여 목표 점수를 입력해보세요.</p>
        ) : null}
      </div>
    </>
  );
};
export default SetGoalsItem;

function DownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={8} height={5} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.5 1L4 4 .5 1" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}

function UpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={8} height={5} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M.5 4L4 1l3.5 3" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}
