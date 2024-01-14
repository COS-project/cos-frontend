'use client';

import { atom } from 'recoil';

//자격증 응시 정보를 확인하는 페이지에서 navbar, header가 보이지 않도록 하는 state
export const layoutState = atom({
  key: 'layoutState',
  default: 'Home',
});
