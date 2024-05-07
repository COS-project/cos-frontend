import React from 'react';

import { FilterType } from '@/types/mypage/type';

interface Props {
  data: FilterType[];
  setSelectedFilterContent: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenFilter: boolean;
}

const MyPageFilter = (props: Props) => {
  const { data, setSelectedFilterContent,setIsOpenFilter, isOpenFilter } = props;

  return (
    <div className={'absolute top-8 border-[1px] border-gray2 bg-white rounded-[16px] py-2 z-10'}>
      {!data || data.length === 0 ? (
        <div>error</div>
      ) : (
        data.map((datum: FilterType, index: number) => {
          return (
            <div
              key={index}
              className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
              onClick={() => {
                setSelectedFilterContent(datum.kor);
                setIsOpenFilter(!isOpenFilter)
              }}>
              {datum.kor}
            </div>
          );
        })
      )}
    </div>
  );
};
export default MyPageFilter;
