'use client';

import { useRouter } from 'next/navigation';
import qs from 'query-string';
import * as React from 'react';
import { SVGProps, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import useDebounce from '@/hooks/useDebounce';
import { getTotalSearchResults } from '@/lib/api/community';
import useGetRecentSearchResults from '@/lib/hooks/useGetRecentSearchResults';
import { autoCompleteSearchKeywordState } from '@/recoil/community/atom';

interface Props {
  setIsClickedAutoCompleteSearchKeywords: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchInput = (props: Props) => {
  const { setIsClickedAutoCompleteSearchKeywords } = props;
  const router = useRouter();
  const [searchValue, setSearchValue] = useRecoilState<string>(autoCompleteSearchKeywordState);
  const debouncedValue = useDebounce<string>(searchValue, 100);
  const { recentSearchResults, mutate } = useGetRecentSearchResults();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await getTotalSearchResults(1, 'COMMENTARY', debouncedValue).then((r) => console.log(r.result.content));
    await mutate();
  };

  useEffect(() => {
    const query = {
      keyword: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/search',
      query: query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className={'bg-white my-[6px] px-5 py-[10px]'}>
      <div className={'flex gap-x-3  items-center'}>
        <BackIcon />
        <form
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
          className={'flex gap-x-1 py-2 px-3 border-[1px] border-gray2 rounded-[16px] w-full'}>
          <SearchIcon />
          <input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setIsClickedAutoCompleteSearchKeywords(true);
            }}
            className={'text-h4 text-gray4 outline-none'}
            placeholder={'궁금한 것을 검색해보세요.'}></input>
        </form>
      </div>
    </div>
  );
};
export default SearchInput;

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={26} height={24} fill="none" {...props}>
    <mask
      id="a"
      width={26}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M.646 0h24.775v24H.646z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#727375"
        d="m20.76 20.154-6.464-6.261a5.7 5.7 0 0 1-1.78.988 6.1 6.1 0 0 1-2.024.35q-2.48 0-4.198-1.663T4.576 9.503q0-2.4 1.717-4.067Q8.011 3.77 10.49 3.77q2.479 0 4.199 1.664 1.72 1.665 1.72 4.066 0 1.043-.381 2.018a5.4 5.4 0 0 1-1 1.667l6.463 6.262zm-10.268-5.923q2.055 0 3.47-1.37 1.414-1.371 1.414-3.36 0-1.992-1.415-3.361-1.414-1.37-3.469-1.37T7.023 6.14 5.61 9.5t1.414 3.36 3.47 1.371"
      />
    </g>
  </svg>
);
const BackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={33} height={32} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m21.646 26-10-10 10-10" />
  </svg>
);
