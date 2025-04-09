'use client';

import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { Suspense } from 'react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import RecentSearchKeywords from '@/components/community/RecentSearchKeywords';
import SearchInput from '@/components/community/SearchInput';
import TrendingSearchKeywords from '@/components/community/TrendingSearchKeywords';
import StopWatchActiveButton from '@/components/stopwatch/StopWatchActiveButton';
import useDebounce from '@/hooks/useDebounce';
import useGetRecentSearchResults from '@/lib/hooks/useGetRecentSearchResults';
import useGetTrendingKeywords from '@/lib/hooks/useGetTrendingKeywords';
import { certificateIdAtom } from '@/recoil/atom';
import { autoCompleteSearchKeywordState } from '@/recoil/community/atom';

const SearchComponents = () => {
  const certificateId = useRecoilValue(certificateIdAtom);
  const { recentSearchResults } = useGetRecentSearchResults(certificateId);
  const { trendingKeywords, requestTime } = useGetTrendingKeywords(certificateId);
  const [isClickedAutoCompleteSearchKeywords, setIsClickedAutoCompleteSearchKeywords] = useState(false);
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
  const formattedDate = (date: Date | null): string => {
    return new Intl.DateTimeFormat('ko', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date ?? new Date());
  };

  return (
    <div className={'relative flex flex-col gap-y-5 bg-gray0 min-h-screen'}>
      {/*input*/}
      <SearchInput
        isClickedAutoCompleteSearchKeywords={isClickedAutoCompleteSearchKeywords}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setIsClickedAutoCompleteSearchKeywords={setIsClickedAutoCompleteSearchKeywords}
      />

      <div className={'px-5'}>
        <div className={'flex flex-col gap-y-8'}>
          {/*최근 검색어*/}
          <RecentSearchKeywords keywords={recentSearchResults} />

          {/*인기 검색어*/}
          <TrendingSearchKeywords
            setSearchValue={setSearchValue}
            keywords={trendingKeywords}
            requestTime={requestTime}
          />
        </div>
      </div>
      <StopWatchActiveButton className={'bottom-5'} />
    </div>
  );
};

export default function Search() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchComponents />
    </Suspense>
  );
}
