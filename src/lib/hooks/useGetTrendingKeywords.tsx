import { useRef } from 'react';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { ResponseType } from '@/types/common/type';
import { TrendingKeywordType } from '@/types/search/type';

const useGetTrendingKeywords = (certificateId: number) => {
  // 요청 시간(timestamp)을 저장할 ref
  const requestTimestampRef = useRef<Date | null>(null);

  const { data, error } = useSWR<ResponseType<TrendingKeywordType[]>>(
    `/api/v2/certificates/${certificateId}/trending-keywords`,
    (...args: Parameters<typeof swrGetFetcher>) => {
      // 요청이 시작된 시간 저장
      requestTimestampRef.current = new Date();

      // 기존 fetcher 호출
      return swrGetFetcher(...args);
    },
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  const parseResultList = data?.result.map((item) => item).flat();

  // "오후 8:13" 형식으로 시간만 추출하는 함수
  const getTimeString = (date: Date | null): string => {
    if (!date) return '';

    return date.toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return {
    trendingKeywords: parseResultList,
    isLoading: !error && !data,
    isError: error,
    requestTime: getTimeString(requestTimestampRef.current), // "오후 8:13" 형식
  };
};

export default useGetTrendingKeywords;
