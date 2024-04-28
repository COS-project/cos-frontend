'use client';

import { useSearchParams } from 'next/navigation';
import { SVGProps, useEffect, useState } from 'react';
import * as React from 'react';

import AutoCompleteSearchKeywords from '@/components/community/AutoCompleteSearchKeywords';
import SearchInput from '@/components/community/SearchInput';
import useGetSearchResults from '@/lib/hooks/useGetAutoCompleteSearchKeywords';
import RecentSearchKeywords from '@/components/community/RecentSearchKeywords';
import useGetRecentSearchResults from '@/lib/hooks/useGetRecentSearchResults';
const Search = () => {
  const parameter = useSearchParams();
  const { autoCompleteKeywords } = useGetSearchResults(parameter.get('keyword'));
  const { recentSearchResults, mutate } = useGetRecentSearchResults();
  const [isClickedAutoCompleteSearchKeywords, setIsClickedAutoCompleteSearchKeywords] = useState(true);

  return (
    <div className={'bg-gray0 min-h-screen'}>
      {/*input*/}
      <SearchInput setIsClickedAutoCompleteSearchKeywords={setIsClickedAutoCompleteSearchKeywords}/>

      {/*자동완성 필터*/}
      {isClickedAutoCompleteSearchKeywords ? (
        <AutoCompleteSearchKeywords
          setIsClickedAutoCompleteSearchKeywords={setIsClickedAutoCompleteSearchKeywords}
          keywords={autoCompleteKeywords}
        />
      ) : null}

      <div className={'flex flex-col gap-y-8'}>
        {/*최근 검색어*/}
        <RecentSearchKeywords keywords={recentSearchResults} />

        {/*인기 검색어*/}
        <div className={'flex flex-col gap-y-3'}>
          <div className={'text-h4 font-semibold ml-2'}>인기 검색어</div>
          <div className={'grid grid-cols-2 gap-x-6 bg-white h-[184px] w-full rounded-[32px] gap-y-4 p-5'}>
            <div className={'flex justify-between text-h6'}>
              <div className={'flex'}>
                <div className={'w-[16px] font-bold mr-[6px]'}>2</div>
                <div>시험일정</div>
              </div>
              <UpIcon />
            </div>
            <div className={'flex justify-between text-h6'}>
              <div className={'flex'}>
                <div className={'w-[16px] font-bold mr-[6px]'}>2</div>
                <div>시험일정</div>
              </div>
              <UpIcon />
            </div>
            <div className={'flex justify-between text-h6'}>
              <div className={'flex'}>
                <div className={'w-[16px] font-bold mr-[6px]'}>2</div>
                <div>시험일정</div>
              </div>
              <UpIcon />
            </div>
            <div className={'flex justify-between text-h6'}>
              <div className={'flex'}>
                <div className={'w-[16px] font-bold mr-[6px]'}>2</div>
                <div>시험일정</div>
              </div>
              <UpIcon />
            </div>
            <div className={'flex justify-between text-h6'}>
              <div className={'flex'}>
                <div className={'w-[16px] font-bold mr-[6px]'}>2</div>
                <div>시험일정</div>
              </div>
              <UpIcon />
            </div>
            <div className={'flex justify-between text-h6'}>
              <div className={'flex'}>
                <div className={'w-[16px] font-bold mr-[6px]'}>2</div>
                <div>시험일정</div>
              </div>
              <UpIcon />
            </div>
            <div className={'flex justify-between text-h6'}>
              <div className={'flex'}>
                <div className={'w-[16px] font-bold mr-[6px]'}>2</div>
                <div>시험일정</div>
              </div>
              <UpIcon />
            </div>
            <div className={'flex justify-between text-h6'}>
              <div className={'flex'}>
                <div className={'w-[16px] font-bold mr-[6px]'}>2</div>
                <div>시험일정</div>
              </div>
              <UpIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;

const UpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none" {...props}>
    <mask
      id="a"
      width={25}
      height={25}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M.134.013h23.999v23.999H.134z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#FF6A3B"
        d="M8.57 15.013q-.191 0-.314-.19a.83.83 0 0 1-.123-.46q0-.056.155-.42l3.372-4.621a.7.7 0 0 1 .214-.226.47.47 0 0 1 .26-.083q.133 0 .259.083.125.084.23.226l3.357 4.62a1 1 0 0 1 .108.2.6.6 0 0 1 .046.23q0 .276-.123.458-.123.183-.313.183z"
      />
    </g>
  </svg>
);
const DownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none" {...props}>
    <mask
      id="a"
      width={25}
      height={25}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M24.133 24.06h-24V.061h24z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#6283FD"
        d="M15.698 9.062q.19 0 .313.19a.83.83 0 0 1 .123.459q0 .056-.155.421l-3.372 4.62a.7.7 0 0 1-.214.226.47.47 0 0 1-.26.084.47.47 0 0 1-.259-.084.9.9 0 0 1-.23-.225L8.288 10.13a1 1 0 0 1-.108-.199.6.6 0 0 1-.046-.23q0-.276.123-.458t.313-.182z"
      />
    </g>
  </svg>
);
const StayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none" {...props}>
    <mask
      id="a"
      width={25}
      height={25}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M.646.024h24v24h-24z" />
    </mask>
    <g mask="url(#a)">
      <path fill="#727375" d="M7.646 12.774v-1.5h10v1.5z" />
    </g>
  </svg>
);
const NewIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none" {...props}>
    <rect width={16} height={16} x={4.646} y={4.024} fill="#F4F5F7" rx={8} />
    <path
      fill="#3B3DFF"
      d="M15.596 8.453v7.071h-1.27l-3.109-4.492h-.051v4.492H9.698V8.453h1.292l3.083 4.489h.062v-4.49z"
    />
  </svg>
);
