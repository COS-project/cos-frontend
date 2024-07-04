'use client';

import { atom } from 'recoil';

//스톱워치 시간
export let hStopwatchTimeState = atom<number>({
  key: 'hStopwatchTimeState',
  default: 0,
});

export let mStopwatchTimeState = atom<string>({
  key: 'mStopwatchTimeState',
  default: '',
});

export let sStopwatchTimeState = atom<string>({
  key: 'sStopwatchTimeState',
  default: '',
});