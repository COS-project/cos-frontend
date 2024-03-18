//커뮤니티 < "게시판 이름" 검색 아이콘 Nav
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode; //게시판 이름
  Icon?: boolean; //검색아이콘 유무 true=검색아이콘o, false=검색아이콘x
  onClick?: () => void; //검색아이콘 클릭 시 경로(디자인 나오는 것 보고 수정 예정)
}

const CommunityNav = (props: Props) => {
  const router = useRouter();
  const { children, Icon, onClick } = props;
  return (
    <>
      <div className="px-[16px] w-full flex justify-between items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          fill="none"
          viewBox="0 0 33 33"
          onClick={() => router.back()}>
          <path stroke="#0D0E10" stroke-linecap="round" stroke-linejoin="round" d="m21.646 26.5-10-10 10-10" />
        </svg>
        <div className="text-neutral-950 text-base font-normal font-['Pretendard Variable'] leading-normal">
          {children}
        </div>
        {Icon ? ( //검색 아이콘
          <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="none" viewBox="0 0 33 33">
            <mask id="a" width="33" height="33" x="0" y="0" maskUnits="userSpaceOnUse" className="mask-type:alpha">
              <path fill="#D9D9D9" d="M.646.5h32v32h-32z" />
            </mask>
            <g mask="url(#a)">
              <path
                fill="#1C1B1F"
                d="m26.755 27.367-8.473-8.474a6.975 6.975 0 0 1-2.306 1.349 7.803 7.803 0 0 1-2.64.468c-2.128 0-3.929-.735-5.402-2.206-1.474-1.471-2.211-3.266-2.211-5.384 0-2.119.735-3.915 2.206-5.389 1.471-1.474 3.265-2.21 5.383-2.21s3.917.735 5.397 2.207c1.48 1.472 2.22 3.267 2.22 5.385 0 .919-.164 1.816-.492 2.692a7.227 7.227 0 0 1-1.347 2.28l8.479 8.45-.814.832Zm-13.424-7.785c1.815 0 3.346-.623 4.596-1.87 1.25-1.246 1.874-2.778 1.874-4.597 0-1.818-.624-3.35-1.874-4.597-1.25-1.246-2.781-1.87-4.596-1.87-1.817 0-3.351.624-4.603 1.87-1.251 1.247-1.877 2.78-1.877 4.597 0 1.819.626 3.351 1.877 4.597 1.252 1.247 2.786 1.87 4.603 1.87Z"
              />
            </g>
          </svg>
        ) : (
          <div className="w-[32px] h-[32px]"></div>
          // 공간 구분을 위한 투명 박스
        )}
      </div>
    </>
  );
};
export default CommunityNav;
