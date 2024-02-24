'use client';

import { atom } from 'recoil';

import { SubjectResultRequests, UserAnswerRequests } from '@/types/global';
import { extend } from 'dayjs';
import SubjectList from '@/components/exam/SubjectList';

export const subjectResultRequestsList = atom<SubjectResultRequests[]>({
  key: 'subjectResultRequestsList',
  default: [],
});

//목표 설정 state
export let subjectResultRequests = atom({
  key: 'subjectResultRequests',
  default: {
    subjectId: 0,
    score: 0,
    userAnswerRequests: [],
  },
});

export let userAnswerRequests = atom<UserAnswerRequests>({
  key: 'userAnswerRequests',
  default: {
    questionId: 1,
    selectOptionSeq: 0,
    takenTime: 0,
    isCorrect: false,
  },
});

//목표 설정 state
export let userAnswerRequestsList = atom<UserAnswerRequests[]>({
  key: 'userAnswerRequestsList',
  default: [],
});

export const questionIndex = atom<number>({
  key: 'questionIndex',
  default: 0,
});

export const stopwatchTime = atom<number>({
  key: 'stopwatchTime',
  default: 0,
});

export const stopwatchIsRunning = atom<boolean>({
  key: 'stopwatchIsRunning',
  default: true,
});
