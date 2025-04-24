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
import Post from '@/components/mypage/Post';
import StopWatchActiveButton from '@/components/stopwatch/StopWatchActiveButton';
import useDebounce from '@/hooks/useDebounce';
import useGetRecentSearchResults from '@/lib/hooks/useGetRecentSearchResults';
import useGetTrendingKeywords from '@/lib/hooks/useGetTrendingKeywords';
import { certificateIdAtom } from '@/recoil/atom';
import { autoCompleteSearchKeywordState } from '@/recoil/community/atom';
import { totalSearchResultsAtom } from '@/recoil/search/atom';

const SearchComponents = () => {
  const certificateId = useRecoilValue(certificateIdAtom);
  const { recentSearchResults } = useGetRecentSearchResults(certificateId);
  const { trendingKeywords, requestTime } = useGetTrendingKeywords(certificateId);
  const [isClickedAutoCompleteSearchKeywords, setIsClickedAutoCompleteSearchKeywords] = useState(false);
  const [searchValue, setSearchValue] = useRecoilState<string>(autoCompleteSearchKeywordState);
  const debouncedValue = useDebounce<string>(searchValue, 100);
  const router = useRouter();
  const totalSearchResults = useRecoilValue(totalSearchResultsAtom);

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

  const commentaryTopElement = (year: number, round: number, number: number) => {
    return (
      <div className={'flex gap-x-[6px] pb-3'}>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{year}년도</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{round}회차</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{number}번</div>
      </div>
    );
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

      {totalSearchResults.length > 0 ? (
        <div className={'flex flex-col gap-y-4 px-5'}>
          {totalSearchResults.map((post) => {
            return (
              <Post
                key={post.postId}
                title={post.postContent.title}
                postId={post.postId}
                likeStatus={post.likeStatus}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                content={post.postContent.content}
                createdAt={
                  post.dateTime.createdAt === post.dateTime.modifiedAt
                    ? (post.dateTime.createdAt as string)
                    : (post.dateTime.modifiedAt as string)
                }
                imageUrl={post.postImages.length > 0 ? post.postImages[0].imageUrl : null}
                topElement={
                  post.question
                    ? commentaryTopElement(
                        post.question.mockExam.examYear,
                        post.question.mockExam.round,
                        post.question.questionSeq,
                      )
                    : null
                }
              />
            );
          })}
        </div>
      ) : (
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
      )}
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
