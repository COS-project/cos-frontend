'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useRecoilState } from 'recoil';
import { certificationsListState } from '@/recoil/atom';

export interface Props {
  className: string;
  onClickItem?: () => void;
  icon: JSX.Element; //TODO: svg 변경예정
  children: React.ReactNode;
  isMoveButton?: boolean;
  path: string;
}

const CertificationClassificationItem = (props: Props) => {
  const { className, onClickItem, icon, children, isMoveButton = false, path } = props;

  const router = useRouter();

  //CertificationClassificationItem 컴포넌트의 이동버튼 클릭했을 때 함수
  const onClickMoveButton = () => {
    router.push(`community/${path}`);
  };

  return (
    <button className={className}>
      <div className="relative flex items-center gap-x-3 p-2">
        <div onClick={onClickItem} className="left-2 w-12 h-12 rounded-full bg-white">
          {/*TODO: 아이콘*/}
          {icon}
        </div>
        <div className="text-h4 font-semibold">{children}</div>
        <div className="absolute right-4" onClick={onClickMoveButton}>
          {isMoveButton ? <MoveButtonIcon /> : null}
        </div>
      </div>
    </button>
  );
};

export default CertificationClassificationItem;

function MoveButtonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.14572 5.5L13.1457 10.5L8.14572 15.5"
        stroke="#0D0E10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
