'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

const AverageTakenTimeGraphReportSkeleton = () => {
  return (
    <section className={'flex flex-col gap-y-4 p-4 bg-white rounded-[32px]'}>
      <div className={'flex justify-between'}>
        <Skeleton width={77} height={25} borderRadius={8} />
      </div>
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
                    <div className="absolute bottom-0 left-[50px]">
                      <Skeleton width={30} height={90} borderRadius={8} />
                    </div>
                    <div className="absolute bottom-0 left-[150px]">
                      <Skeleton width={30} height={100} borderRadius={8} />
                    </div>
                    <div className="absolute bottom-0 left-[250px]">
                      <Skeleton width={30} height={60} borderRadius={8} />
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
export default AverageTakenTimeGraphReportSkeleton;
