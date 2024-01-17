'use client';

import { usePathname, useRouter } from 'next/navigation';

import ReviewCard from '@/components/community/common/ReviewCard';

export default function CommunityCategoryPage() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-[16px] bg-gray0 p-[2rem]">
      <ReviewCard />
      <button onClick={() => router.replace(`${pathname}/1`)}>게시글 상세로 이동하기</button>
    </div>
  );
}
