import React from 'react';
import { useRecoilState } from 'recoil';

import { autoCompleteSearchKeywordState } from '@/recoil/community/atom';

interface Props {
  keywords: string[];
  setIsClickedAutoCompleteSearchKeywords: React.Dispatch<React.SetStateAction<boolean>>;
}
const AutoCompleteSearchKeywords = (props: Props) => {
  const { keywords, setIsClickedAutoCompleteSearchKeywords } = props;
  const [searchValue, setSearchValue] = useRecoilState<string>(autoCompleteSearchKeywordState);
  const autoCompleteSearchValue = (keyword: string) => {
    setSearchValue(keyword);
  };

  return (
    <>
      <div className={'rounded-[16px] bg-white border-[1px] border-gray2 '}>
        {keywords
          ? keywords.map((keyword: string, index: number) => {
              return (
                <div
                  onClick={() => {
                    autoCompleteSearchValue(keyword);
                    setIsClickedAutoCompleteSearchKeywords(false);
                  }}
                  key={index}
                  className={'py-[6px] px-[12px] text-gray3'}>
                  {keyword}
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};
export default AutoCompleteSearchKeywords;
