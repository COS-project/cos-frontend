'use client';
import React, { SVGProps, useState } from 'react';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import LogoutModal from '@/components/mypage/LogoutModal';
import MyPageHeader from '@/components/mypage/MyPageHeader';
import MyPageItem from '@/components/mypage/MyPageItem';
import UnRegisterModal from '@/components/mypage/UnRegisterModal';
import StopWatchActiveButton from '@/components/stopwatch/StopWatchActiveButton';
import { boardContents } from '@/utils/mypage/ItemContents';

export default function MyPage() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isUnRegisterModalOpen, setIsUnRegisterModalOpen] = useState<boolean>(false);

  return (
    <div className={'bg-gray0'}>
      {isLogoutModalOpen ? (
        <LogoutModal isLogoutModalOpen={isLogoutModalOpen} setIsLogoutModalOpen={setIsLogoutModalOpen} />
      ) : null}
      {isUnRegisterModalOpen ? (
        <UnRegisterModal
          isUnRegisterModalOpen={isUnRegisterModalOpen}
          setIsUnRegisterModalOpen={setIsUnRegisterModalOpen}
        />
      ) : null}
      <Header />
      <div className={'h-[83px]'} />
      <div className={'flex flex-col gap-y-6 min-h-screen border-t-[1px] border-t-gray1'}>
        <MyPageHeader />
        <div className={'h-[240px]'} />
        <div className={'mx-5 flex flex-col gap-y-3'}>
          {/* 게시판 */}
          <MyPageItem contents={boardContents} category={'게시판'} />
          {/* 설정 */}
          {/*<MyPageItem contents={alarmContents} category={'설정'} />*/}
          {/* 계정관리 */}
          <div className={'flex flex-col gap-y-3 bg-white rounded-[24px] p-4'}>
            <div className={'text-h6 text-gray4'}>계정관리</div>
            <div className={'flex flex-col gap-y-2'}>
              <div
                onClick={() => {
                  setIsLogoutModalOpen(!isLogoutModalOpen);
                }}
                className={'px-5 py-5 flex justify-between bg-gray0 rounded-[16px] cursor-pointer'}>
                <div className={'text-h6'}>로그아웃</div>
                <MoveIcon />
              </div>
              <div
                onClick={() => {
                  setIsUnRegisterModalOpen(!isUnRegisterModalOpen);
                }}
                className={'px-5 py-5 flex justify-between bg-gray0 rounded-[16px] '}>
                <div className={'text-h6'}>탈퇴하기</div>
                <MoveIcon />
              </div>
            </div>
          </div>
          {/* 기타 */}
          {/*<MyPageItem contents={etcContents} category={'기타'}></MyPageItem>*/}
        </div>
      </div>
      <StopWatchActiveButton />
      <NavBar />
    </div>
  );
}

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#9E9FA1" strokeLinecap="round" strokeLinejoin="round" d="m7.5 5.5 5 5-5 5" />
  </svg>
);
