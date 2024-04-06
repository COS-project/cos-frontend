'use client';

import Banner from '@/components/common/Banner';
import ReviewCard from '@/components/community/review/ReviewCard';

export default function CommunityCategoryPage() {
  return (
    <main className="bg-gray0 px-[2rem] pt-[2rem] pb-[8rem]">
      <Banner title="크루들에게 따끈후기를 공유해주세요!" buttonText="따끈 후기 작성" href={''} />
      <ReviewCard />
    </main>
  );
}
