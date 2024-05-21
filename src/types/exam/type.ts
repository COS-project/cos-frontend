import { ReviewIncorrectMockExam } from '@/types/global';
export interface RecentMockExamResultResponseType {
  responseCode: string;
  result: RecentMockExamResultType
}
interface RecentMockExamResultType {
  mockExamResultId: number;
  round: number;
  mockExam: ReviewIncorrectMockExam;
  totalScore: number;
  createdAt: string;
}
