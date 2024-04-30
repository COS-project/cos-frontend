import { atom } from 'recoil';

import { certificateYear, ExamInfo, Session, SubjectInfo } from '@/types/global';

export const selectedSubjectState = atom<SubjectInfo | null>({
  key: 'selectedSubjectState',
  default: null,
});

// 선택된 회차에 대한 상태
export const selectedSessionState = atom<Session | null>({
  key: 'selectedSessionState',
  default: null,
});

export const examInfoState = atom<ExamInfo[] | null>({
  key: 'examInfoState',
  default: null,
});

// 연도 데이터 상태 관리
export const YearState = atom<Number | undefined>({
  key: 'selectedYearState',
  default: undefined,
});

// 회차 데이터 상태 관리
export const selectedRoundState = atom<Number | null>({
  key: 'selectedRoundState',
  default: null,
});

// 현재 연도의 회차 정보 리스트
export const roundsArrayState = atom<number[] | undefined>({
  key: 'roundsArrayState',
  default: undefined,
});

// 자격증의 현재 선택된 연도 상태 관리
export const certificateYearState = atom<certificateYear>({
  key: 'certificateYearState',
  default: { year: 0 },
});
