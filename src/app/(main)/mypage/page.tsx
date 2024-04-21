'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userProfile } from '@/types/global';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import NavBar from '@/components/common/NavBar';

export default function MyPage() {
  const { userProfile, isLoading, isError } = useGetUserProfile();

  // 모든 자격증 리스트 불러오는 함수
  const getUserProfile = useCallback(async () => {
    return userProfile;
  }, []);

  useEffect(() => {
    if (userProfile) {
      // console.log('데이터는 들어온다1'); <왜출력안되는거징
      getUserProfile();
    }
  }, []);

  return (
    <>
      <div className="w-full flex justify-start items-center mx-2">
        <img
          src={userProfile ? userProfile.profileImage : '없'}
          className="w-16 h-16 bg-gray4 object-cover rounded-full"
        />
        <span className="text-h4 ml-3">
          {userProfile ? userProfile.nickname : '없지롱'}
          {/*프로필 설정화면으로 이동*/}
          <a href="mypage/profileSetting">{'>'}</a>
        </span>
      </div>
      <div className="w-full mt-3 flex justify-between mx-2">
        <div className="font-bold">나의 관심 종목</div>
        <button className="text-h6 text-gray3">변경 {'>'}</button>
      </div>
      <div className="w-full flex justify-between mt-3 mx-2 overflow-hidden">
        <div className="px-3 py-4 rounded-lg text-white text-h7 bg-primary">컴퓨터 활용능력 2급</div>
        <div className="px-3 py-4 rounded-lg text-white text-h7 bg-primary">컴퓨터 활용능력 2급</div>
        <div className="px-3 py-4 rounded-lg text-white text-h7 bg-primary">컴퓨터 활용능력 2급</div>
      </div>
      {/* 전체적인 틀 */}
      <div className="w-full bg-gray1  mx-2 mt-3 px-3 py-3">
        {/* 게시판 */}
        <div className="w-full bg-white rounded-md mt-3 py-3">
          <div className="text-h6 px-2">게시판</div>
          <button className="w-[95%] flex justify-between text-h6 mx-2 mt-2 px-2 py-3 rounded-lg bg-gray0 text-gray4">
            내가 작성한 글<div>{'>'}</div>
          </button>
          <button className="w-[95%] flex justify-between text-h6 mx-2 mt-2 px-2 py-3 rounded-lg bg-gray0 text-gray4">
            내가 작성한 댓글<div>{'>'}</div>
          </button>
        </div>
        {/* 알림설정 */}
        <div className="w-full bg-white rounded-md mt-3 py-3">
          <div className="text-h6 px-2">설정</div>
          <button className="w-[95%] flex justify-between text-h6 mx-2 mt-2 px-2 py-3 rounded-lg bg-gray0 text-gray4">
            알림설정 <div>{'>'}</div>
          </button>
        </div>
        {/* 계정관리 */}
        <div className="w-full bg-white rounded-md mt-3 py-3">
          <div className="text-h6 px-2">계정관리</div>
          <button className="w-[95%] flex justify-between text-h6 mx-2 mt-2 px-2 py-3 rounded-lg bg-gray0 text-gray4">
            로그아웃 <div>{'>'}</div>
          </button>
          <button className="w-[95%] flex justify-between text-h6 mx-2 mt-2 px-2 py-3 rounded-lg bg-gray0 text-gray4">
            탈퇴하기 <div>{'>'}</div>
          </button>
        </div>
        {/* 기타 */}
        <div className="w-full bg-white rounded-md mt-3 py-3">
          <div className="text-h6 px-2">기타</div>
          <button className="w-[95%] flex justify-between text-h6 mx-2 mt-2 px-2 py-3 rounded-lg bg-gray0 text-gray4">
            문의하기 <div>{'>'}</div>
          </button>
          <button className="w-[95%] flex justify-between text-h6 mx-2 mt-2 px-2 py-3 rounded-lg bg-gray0 text-gray4">
            약관 및 개인정보 처리 <div>{'>'}</div>
          </button>
          <button className="w-[95%] flex justify-between text-h6 mx-2 mt-2 px-2 py-3 rounded-lg bg-gray0 text-gray4">
            앱버전 <div>{'1.1.23.1'}</div>
          </button>
        </div>
      </div>
      <NavBar />
    </>
  );
}
