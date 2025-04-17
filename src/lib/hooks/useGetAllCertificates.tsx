import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { Certificate, CertificatesResponseType } from '@/types/global';

const useGetAllCertificates = () => {
  const { data, error } = useSWR<CertificatesResponseType>('/api/v2/certificates', swrGetFetcher, {
    shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
    revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
  });

  const parseResultList = data?.result.map((item) => item).flat();

  return {
    certificationsList: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetAllCertificates;
