import { atom } from 'recoil';

import { ExamInfo, Round, Session, SubjectInfo } from '@/types/global';

export const selectedSubjectState = atom<SubjectInfo | null>({
  key: 'selectedSubjectState',
  default: null,
});

// 선택된 회차에 대한 상태
export const selectedSessionState = atom<Session | null>({
  key: 'selectedSessionState',
  default: null,
});

// 유저의 응시 횟수에 대한 상태
export const selectedRoundState = atom<Round | null>({
  key: 'selectedRoundState',
  default: null,
});

export const ExaminfoState = atom<ExamInfo[]>({
  key: 'examInfoState',
  default: [],
});
