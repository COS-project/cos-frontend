import { ReviewIncorrectMockExam } from '@/types/global';

export interface AxiosResponseUserGoalsType {
  responseCode: string;
  message: string;
  result: UserCertGoalPeriodType[];
}
export interface UserCertGoalPeriodType {
  goalId: number;
  prepareStartDateTime: string;
  prepareFinishDateTime: string;
}

/**
 * 목표 기간 내 전체 주간
 */
export interface WeeklyGoalPeriodType {
  prepareDate: string;
  prepareYear: string;
  prepareMonth: number;
  prepareWeekly: number;
  formattedWeeklyPrepTime: string;
}

export interface ExamStaticsDataResponseType {
  responseCode: string;
  result: ExamStaticsDataType;
}

/**
 * 성장그래프 통계 타입
 */
export interface ExamStaticsDataType {
  totalAverage: number;
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
  createdAt: string;
}

//////////////////////////////////////////////////////
/**
 * 자격증 정보 타입
 */
export interface CertificateInfoType {
  certificate: {
    certificateId: number;
    certificateName: string;
  };
  examInfo: {
    examYear: number;
    round: number;
    examSchedule: {
      applicationStartDateTime: string;
      applicationDeadlineDateTime: string;
      resultAnnouncementDateTime: string;
      examDateTime: string;
    };
    examFee: {
      writtenExamFee: number;
      practicalExamFee: number;
    };
    examTimeLimit: {
      writtenExamTimeLimit: number;
      practicalExamTimeLimit: number;
    };
    passingCriteria: {
      subjectPassingCriteria: number;
      totalAvgCriteria: number;
      practicalPassingCriteria: number;
    };
    subjectsInfo: string;
    description: string;
    examFormat: string;
    examEligibility: string;
  };
}

/**
 * response 타입
 */
export interface CertificateInfoResponseType {
  responseCode: string;
  message: string;
  result: CertificateInfoType;
}
