'use client';

import { atom } from 'recoil';

import { persistAtom } from '@/recoil/recoilPersistClient';

//시작한 시간
export const startTimeState = atom<number | null>({
  key: 'startTimeState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

//현재 시간
export const nowTimeState = atom<number | null>({
  key: 'nowTimeState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

//누적 시간
export const integralTimeState = atom<number>({
  key: 'integralTimeState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

//시작 일시정지 구분 표지
export const timeBoolState = atom<boolean>({
  key: 'timeBoolState',
  default: true,
});

//시작 버튼 클릭 시 변경
export const isStartState = atom<boolean>({
  key: 'isStartState',
  default: false,
});

//일시중지 버튼 클릭 시 변경
export const isStopState = atom<boolean>({
  key: 'isStopState',
  default: false,
});

//재설정 버튼 클릭 시 변경
export const isResetState = atom<boolean>({
  key: 'isResetState',
  default: false,
});

//스톱워치 돌아가는 파란 원 회전각
export const stringLocationState = atom<String>({
  key: 'stringLocationState',
  default: '',
});

//스톱워치 시간
export const hStopwatchTimeState = atom<number>({
  key: 'hStopwatchTimeState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const mStopwatchTimeState = atom<number>({
  key: 'mStopwatchTimeState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const sStopwatchTimeState = atom<number>({
  key: 'sStopwatchTimeState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

//기록 모달 오픈
export const onModalAtom = atom<boolean>({
  key: 'onModalAtom',
  default: false,
});

export const onAccumulatedModalAtom = atom<boolean>({
  key: 'onAccumulatedModalAtom',
  default: false,
});
