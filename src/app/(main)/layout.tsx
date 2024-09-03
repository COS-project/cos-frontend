'use client';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>{children}</div>
      <div className={'h-[48px]'} />
    </>
  );
}
