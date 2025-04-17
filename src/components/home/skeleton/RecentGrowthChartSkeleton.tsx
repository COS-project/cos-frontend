'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

const RecentGrowthChartSkeleton = () => {
  return (
    <section className={'flex flex-col gap-y-4 p-4 bg-white rounded-[32px]'}>
      <div className={'flex justify-between'}>
        <Skeleton width={77} height={25} borderRadius={8} />
        <Skeleton width={89} height={29} borderRadius={999} />
      </div>
      <Skeleton className={'w-full'} height={32} borderRadius={999} />
      <div className={'flex flex-col gap-y-1'}>
        <div className={'flex text-h6 gap-x-1 relative'}>
          {/*주차, 월간, 년도 선택 버튼*/}
          <Skeleton width={77} height={25} borderRadius={8} />
        </div>
        <Skeleton width={77} height={25} borderRadius={8} />

        {/* 그래프 */}
        <div className={''}>
          <div className={'relative'}>
            <div className="w-full flex items-end overflow-x-scroll" style={{ width: '100%' }}>
              <div className={'w-full flex flex-col'}>
                <div className="w-full justify-between">
                  <div className="relative flex h-32 mt-5">
                    <div className="absolute bottom-0 left-0 w-full">
                      <Skeleton width={20} height={80} borderRadius={8} />
                    </div>
                    <div className="absolute bottom-0 left-[40px] w-full">
                      <Skeleton width={20} height={120} borderRadius={8} />
                    </div>
                    <div className="absolute bottom-0 left-[80px] w-full">
                      <Skeleton width={20} height={130} borderRadius={8} />
                    </div>
                    <div className="absolute bottom-0 left-[120px] w-full">
                      <Skeleton width={20} height={80} borderRadius={8} />
                    </div>
                    <div className="absolute bottom-0 left-[160px] w-full">
                      <Skeleton width={20} height={90} borderRadius={8} />
                    </div>
                    <div className="absolute bottom-0 left-[200px] w-full">
                      <Skeleton width={20} height={100} borderRadius={8} />
                    </div>
                    <div className="absolute bottom-0 left-[240px] w-full">
                      <Skeleton width={20} height={60} borderRadius={8} />
                    </div>
                    <div className="absolute bottom-0 left-[280px] w-full">
                      <Skeleton width={20} height={70} borderRadius={8} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RecentGrowthChartSkeleton;
