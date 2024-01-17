'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  data: string[];
  className: string;
  setDataState: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 필터 모달창입니다.
 */
const FilterModal = (props: Props) => {
  const { data, className, setDataState, setIsOpen } = props;
  return (
    <div className={twMerge('border-[1px] border-gray2 bg-white rounded-[16px] w-fit py-2', className)}>
      {data.map((datum, index) => {
        return (
          <div
            key={index}
            className="text-h4 text-gray3 py-[6px] px-3 hover:text-black transition"
            onClick={() => {
              setDataState(datum);
              setIsOpen(false);
            }}>
            {datum}
          </div>
        );
      })}
    </div>
  );
};
export default FilterModal;
