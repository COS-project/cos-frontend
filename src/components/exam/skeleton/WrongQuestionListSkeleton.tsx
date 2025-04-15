'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

const WrongQuestionListSkeleton = () => {
  return [1, 2, 3, 4].map((_, i) => (
    <div key={i} className={'flex flex-col gap-y-2 bg-white rounded-[32px] p-5 pb-[56px]'}>
      <Skeleton width={137} height={25} borderRadius={8} />
      <Skeleton className={'w-full'} height={80} borderRadius={8} />
    </div>
  ));
};
export default WrongQuestionListSkeleton;
