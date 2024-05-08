'use client';

import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { SVGProps, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import AutoCompleteSearchKeywords from '@/components/community/AutoCompleteSearchKeywords';
import PopularSearchKeywords from '@/components/community/PopularSearchKeywords';
import RecentSearchKeywords from '@/components/community/RecentSearchKeywords';
import SearchInput from '@/components/community/SearchInput';
import useGetSearchResults from '@/lib/hooks/useGetAutoCompleteSearchKeywords';
import useGetPopularSearchKeywords from '@/lib/hooks/useGetPopularSearchKeywords';
import useGetRecentSearchResults from '@/lib/hooks/useGetRecentSearchResults';
import { popularSearchKeywordState } from '@/recoil/community/atom';
import { PopularSearchKeyword } from '@/types/community/type';

const Search = () => {
  const parameter = useSearchParams();
  const { autoCompleteKeywords } = useGetSearchResults(parameter.get('keyword'));
  const { recentSearchResults, mutate } = useGetRecentSearchResults();
  const { popularSearchKeywords, lastFetchedTime } = useGetPopularSearchKeywords();
  const [isClickedAutoCompleteSearchKeywords, setIsClickedAutoCompleteSearchKeywords] = useState(false);
  const [recoilPopularSearchKeyword, setRecoilPopularSearchKeyword] = useRecoilState(popularSearchKeywordState);

  /**
   * 인기 검색어 업데이트 날짜를 포멧하는 함수
   * @param date 인기 검색어 업데이트 날짜
   */
  const formattedDate = (date: Date): string => {
    return new Intl.DateTimeFormat('ko', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  /**
   * 기존 데이터와 새로운 데이터를 비교하고 아이콘을 결정하는 함수
   */
  const getIconType = (prevKeywords: PopularSearchKeyword[], newKeywords: PopularSearchKeyword[]) => {
    return newKeywords?.map((keyword, index) => {
      const prevKeyword = prevKeywords.find((k) => k.keyword === keyword.keyword);

      if (prevKeyword) {
        // 기존에 존재하는 경우, 순서가 올랐는지, 내렸는지, 동일한지 확인
        if (prevKeyword.sequence > index + 1) {
          return { ...keyword, icon: <UpIcon /> }; // 순서가 내려간 경우
        } else if (prevKeyword.sequence < index + 1) {
          return { ...keyword, icon: <DownIcon /> }; // 순서가 올라간 경우
        } else if (prevKeyword.sequence == index + 1) {
          return { ...keyword, icon: <StayIcon /> }; // 순서가 동일한 경우
        }
      } else {
        // 이전에 존재하지 않던 새로운 키워드의 경우
        return { ...keyword, icon: <NewIcon /> };
      }
    });
  };

  /**
   * 인기 검색어를 초기화하고 Recoil 상태를 업데이트하는 함수
   */
  const initializePopularKeywords = (response: string[]) => {
    return response.map((item: string, index: number) => ({
      keyword: item,
      sequence: index + 1,
      icon: <StayIcon />,
    }));
  };

  // Recoil 상태 업데이트를 위한 useEffect
  useEffect(() => {
    if (popularSearchKeywords) {
      const updatedKeywords = initializePopularKeywords(popularSearchKeywords);

      // 이전 상태와 새로운 상태 비교 후 아이콘 업데이트
      const iconUpdatedKeywords = getIconType(recoilPopularSearchKeyword, updatedKeywords);
      setRecoilPopularSearchKeyword(iconUpdatedKeywords);
    }
  }, [JSON.stringify(popularSearchKeywords)]); // 의존성 배열에서 객체 비교

  return (
    <div className={'relative flex flex-col gap-y-5 bg-gray0 min-h-screen'}>
      {/*input*/}
      <SearchInput setIsClickedAutoCompleteSearchKeywords={setIsClickedAutoCompleteSearchKeywords} />

      <div className={'px-5'}>
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
          <PopularSearchKeywords
            lastFetchedTime={formattedDate(lastFetchedTime)}
            keywords={recoilPopularSearchKeyword}
          />
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
