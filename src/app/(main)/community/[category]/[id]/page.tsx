'use client';

import { usePathname } from 'next/navigation';

export default function CommunityDetailPage() {
  const pathname = usePathname();

  return <div>{pathname}번 페이지</div>;
}
