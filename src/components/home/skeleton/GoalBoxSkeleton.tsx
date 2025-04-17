'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

const GoalBoxSkeleton = () => {
  return (
    <section className={'flex flex-col gap-y-4 p-4 bg-white rounded-[32px]'}>
      <div className={'pl-2 flex justify-between items-center'}>
        <Skeleton width={65} height={27} borderRadius={8} />
        <Skeleton width={89} height={29} borderRadius={999} />
      </div>

      <div className={'flex justify-between'}>
        <div className="flex flex-col items-center w-[33%]">
          <div className="flex justify-center items-center">
            <Skeleton width={90} height={21} borderRadius={8} />
          </div>
          <div className="relative mt-[10px]">
            <Skeleton width={90} height={90} borderRadius={999} />
          </div>
        </div>
        <div className="flex flex-col items-center w-[33%]">
          <div className="flex justify-center items-center">
            <Skeleton width={90} height={21} borderRadius={8} />
          </div>
          <div className="relative mt-[10px]">
            <Skeleton width={90} height={90} borderRadius={999} />
          </div>
        </div>
        <div className="flex flex-col items-center w-[33%]">
          <div className="flex justify-center items-center">
            <Skeleton width={90} height={21} borderRadius={8} />
          </div>
          <div className="relative mt-[10px]">
            <Skeleton width={90} height={90} borderRadius={999} />
          </div>
        </div>
      </div>
    </section>
  )
}
export default GoalBoxSkeleton
