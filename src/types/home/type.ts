import { ReviewIncorrectMockExam } from '@/types/global';

export interface AxiosResponseUserGoalsType {
  responseCode: string;
  message: string;
  result: UserGoalsType[];
}
export interface UserGoalsType {
  goalId: number;
  prepareStartDateTime: string;
  prepareFinishDateTime: string;
}
/**
 * 목표 기간 내 전체 주간
 */
export interface eachGoalPeriodType {
  prepareDate: string;
  prepareYear: number;
  prepareMonth: number;
  prepareWeek: number;
  prepareWeekString: string;
}

/**
 * 성장그래프 통계 타입
 */
export interface ExamStaticsDataType {
  average: number;
  scoreAVGList: ScoreAVGListType[];
}

/**
 * 성장 그래프 통계 각각의 데이터
 */
export interface ScoreAVGListType {
  scoreAverage: number;
  dayOfWeek?: string;
  weekOfMonth?: number;
  date: string;
  month?: number;
}



/**
 * 성장그래프 디테일 report 데이터 타입
 */
export interface DetailGradeReportType {
  mockExamResultId: number;
  round: number;
  mockExam: ReviewIncorrectMockExam;
  totalScore: number;
}
