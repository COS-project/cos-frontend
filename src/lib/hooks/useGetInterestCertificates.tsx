import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { InterestCertificateResponseType } from '@/types/global';

const useGetInterestCertificates = () => {
  const { data, error, mutate } = useSWR<InterestCertificateResponseType>(
    '/api/v2/interest-certificates',
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  const parseResultList = data?.result.map((item) => item).flat();

  return {
    interestCertificates: parseResultList,
    isLoading: !error && !data,
    isError: error,
    interestCertificateDataMutate: mutate,
  };
};
export default useGetInterestCertificates;
