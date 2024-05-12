'use client';

import { atom } from 'recoil';

import { CertificateInfoType, GoalSettingInfo } from '@/types/global';

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
