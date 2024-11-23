'use client';

import { atom } from 'recoil';

import { PostInterestCertificate } from '@/types/global';

//목표 설정 state
export let interestCertificatesState = atom<string>({
  key: 'interestCertificatesState',
  default: {
    interestTargetList: [],
  },
});
