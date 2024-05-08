'use client';

import { Certificate } from '@/types/global';
import { format } from 'date-fns';
import { atom } from 'recoil';

//자격증 응시 정보를 확인하는 페이지에서 navbar, header가 보이지 않도록 하는 state
export const layoutState = atom({
  key: 'layoutState',
  default: 'Home',
});

//목표 시작 날짜
export const targetStartDate = atom({
  key: 'targetStartDate',
  default: format(new Date(), 'yyyy.MM.dd'),
});

//목표 종료 날짜
export const targetEndDate = atom({
  key: 'targetEndDate',
  default: format(new Date(), 'yyyy.MM.dd'),
});

//자격증 준비 기간 state
export const preparationPeriod = atom({
  key: 'preparationPeriod',
  default: 0,
});

//데일리 모의고사 요일
export const mockExamDay = atom({
  key: 'mockExamDay',
  default: [],
});

//데일리 공부시간 요일
export const studyTimeDay = atom({
  key: 'studyTimeDay',
  default: [],
});

//설정된 데일리 모의고사 횟수
export const mockExamCount = atom({
  key: 'mockExamCount',
  default: 0,
});

//설정된 데일리 공부시간
export const studyTimeCount = atom({
  key: 'studyTimeCount',
  default: 0,
});

export const certificationsListState = atom<Certificate[]>({
  key: 'certificationsListState',
  default: [],
});
