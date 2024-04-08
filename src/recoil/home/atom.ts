'use client';

import { atom } from 'recoil';

import { CertificateInfoType, GoalSettingInfo } from '@/types/global';
import { UserCertGoalPeriodType, WeeklyGoalPeriodType } from '@/types/home/type';

//자격증 응시 정보 state
export const certificationInfoState = atom<CertificateInfoType>({
  key: 'certificationInfoState',
  default: {
    description: '',
    examSchedule: {
      applicationStartDateTime: '2024-01-23T07:40:42.986Z',
      applicationDeadlineDateTime: '2024-01-23T07:40:42.986Z',
      examDateTime: '2024-01-23T07:40:42.986Z',
    },
    subjectsInfo: '',
    examFormat: '',
    examFee: {
      writtenExamFee: '',
      practicalExamFee: '',
    },
    examTimeLimit: {
      writtenExamTimeLimit: '',
      practicalExamTimeLimit: '',
    },
    passingCriteria: {
      subjectPassingCriteria: '',
      totalAvgCriteria: '',
      practicalPassingCriteria: '',
    },
    examEligibility: '',
  },
});

//목표 설정 state
export let goalSettingState = atom<GoalSettingInfo>({
  key: 'goalSettingState',
  default: {
    goalScore: 100,
    prepareStartDateTime: '2024-01-21T06:45:07.833Z',
    prepareFinishDateTime: '2024-01-21T06:45:07.833Z',
    goalPrepareDays: 0,
    mockExamsPerDay: 0,
    goalMockExams: 0,
    mockExamRepeatDays: [],
    studyTimePerDay: 0,
    goalStudyTime: 0,
    studyRepeatDays: [],
  },
});

// 성장그래프 자세히 보기(그래프)
export const selectedReportTypeState = atom<'WEEK' | 'MONTH' | 'YEAR'>({
  key: 'selectedReportTypeState',
  default: 'WEEK',
});

// 성장그래프 자세히 보기(각각 디테일)
export const selectedDateTypeState = atom<'DATE' | 'WEEK_OF_MONTH' | 'MONTH'>({
  key: 'selectedDateTypeState',
  default: 'DATE',
});
export const selectedPrepareTimeState = atom<UserCertGoalPeriodType>({
  key: 'selectedPrepareTime',
  default: {
    goalId: 0,
    prepareStartDateTime: '',
    prepareFinishDateTime: '',
  },
});

export const selectedPrepareWeeksBetweenState = atom<WeeklyGoalPeriodType>({
  key: 'selectedPrepareWeeksBetweenState',
  default: {
    prepareYear: '',
    prepareMonth: 0,
    prepareWeekly: 0,
    prepareDate: '',
    formattedWeeklyPrepTime: '',
  },
});
//목표 설정 자격증 name 선택
export const goalSettingCertificateName = atom<string>({
  key: 'goalSettingCertificateName',
  default: '정보처리기사',
});

//목표 설정 자격증 id 선택
export const goalSettingCertificateId = atom<number>({
  key: 'goalSettingCertificateId',
  default: 1,
});
