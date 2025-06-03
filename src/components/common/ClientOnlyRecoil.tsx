'use client';

import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

import Timer from '@/hooks/Timer';

export default function ClientOnlyRecoil({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // 클라이언트에서만 렌더링

  return (
    <RecoilRoot>
      {children}
      <Timer />
    </RecoilRoot>
  );
}
