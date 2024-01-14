'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children?: React.ReactNode;
  className: string;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  onMove: () => void;
  onStep: React.Dispatch<React.SetStateAction<string>>;
}
const Button = (props: Props) => {
  const { children, className, Icon, onMove, onStep } = props;
  return (
    <button
      onClick={() => {
        onMove();
        onStep;
      }}
      className={twMerge('bg-blue-button', className)}>
      <div>{children}</div>
      <div className="mt-[2px]">
        <Icon />
      </div>
    </button>
  );
};
export default Button;
