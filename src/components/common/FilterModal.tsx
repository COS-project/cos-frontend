'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Certificate } from '@/types/global';

interface Props {
  data: Certificate[];
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
                setDataState(datum.certificateName);
                setIsOpen(false);
              }}>
              {datum.certificateName}
            </div>
          );
        })
      )}
    </div>
  );
};
export default FilterModal;
