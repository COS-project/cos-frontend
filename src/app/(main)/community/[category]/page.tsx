'use client';

import { usePathname, useRouter } from 'next/navigation';

import ReviewCard from '@/components/community/review/ReviewCard';

export default function CommunityCategoryPage() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <main className="bg-gray0 px-[2rem] pb-[8rem]">
      <ReviewCard />
      <button onClick={() => router.replace(`${pathname}/1`)}>게시글 상세로 이동하기</button>
    </main>
  );
}
