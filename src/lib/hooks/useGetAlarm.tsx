import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';

const useGetAlarm = () => {
  const { data, error } = useSWR<AxiosResponse>('/api/v2/alarms/subscribe', swrGetFetcher, {
    shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
    revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
  });

  return {
    alarm: data ? data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetAlarm;
