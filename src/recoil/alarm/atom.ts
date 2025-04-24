//게시판 종류
import { atom } from 'recoil';

import { Alarm } from '@/types/alarm/type';

export const alarmAtom = atom<Alarm[]>({
  key: 'alarmAtom',
  default: [],
});

export const readAlarmListAtom = atom<number[]>({
  key: 'readAlarmListAtom',
  default: [],
});

export const unreadAlarmCountAtom = atom<number>({
  key: 'unreadAlarmCountAtom',
  default: 0,
});
