'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

const CertificationItemSkeleton = () => {
  return [1, 2].map((_, i) => (
    <div key={i} className={'flex gap-x-3 rounded-full w-full p-2 bg-gray0 items-center'}>
      <Skeleton width={48} height={48} borderRadius={999} />
      <Skeleton width={170} height={24} borderRadius={8} />
    </div>
  ));
};
export default CertificationItemSkeleton;
