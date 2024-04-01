'use client';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div>
        {children}
        {/*<Link href="/">온보딩 화면으로 아동하기</Link>*/}
      </div>
      <NavBar />
    </>
  );
}
