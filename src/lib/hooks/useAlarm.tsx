import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { AlarmResponseType } from '@/types/alarm/type';

const useAlarm = () => {
  //66: 자유, 61: 해설, 55: 꿀팁
  const { data, error } = useSWR<AlarmResponseType>('/alert/api/v2/alarms', swrGetFetcher, {
    shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
    revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
  });
  return {
    alarms: data ? data.result : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useAlarm;
