import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { MockExamDetailResponseType } from '@/types/exam/type';

/**
 * 모의고사 상세 정보를 가져오는 SWR 훅
 * @param dateType 날짜 타입 (DATE, WEEK_OF_MONTH, MONTH)
 * @param year 연도
 * @param month 월
 * @param weekOfMonth 월의 주차
 * @param date 날짜
 * @param page 페이지 번호 (무한 스크롤용)
 * @param size 페이지 크기 (무한 스크롤용)
 */
const useGetMockExamDetail = (
  dateType: string,
  year: string,
  month: number | undefined,
  weekOfMonth: number | undefined,
  date: string | undefined,
  page: number = 0,
  size: number = 10,
) => {
  // URL 쿼리 파라미터 생성 (불필요한 공백 없이)
  const queryParams = new URLSearchParams();

  if (year) queryParams.append('year', year);
  if (month) queryParams.append('month', month.toString());
  if (weekOfMonth) queryParams.append('weekOfMonth', weekOfMonth.toString());
  if (date) queryParams.append('date', date);
  queryParams.append('page', page.toString());
  queryParams.append('size', size.toString());

  const url = `/api/v2/certificates/1/mock-exam-results/${dateType}?${queryParams.toString()}`;

  const { data, error, mutate } = useSWR<MockExamDetailResponseType>(
    url,
    swrGetFetcher,
  );

  return {
    statisticsDetailData: data?.result,
    isLoading: !error && !data,
    mutate: mutate,
    isError: error,
  };
};

export default useGetMockExamDetail;
