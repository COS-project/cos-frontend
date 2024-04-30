import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { client, swrGetFetcher } from '@/lib/axios';
import { certificateYearList, ExamInfo, ExamResult } from '@/types/global';

// 모의고사 연도와 회차 정보를 담은 데이터 (연도,회차)
export const useGetExamInfoData = () => {
  const { data, error } = useSWR<ExamInfo>('/1/mock-exam-infos', swrGetFetcher);

  return {
    Data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// 특정 자격증의 연도리스트 데이터 get하는 함수
export const useGetCertificateYearListData = () => {
  const { data, error } = useSWR<certificateYearList>('certificates/1/exam-years', swrGetFetcher);

  return {
    Data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// id와 연도를 매개변수로 나중에 받아야 할듯
// 연도 데이터, 그 연도에 해당하는 round와 응시 여부 받아온다
// (examid, round, istake)
export const useGetExamYearData = (examId?: Number, examYear?: Number) => {
  const { data, error } = useSWR<ExamResult>(`certificates/${examId}/mock-exams?examYear=${examYear}`, swrGetFetcher);

  return {
    YearData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
