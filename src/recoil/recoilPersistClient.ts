'use client';

import { recoilPersist } from 'recoil-persist';

let localStorageSafe: Storage | undefined = undefined;

if (typeof window !== 'undefined') {
  try {
    localStorageSafe = localStorage;
  } catch (e) {
    console.warn('localStorage 접근 실패:', e);
  }
}

export const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: localStorageSafe,
});
