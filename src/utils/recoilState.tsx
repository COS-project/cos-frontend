import { atom } from 'recoil';

// 선택된 회차에 대한 상태
export const selectedSessionState = atom<Number | null>({
  key: 'selectedSessionState',
  default: null,
});

export const examInfoState = atom<Number | null>({
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
  default: 0,
});

// 현재 연도의 회차 정보 리스트
export const roundsArrayState = atom<number[] | undefined>({
  key: 'roundsArrayState',
  default: undefined,
});
