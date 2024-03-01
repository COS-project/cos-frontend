'use client';

import { usePathname, useRouter } from 'next/navigation';

import ReviewCard from '@/components/community/common/ReviewCard';
import WriteExplanationPost from '@/components/community/WriteExplanationPost';

export default function CommunityCategoryPage() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div>
      <WriteExplanationPost />
      {/*<p>{pathname} 페이지</p>*/}
      {/*<button onClick={() => router.replace(`${pathname}/1`)}>게시글 상세로 이동하기</button>*/}
    </div>
  );
}
