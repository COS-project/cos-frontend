'use client';

import { usePathname, useRouter } from 'next/navigation';

import ReviewCard from '@/components/community/common/ReviewCard';

export default function CommunityCategoryPage() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="bg-gray0 px-[2rem]">
      {/*<EditPost />*/}
      {/*<WriteNormalPost />*/}
      {/*<WriteTipPost />*/}
      {/* <WriteExplanationPost /> */}
      {/* <p>{pathname} 페이지</p> */}
      <ReviewCard />
      <button onClick={() => router.replace(`${pathname}/1`)}>게시글 상세로 이동하기</button>
    </div>
  );
}
