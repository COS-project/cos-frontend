'use client';

import React, { ReactNode } from 'react';

export interface DoneButtonProps {
  children: ReactNode;
  onClick?: () => void;
  isClick: boolean;
}

const DoneButton: React.FC<DoneButtonProps> = ({ children, onClick, isClick }) => {
  return (
    <button
      className={
        isClick
          ? 'w-full bg-primary h-[100px] rounded-t-[32px] text-white text-h3 fixed bottom-0'
          : 'w-full bg-gray2 h-[100px] rounded-t-[32px] text-white text-h3 fixed bottom-0'
      }
      onClick={onClick}>
      <div className="text-white text-h3 py-[25px]">{children}</div>
    </button>
  );
};
export default DoneButton;
