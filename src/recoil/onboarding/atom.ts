'use client';

import { atom } from 'recoil';

import { InterestCertificate } from '@/types/global';

//목표 설정 state
export let interestCertificatesState = atom<string>({
  key: 'interestCertificatesState',
  default: [],
});
