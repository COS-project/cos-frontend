'use client';

import Header from '@/components/common/Header';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div>{children}</div>
    </div>
  );
}
