import React, { ReactNode } from 'react';

export type Difficulty = '너무 쉬워요' | '쉬워요' | '보통이에요' | '조금 어려워요' | '어려워요';

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
  // 시험을 응시한적이 있는지 여부 변수
  isTaken: boolean;
  // 총 맞춘 정답 개수
  totalCorrect: number;
  // 총 문제 개수
  totalProblem: number;
  // 전체 시험 응시 시간
  totalTakenTime: string;
  // 시험 응시 최대 시간
  totalAllowedTime: string;
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
  // 평균 머문 시간 (기존)
  averageTime: number;
  // 과목에 머문 시간
  takenTime: number;
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
interface CommonTitleType {
  intro: ExamInfoCommonType;
  schedule: ExamInfoCommonType;
  subject: ExamInfoCommonType;
  fee: ExamInfoCommonType;
  method: ExamInfoCommonType;
  qualifications: ExamInfoCommonType;
  criteria: ExamInfoCommonType;
}
