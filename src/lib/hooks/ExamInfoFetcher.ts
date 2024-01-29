import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { ExamInfo, ExamResult } from '@/types/global';

// 모의고사 연도와 회차 정보를 담은 데이터 (연도,회차)
export const useGetExamInfoData = () => {
  const { data, error } = useSWR<ExamInfo>('/1/mock-exam-infos', swrGetFetcher);

  return {
    Data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// id와 연도를 매개변수로 나중에 받아야 할듯
export const useGetExamYearData = () => {
  const { data, error } = useSWR<ExamResult>('/1/mock-exams?examYear=2023', swrGetFetcher);

  return {
    YearData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
