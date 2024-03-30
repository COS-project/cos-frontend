'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function CommunityCategoryPage() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div>
      {/*<EditPost />*/}
      {/*<WriteNormalPost />*/}
      {/*<WriteTipPost />*/}
      {/*<WriteExplanationPost />*/}
      {/*<p>{pathname} 페이지</p>*/}
      <button onClick={() => router.replace(`${pathname}/1`)}>게시글 상세로 이동하기</button>
    </div>
  );
}
