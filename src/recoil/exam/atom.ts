'use client';

import { atom } from 'recoil';

import { UserAnswerRequests } from '@/types/global';


//목표 설정 state
export let subjectResultRequestsList = atom<UserAnswerRequests[]>({
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
    selectOption: 0,
    takenTime: 0,
    is_correct: false,
  },
});

export const questionIndex = atom<number>({
  key: 'questionIndex',
  default: 0,
});
