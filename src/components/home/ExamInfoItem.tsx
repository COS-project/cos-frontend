'use client';

import { string } from 'prop-types';
import React from 'react';

import { CertificateInfoType } from '@/types/global';

// @ts-ignore
interface ExamInfoItemProps {
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  content: string | Object;
}
const ExamInfoItem: React.FC<ExamInfoItemProps> = ({ Icon, title, content }) => {
  return (
    <div className="p-4 rounded-[32px] bg-white">
      <div className="flex gap-x-1">
        <Icon />
        <div className="text-h3 font-semibold">{title}</div>
      </div>
      <div className="h-[1px] bg-gray1 my-2"></div>
      <div className="text-h4">
        {Object.entries(content).map(([key, value]) => {
          return value.length == 1 ? value : <div>{value}</div>;
        })}
      </div>
    </div>
  );
};
export default ExamInfoItem;
