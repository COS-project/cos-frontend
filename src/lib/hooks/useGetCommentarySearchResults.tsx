import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { ResponseType } from '@/types/common/type';
import { ResponsePostType } from '@/types/community/type';

const getKey = (
  pageIndex: number,
  previousPageData: ResponseType<ResponsePostType> | null,
  certificateId: number,
  examYear: number | string,
  round: number | string,
  questionSequence: number,
) => {
  // 초기 요청
  if (pageIndex === 0) {
    return `/api/v2/certificates/${certificateId}/commentary-posts?${
      examYear == '전체' ? ' ' : `examYear=${examYear}`
    }${round == '전체' ? '' : `&round=${round}`}${
      questionSequence === undefined || questionSequence === 0 ? ' ' : `&questionSequence=${questionSequence}`
    }&page=${pageIndex}&size=10`;
  }

  // 이전 페이지 데이터가 없으면 종료
  if (!previousPageData) return null;

  // 이전 페이지에 더 많은 데이터가 있으면 다음 페이지 요청
  if (previousPageData.result.hasNext) {
    return `/api/v2/certificates/${certificateId}/commentary-posts?${
      examYear == '전체' ? ' ' : `examYear=${examYear}`
    }${round == '전체' ? ' ' : `&round=${round}`}${
      questionSequence === undefined || questionSequence === 0 ? ' ' : `&questionSequence=${questionSequence}`
    }&page=${pageIndex}&size=10`;
  }

  // 이전 페이지에 더 이상 데이터가 없으면 null 반환
  return null;
};
const useGetCommentarySearchResults = (
  certificateId: number,
  examYear: number | string,
  round: number | string,
  questionSequence: number,
) => {
  const { data, isLoading, error, size, setSize } = useSWRInfinite<ResponseType<ResponsePostType>>(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, certificateId, examYear, round, questionSequence),
    swrGetFetcher,
    {
      revalidateAll: true,
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  return {
    commentarySearchResults: data ? data : [],
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
  };
};
export default useGetCommentarySearchResults;
