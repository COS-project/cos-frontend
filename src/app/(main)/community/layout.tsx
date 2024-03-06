'use client';

import { useRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import { layoutState } from '@/recoil/atom';
import CommunityNav from '@/components/community/CommunityNav';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/*<Header />*/}
      {children}
      {/*<NavBar />*/}
    </div>
  );
}
