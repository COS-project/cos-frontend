'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

const TodayGoalSkeleton = () => {
  return (
    <div className={'p-4 rounded-[32px] bg-white'}>
      <div className={'flex justify-between'}>
        <div className={'pl-2 flex gap-x-[10px] items-center'}>
          <Skeleton width={65} height={27} borderRadius={8} />
          <Skeleton width={79} height={25} borderRadius={8} />
        </div>
        <Skeleton width={89} height={29} borderRadius={999} />
      </div>
      <div className="bg-white border border-gray0 rounded-[24px] mt-[24px]">
        <div className="flex justify-between bg-gray0 rounded-[24px] items-center p-2">
          <div className="flex gap-x-3">
            <Skeleton width={48} height={48} borderRadius={999} />
            <div className="flex flex-col justify-center">
              <Skeleton width={92} height={22} borderRadius={8} />
              <Skeleton width={122} height={21} borderRadius={8} />
            </div>
          </div>
        </div>
        <div className="flex w-[90%] mx-auto mt-[15%] mb-[5%] justify-center ">
          <Skeleton height={31} className={'w-full'} />
        </div>
      </div>
      <div className="bg-white border border-gray0 rounded-[24px] mt-[24px]">
        <div className="flex justify-between bg-gray0 rounded-[24px] items-center p-2">
          <div className="flex gap-x-3">
            <Skeleton width={48} height={48} borderRadius={999} />
            <div className="flex flex-col justify-center">
              <Skeleton width={92} height={24} borderRadius={8} />
              <Skeleton width={122} height={21} borderRadius={8} />
            </div>
          </div>
        </div>
        <div className="flex w-[90%] mx-auto mt-[15%] mb-[5%] justify-center ">
          <Skeleton height={31} className={'w-full'} />
        </div>
      </div>
    </div>
  )
}
export default TodayGoalSkeleton;
