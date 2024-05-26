import React, { ReactNode } from 'react';

import { HeaderType } from '@/types/global';

interface Props {
  headerType?: HeaderType;
  title?: string;
  rightElement?: ReactNode;
}

export default function Header(props: Props) {
  const { headerType = 'static', title, rightElement } = props;

  const renderHeader = (headerType: HeaderType) => {
    switch (headerType) {
      case 'static':
        return (
          <>
            <Logo />
            <AlarmIcon />
          </>
        );
      case 'dynamic':
        return (
          <>
            <PrevArrow />
            <h1 className="text-black font-h1">{title}</h1>
            {rightElement ? rightElement : <div />}
          </>
        );

      default:
        break;
    }
  };

  return (
    <header className="bg-white flex sticky top-0 justify-between items-center px-4 py-2">
      {renderHeader(headerType)}
    </header>
  );
}

function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={26} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18.337 15.454c-.984 2.495-3.412 4.27-6.253 4.27-3.709 0-6.724-3.017-6.724-6.721s3.015-6.721 6.724-6.721c2.84 0 5.272 1.772 6.253 4.27h5.577C22.775 5.061 17.904.924 12.08.924 5.42.924 0 6.34 0 13c0 6.659 5.42 12.076 12.081 12.076 5.823 0 10.694-4.137 11.83-9.625h-5.577l.003.003z"
        fill="#2B2B2B"
      />
    </svg>
  );
}

function AlarmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10 28.648v-.939h2.239V16.715c0-1.72.615-3.229 1.847-4.525 1.231-1.296 2.78-2.09 4.645-2.38v-.67c0-.317.123-.586.37-.808A1.29 1.29 0 0119.995 8c.35 0 .65.11.9.332.248.222.373.491.373.808v.67c1.865.29 3.414 1.084 4.645 2.38 1.231 1.296 1.847 2.804 1.847 4.525V27.71H30v.939H10zM19.993 32c-.617 0-1.143-.197-1.579-.59-.435-.395-.653-.868-.653-1.421h4.478c0 .558-.22 1.033-.66 1.424-.44.392-.968.587-1.586.587zm-6.71-4.29h13.433V16.715c0-1.676-.653-3.1-1.959-4.274-1.306-1.173-2.891-1.76-4.757-1.76-1.866 0-3.451.587-4.758 1.76-1.305 1.173-1.958 2.598-1.958 4.274V27.71z"
        fill="#0D0E10"
      />
      <rect x={23} y={10} width={7} height={7} rx={3.5} fill="#3B3DFF" />
    </svg>
  );
}

const PrevArrow = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={33} height={32} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m21.646 26-10-10 10-10" />
  </svg>
);
