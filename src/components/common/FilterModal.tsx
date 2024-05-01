'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { CreatePostDataType, YearsAndRounds } from '@/types/community/type';
import { Certificate } from '@/types/global';

interface Props {
  data: [];
  className?: string;
  setIdState?: React.Dispatch<React.SetStateAction<number>>
  setDataState: React.Dispatch<React.SetStateAction<CreatePostDataType>> | React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 필터 모달창입니다.
 */
const FilterModal = (props: Props) => {
  const { data, className, setIdState, setDataState, setIsOpen } = props;

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
                setDataState ? setDataState(datum?.certificate.certificateName) : changePostDataRound(datum);
                setIdState ? setIdState(datum?.certificate.certificateId) : null;
                setIsOpen(false);
              }}>
              {setDataState ? datum.certificate.certificateName : datum}
            </div>
          );
        })
      )}
    </div>
  );
};
export default FilterModal;
