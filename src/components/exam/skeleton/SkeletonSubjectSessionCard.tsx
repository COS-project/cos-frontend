'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

const SkeletonSubjectSessionCard = () => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
      {[1, 2, 3, 4].map((_, i) => (
        <div
          key={i}
          className="mt-[16px] flex flex-col items-center gap-y-4 p-3 border-[1px] border-gray2 rounded-[32px] w-full">
          <div className="font-semibold text-center pb-2 border-b border-gray1">
            <Skeleton height={20} width={135} borderRadius={8} />
          </div>
          <div className={'flex flex-col items-center'}>
            <Skeleton height={16} width={42} borderRadius={8} />
            <Skeleton height={22} width={70} borderRadius={8} />
          </div>
          <Skeleton height={40} width={152} borderRadius={999} />
        </div>
      ))}
    </div>
  );
};
export default SkeletonSubjectSessionCard;
