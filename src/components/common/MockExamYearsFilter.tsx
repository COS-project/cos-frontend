import { Certificate } from '@/types/global';
import React from 'react';
import { PostDataType, YearsAndRounds } from '@/types/community/type';

interface Props {
  data: YearsAndRounds;
  setDataState: React.Dispatch<React.SetStateAction<PostDataType>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const MockExamYearsFilter = (props: Props) => {
  const { data, setDataState, setIsOpen } = props;

  const changePostDataExamYear = (year) => {
    setDataState((prevState) => ({
      ...prevState,
      examYear: parseInt(year),
    }));
  };
  return (
    <div
      className={
        'absolute z-10 w-full top-[100%] border-[1px] border-gray2 bg-white rounded-[16px] py-2 h-[210px] overflow-y-scroll'
      }>
      {!data || data.length === 0 ? (
        <div>error</div>
      ) : (
        Object.entries(data).map(([year, rounds]) => {
          return (
            <div
              key={year}
              className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
              onClick={() => {
                changePostDataExamYear(year);
                setIsOpen(false);
              }}>
              {year}
            </div>
          );
        })
      )}
    </div>
  )
}
export default MockExamYearsFilter;
