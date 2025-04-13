import 'react-loading-skeleton/dist/skeleton.css';

import { SVGProps } from 'react';
import * as React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonYearSelector = () => {
  return (
    <div className="mt-2 flex justify-between items-center w-full py-3 px-4 bg-gray0 rounded-[16px] overflow-hidden relative">
      <Skeleton height={20} width={154} borderRadius={8} />
      <DisableIcon />
    </div>
  );
};

export default SkeletonYearSelector;

const DisableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path stroke="#000" strokeLinecap="round" d="m13.5 8.5-3.5 3-3.5-3" />
  </svg>
);
