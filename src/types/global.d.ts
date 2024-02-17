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
  correctAnswer: number;
  // 전체 문제 수
  totalProblems: number;
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
