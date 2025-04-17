import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { CertificateInfoResponseType } from '@/types/home/type';

const useGetCertificationInfo = () => {
  const { data, error } = useSWR<CertificateInfoResponseType>(
    '/api/v2/certificates/1/certificate-exams',
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  return {
    certificationInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetCertificationInfo;
