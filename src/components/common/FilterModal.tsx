'use client';

import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import { Certificate } from '@/types/global';
import { PostDataType, YearsAndRounds } from '@/types/community/type';

interface Props {
  data: [];
  className?: string;
  setDataState: React.Dispatch<React.SetStateAction<PostDataType>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 필터 모달창입니다.
 */
const FilterModal = (props: Props) => {
  const { data, className, setDataState, setIsOpen } = props;

  const changePostDataRound = (datum) => {
    setDataState((prevState) => ({
      ...prevState,
      round: parseInt(datum),
    }));
  };

  return (
    <div className={twMerge('border-[1px] border-gray2 bg-white rounded-[16px] py-2 z-10', className)}>
      {!data || data.length === 0 ? (
        <div>error</div>
      ) : (
        data.map((datum, index) => {
          return (
            <div
              key={index}
              className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
              onClick={() => {
                changePostDataRound(datum);
                setIsOpen(false);
              }}>
              {datum}
            </div>
          );
        })
      )}
    </div>
  );
};
export default FilterModal;
