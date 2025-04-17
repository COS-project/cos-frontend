'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

const AverageAccurayChatSkeleton = () => {
  return (
    <div className={'bg-white rounded-[32px] p-4'}>
      <Skeleton width={96} height={27} borderRadius={8} />
      <div className={'flex flex-col justify-center items-center w-full'} style={{ height: '280px' }}>
        <Skeleton width={272} height={240} borderRadius={8} />
      </div>
    </div>
  );
};
export default AverageAccurayChatSkeleton;
