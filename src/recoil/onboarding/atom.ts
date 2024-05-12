'use client';

import { atom } from 'recoil';

import { InterestCertificate } from '@/types/global';

//목표 설정 state
export let interestCertificatesState = atom<InterestCertificate[]>({
  key: 'interestCertificatesState',
  default: [],
});
