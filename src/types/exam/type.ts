import { ReviewIncorrectMockExam, Subject } from '@/types/global';
export interface RecentMockExamResultResponseType {
  responseCode: string;
  result: RecentMockExamResultType;
}
interface RecentMockExamResultType {
  mockExamResultId: number;
  round: number;
  mockExam: ReviewIncorrectMockExam;
  totalScore: number;
  createdAt: string;
}

export interface MockExamResultsResponseType {
  responseCode: string;
  result: MockExamResultType[];
}

export interface MockExamResultType {
  mockExamResultId: number;
  round: number;
  mockExam: ReviewIncorrectMockExam;
  subjectResults: SubjectResultsType[];
  totalScore: number;
}

export interface SubjectResultsType {
  subject: Subject;
  score: number;
  numberOfCorrect: number;
  totalTakenTime: number;
  correctRate: number;
}
