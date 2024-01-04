import React, { ReactNode } from 'react';

export interface MenuList {
  id: number;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
  path: string;
}

// 온보딩 CertificationClassificationItem 컴포넌트의 Props
export interface CertificationClassificationItemProps {
  className: string;
  onClickItem?: () => void;
  icon: JSX.Element; //TODO: svg 변경예정
  children: React.ReactNode;
  isMoveButton?: boolean;
  onClickMoveButton?: () => void;
}

// 온보딩 DoneButton 컴포넌트의 Props
export interface DoneButtonProps {
  children: ReactNode;
  onClick?: () => void;
  isClick: boolean;
}

// 온보딩 관심 자격증 리스트
export const LicenseInfo: Array<License> = [];

// 온보딩 관심 자격증 리스트의 객체 형태 자격증 번호
interface License {
  // TODO: 백엔드 API 나오는것 보고 변경될 예정
  id: string;
  title: string;
}
