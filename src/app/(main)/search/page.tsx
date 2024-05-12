'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import AutoCompleteSearchKeywords from '@/components/community/AutoCompleteSearchKeywords';
import TrendingSearchKeywords from '@/components/community/TrendingSearchKeywords';
import RecentSearchKeywords from '@/components/community/RecentSearchKeywords';
import SearchInput from '@/components/community/SearchInput';
import useDebounce from '@/hooks/useDebounce';
import useGetSearchResults from '@/lib/hooks/useGetAutoCompleteSearchKeywords';
import useGetRecentSearchResults from '@/lib/hooks/useGetRecentSearchResults';
import useGetTrendingKeywords from '@/lib/hooks/useGetTrendingKeywords';
import { autoCompleteSearchKeywordState, boardTypeState } from '@/recoil/community/atom';
import { BoardType } from '@/types/community/type';

const Search = () => {
  const parameter = useSearchParams();
  const { autoCompleteKeywords } = useGetSearchResults(parameter.get('keyword'));
  const { recentSearchResults } = useGetRecentSearchResults();
  const { trendingKeywords, lastFetchedTime } = useGetTrendingKeywords(1);
  const [isClickedAutoCompleteSearchKeywords, setIsClickedAutoCompleteSearchKeywords] = useState(false);
  const [boardType, setBoardType] = useRecoilState<BoardType>(boardTypeState);
  const [searchValue, setSearchValue] = useRecoilState<string>(autoCompleteSearchKeywordState);
  const debouncedValue = useDebounce<string>(searchValue, 100);
  const router = useRouter();

  useEffect(() => {
    const query = {
      keyword: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/search',
      query: query,
    });

    router.push(url);
  }, [debouncedValue]);

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

  return (
    <div className={'relative flex flex-col gap-y-5 bg-gray0 min-h-screen'}>
      {/*input*/}
      <SearchInput
        boardType={boardType}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setIsClickedAutoCompleteSearchKeywords={setIsClickedAutoCompleteSearchKeywords}
      />

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
          <TrendingSearchKeywords
            setSearchValue={setSearchValue}
            lastFetchedTime={formattedDate(lastFetchedTime)}
            keywords={trendingKeywords}
          />
        </div>
      </div>
    </div>
  );
};
export default Search;
