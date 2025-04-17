'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

const BestTipSkeleton = () => {
  return (
    <div>
      <div className="rounded-3xl bg-white p-4">
        <div className="">
          <div className="flex justify-between my-[1%]">
            <Skeleton width={77} height={25} borderRadius={8} />
            <Skeleton width={89} height={29} borderRadius={999} />
          </div>
          <div className="mt-3 flex flex-col items-center justify-center w-full">
            <Skeleton width={260} height={300} borderRadius={16} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default BestTipSkeleton;
