import { sendRequest } from '@/lib/axios';
import { SubjectResultRequests } from '@/types/global';

export const postSubjectResultRequestsList = async (subjectResultRequestsList: SubjectResultRequests[]) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'POST',
      data: { subjectResultRequests: subjectResultRequestsList },
      url: 'mock-exams/1/mock-exam-results',
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};
