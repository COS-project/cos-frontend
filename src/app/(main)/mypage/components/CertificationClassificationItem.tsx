'use client';

import React from 'react';

interface CertificationClassificationItemProps {
  className: string;
  onClickItem?: () => void;
  icon: string; //TODO: svg 변경예정
  children: React.ReactNode;
  isMoveButton?: boolean;
  onClickMoveButton?: () => void;
}

const CertificationClassificationItem: React.FC<CertificationClassificationItemProps> = ({
  className,
  onClickItem,
  icon,
  children,
  isMoveButton = false,
  onClickMoveButton,
}) => {
  return (
    <button className={className} onClick={onClickItem}>
      <div className="relative flex items-center gap-x-3 p-2">
        <div className="left-2 w-12 h-12 rounded-full bg-white">
          {/*TODO: 아이콘*/}
          {icon}
        </div>
        <div className="text-h4 font-semibold">{children}</div>
        <div className="absolute right-4" onClick={onClickMoveButton}>
          {isMoveButton ? '>' : null}
        </div>
      </div>
    </button>
  );
};
export default CertificationClassificationItem;
