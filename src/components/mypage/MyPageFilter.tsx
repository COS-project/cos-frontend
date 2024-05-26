import React from 'react';

interface Props {
  data: string[]; //최신순, 작성순
  setSelectedFilterContent: React.Dispatch<React.SetStateAction<'최신순' | '작성순'>>;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFilterOpen: boolean;
}

const MyPageFilter = (props: Props) => {
  const { data, setSelectedFilterContent, setIsFilterOpen, isFilterOpen } = props;

  return (
    <div className={'absolute top-[20%] border-[1px] border-gray2 bg-white rounded-[16px] py-2 z-10'}>
      {!data || data.length === 0 ? (
        <div>error</div>
      ) : (
        data.map((datum: string, index: number) => {
          return (
            <div
              key={index}
              className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
              onClick={() => {
                setSelectedFilterContent(datum);
                setIsFilterOpen(!isFilterOpen);
              }}>
              {datum}
            </div>
          );
        })
      )}
    </div>
  );
};
export default MyPageFilter;
