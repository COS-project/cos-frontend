'use client';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import CommunityNav from '@/components/community/CommunityNav';
import Button from '@/components/common/Button';

export default function ProfileSetting() {
  const { userProfile, isLoading, isError } = useGetUserProfile();
  const [nickname, setNickname] = useState('');

  //const handlerChangeId

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
      <CommunityNav Icon={false}>프로필 변경</CommunityNav>

      <div className=" bg-gray0">
        <div className="flex justify-center">
          <img
            src={userProfile ? userProfile.profileImage : '없'}
            className="w-16 h-16 bg-gray4 object-cover rounded-full"
          />
        </div>
        <div className="flex justify-center">
          <form>
            <div className="mt-[30px] font-bold">닉네임</div>
            <input
              type="text"
              className="rounded-xl px-2 py-1 bg-white font-bold placeholder-black placeholder"
              placeholder={userProfile != null ? userProfile.nickname : '닉네임'}
            />
          </form>
        </div>
        <button className="w-full px-2 py-2 rounded-t-2xl text-white bg-primary mt-10">완료</button>
      </div>

      {/*<Button>완료</Button>*/}
    </>
  );
}
