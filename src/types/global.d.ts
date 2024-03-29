import React from 'react';

export interface MenuList {
  id: number;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
  path: string;
}

// 과목에 대한 정보
export interface SubjectInfo {
  // 과목의 연도 정보
  year: number;
  // 회차 리스트
  sessions: Session[];
}

// 과목 - 회차에 대한 정보
export interface Session {
  // 회차 정보 ex) 2023년 - 1회차
  sessionNumber: number;
  // 총 맞춘 정답 개수
  totalCorrect: number;
  // 총 문제 개수
  totalProblem: number;
  // 과목내 세부과목에 대한 정보를 담고있음
  subjects: SpecificSubject[];
}

// 과목별 세부 과목 내용을 담는 자료 Ex) 정보처리기사 - 데이터베이스 과목
export interface SpecificSubject {
  // 과목명
  name: string;
  // 정답 개수
  correctAnswer: Number | null;
  // 전체 문제 수
  totalProblems: Number | null;
  // 평균 머문 시간 (기존)
  averageTime: Number | null;
  // 과목에 머문 시간
  takenTime: Number | null;
}

// api 기준
export interface ExamInfo {
  responseCode: string;
  result: {
    // examYearWithRounds: Record<string, number[]>[];
    examYearWithRounds: examYearWithRounds[];
  };
}

export interface examYearWithRounds {
  year: string;
  rounds: number[];
}

export interface ExamResult {
  responseCode: string;
  result: MockExam[];
}

export interface MockExam {
  mockExamId: number;
  round: number;
  isTake: boolean;
}

// 진행 바 만들 때 사용합니다.
export interface ProgressBar {
  width: number;
}

export interface ProblemInfo {
  questionNum: number;
  choiceAnswer: multipleChoice;
}

export interface multipleChoice {
  problem: string;
  example: string[];
}

// api를 통해 받아온 year들을 추출해서 담아둘 구조
export interface examYearList {
  years: number[];
}

// 온보딩 관심 자격증 리스트
export const LicenseInfo: Array<License> = [];

// 온보딩 관심 자격증 리스트의 객체 형태 자격증 번호
interface License {
  // TODO: 백엔드 API 나오는것 보고 변경될 예정
  id: string;
  title: string;
}

// 자격증 정보 공통 분류
export interface ExamInfoCommonCategory {
  intro: ExamInfoCommonType;
  schedule: ExamInfoCommonType;
  subject: ExamInfoCommonType;
  fee: ExamInfoCommonType;
  method: ExamInfoCommonType;
  qualifications: ExamInfoCommonType;
  criteria: ExamInfoCommonType;
}

// 자격증 응시 정보의 공통 타입
export interface ExamInfoCommonType {
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  content?: React.ReactElement;
}

// 공통 제목 type
export interface CommonTitleType {
  description: ExamInfoCommonType;
  examFee: ExamInfoCommonType;
  examSchedule: ExamInfoCommonType;
  subjectsInfo: ExamInfoCommonType;
  examFormat: ExamInfoCommonType;
  examEligibility: ExamInfoCommonType;
  examTimeLimit: ExamInfoCommonType;
  passingCriteria: ExamInfoCommonType;
}

//자격증 응시 정보 type
export interface CertificateInfoType {
  examSchedule: {
    applicationStartDateTime: string;
    applicationDeadlineDateTime: string;
    examDateTime: string;
  };
  examFee: {
    writtenExamFee: string;
    practicalExamFee: string;
  };
  examTimeLimit: {
    writtenExamTimeLimit: string;
    practicalExamTimeLimit: string;
  };
  passingCriteria: {
    subjectPassingCriteria: string;
    totalAvgCriteria: string;
    practicalPassingCriteria: string;
  };
  subjectsInfo: string;
  description: string;
  examFormat: string;
  examEligibility: string;
}

// 목표 설정 type
export interface GoalSettingInfo {
  certificate?: Certificate;
  goalScore: number;
  prepareStartDateTime: string;
  prepareFinishDateTime: string;
  goalPrepareDays: number;
  mockExamsPerDay: number;
  goalMockExams: number;
  mockExamRepeatDays: number[];
  studyTimePerDay: number;
  goalStudyTime: number;
  studyRepeatDays: number[];
}

//온보딩 자격증
export interface Certificate {
  certificateId: number;
  certificateName: string;
  isClick: boolean; // 자격증을 선택했을 경우
}

//온보딩 흥미 자격증 타입
export interface InterestCertificate {
  certificateId: number;
  interestPriority: string;
  certificateName?: string;
}
//게시판 즐겨찾기
export interface FavoriteBoard {
  certificate: {
    certificateId: number;
    certificateName: string;
  };
  isFavorite: boolean;
}

//userProfile
export interface userProfile {
  userId?: number;
  nickname: string;
  email?: string;
  profileImage: string;
}

//모의고사 시험 문제 선지
export interface Question {
  optionSequence: number;
  optionContent: string;
  optionImage: string;
}

//서버에 보낼 모의고사 시험 응시 결과
export interface UserAnswerRequests {
  questionId: number;
  selectOptionSeq: number; //1,2,3,4
  takenTime: number; // 밀리세컨드
  isCorrect?: boolean;
}

//서버에 보낼 과목별 채점 결과
export interface SubjectResultRequests {
  subjectId: number;
  score: number;
  userAnswerRequests: UserAnswerRequests[];
}

//모의고사 시험 문제, 선지 전체
export interface QuestionsResponse {
  questionId: number;
  mockExam: ReviewIncorrectMockExam;
  subject: {
    subjectId: number;
    subjectName: string;
    numberOfQuestions: number;
    totalScore: number;
  };
  questionSeq: number;
  questionText: string;
  questionImage: string;
  questionOptions: Question[];
  correctOption: number;
  score: number;
}

export interface Param {
  page: number;
  size: number;
  sort?: [];
}

export interface ReviewIncorrectAnswers {
  responseCode: string;
  message: string;
  result: {
    pageable: {
      pageNumber: number;
      unpaged: boolean;
      pageSize: number;
      paged: boolean;
      offset: number;
      sort: {
        unsorted: boolean;
        sorted: boolean;
        empty: boolean;
      };
    };
    numberOfElements: number;
    size: number;
    content: ReviewIncorrectAnswersContent[];
    number: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    first: boolean;
    last: boolean;
    empty: boolean;
  };
}

export interface ReviewIncorrectAnswersContent {
  question: QuestionsResponse;
  userAnswerId: number;
  selectOptionSeq: number;
  takenTime: number;
  isCorrect: boolean;
}

export interface ReviewIncorrectMockExam {
  MockExamId: number;
  examYear: number;
  round: number;
  timeLimit: number;
  certificate: Certificate;
}
