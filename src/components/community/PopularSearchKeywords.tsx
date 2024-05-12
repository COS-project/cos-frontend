import * as React from 'react';
import { useEffect } from 'react';

import { PopularSearchKeyword } from '@/types/community/type';

interface Props {
  keywords: PopularSearchKeyword[];
  lastFetchedTime: string;
}

const PopularSearchKeywords = (props: Props) => {
  const { keywords, lastFetchedTime } = props;

  useEffect(() => {
    console.log(lastFetchedTime);
  }, [lastFetchedTime]);
  return (
    <>
      <div className={'flex flex-col gap-y-3'}>
        <div className={'text-h4 font-semibold ml-2'}>인기 검색어</div>
        <div className={' flex flex-col gap-y-5 bg-white p-5 rounded-[32px] '}>
          <div className={'grid grid-cols-2 gap-x-6 w-full gap-y-4'}>
            {keywords?.map((keyword: PopularSearchKeyword, index: number) => {
              return (
                <div key={index} className={'flex justify-between text-h6'}>
                  <div className={'flex'}>
                    <div className={'w-[16px] font-bold mr-[6px]'}>{keyword.sequence}</div>
                    <div>{keyword.keyword}</div>
                  </div>
                  {keyword.icon}
                </div>
              );
            })}
          </div>
          <div className={'flex justify-end text-[12px] text-gray2'}>업데이트 {lastFetchedTime}</div>
        </div>
      </div>
    </>
  );
};
export default PopularSearchKeywords;
