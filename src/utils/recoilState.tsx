import { atom } from 'recoil';

import { Session, SubjectInfo } from '@/types/global';

export const selectedSubjectState = atom<SubjectInfo | null>({
  key: 'selectedSubjectState',
  default: null,
});

// 선택된 회차에 대한 상태
export const selectedSessionState = atom<Session | null>({
  key: 'selectedSessionState',
  default: null,
});
