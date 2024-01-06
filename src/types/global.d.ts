import React, { ReactNode } from 'react';

export interface MenuList {
  id: number;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
  path: string;
}

export interface SubjectInfo {
  year: number;
  sessions: Session[];
}

export interface Session {
  sessionNumber: number;
  totalcorrect: number;
  totalproblem: number;
// 온보딩 관심 자격증 리스트
export const LicenseInfo: Array<License> = [];

// 온보딩 관심 자격증 리스트의 객체 형태 자격증 번호
interface License {
  // TODO: 백엔드 API 나오는것 보고 변경될 예정
  id: string;
  title: string;
}
