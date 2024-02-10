//커뮤니티 프로필
//닉네임 폰트 크기 설정
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  children?: React.ReactNode; //회원 닉네임
  onClick?: () => void; //...눌렀을 때 동작
  fontsizing: boolean; //닉네임 폰트 사이즈 조절 false=14px true=16px
  date: string; //댓글 작성 날짜
  time: string; //댓글 작성 시간
}

const CommunityProfile = (props: Props) => {
  const router = useRouter();
  const { children, onClick, fontsizing, date, time } = props;
  return (
    <>
      <div className="w-full h-10 justify-start items-center gap-2 inline-flex">
        <img className="cursor-pointer w-10 h-10 rounded-[999px]" src="https://via.placeholder.com/40x40" />
        <div className="grow shrink basis-0 h-[38px] justify-between items-center flex">
          <div className="flex-col justify-center items-start inline-flex">
            {fontsizing ? (
              <div //font 14px
                className="text-h6 font-semibold font-['Pretendard Variable'] leading-[21px] text-gray4">
                {children}
              </div>
            ) : (
              //font 16px
              <div className="text-h4 font-semibold font-['Pretendard Variable'] leading-[21px] text-gray4">
                {children}
              </div>
            )}
            <div className="justify-start items-center gap-2 inline-flex">
              <div className="text-gray3 text-neutral-400 text-sm font-normal font-['Pretendard Variable']">{date}</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="2" height="14" fill="none" viewBox="0 0 2 14">
                <path fill="#E4E5E7" d="M.646 0h1v14h-1z" />
              </svg>
              <div className="text-gray3 text-neutral-400 text-sm font-normal font-['Pretendard Variable']">{time}</div>
            </div>
          </div>
          <svg //...아이콘
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="none"
            viewBox="0 0 25 25"
            onClick={onClick}
            className="cursor-pointer">
            <circle cx="12.646" cy="6.5" r="1" fill="#727375" />
            <circle cx="12.646" cy="12.5" r="1" fill="#727375" />
            <circle cx="12.646" cy="18.5" r="1" fill="#727375" />
          </svg>
        </div>
      </div>
    </>
  );
};
export default CommunityProfile;
