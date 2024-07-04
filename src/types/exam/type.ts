import { Question, ReviewIncorrectMockExam, Subject } from '@/types/global';
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

/**
 * 성적리포트 통계 responseType
 */
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

/**
 * 성적리포트 틀린문제 responseType
 */
export interface MockExamIncorrectQuestionsResultResponseType {
  responseCode: string;
  result: {
    content: MockExamIncorrectQuestionsResult[];
    hasNext: boolean;
  };
}

export interface MockExamIncorrectQuestionsResult {
  question: Question;
  userAnswerId: number;
  selectOptionSeq: number;
  takenTime: number;
  isCorrect: boolean;
}

export interface CorrectRateGraphType {
  subjectTitle: string;
  subjectCorrectRate: number;
}
