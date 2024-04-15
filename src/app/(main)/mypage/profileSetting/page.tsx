'use client';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';

export default function ProfileSetting() {
  const { userProfile, isLoading, isError } = useGetUserProfile();
  const [id, setId] = useState('');
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
      <div className="w-full h-[60px] flex justify-center items-center py-3">
        <div className="text-h4 font-bold">{'<'}</div>
        <div className="text-h6"> 프로필 변경 </div>
      </div>

      <div className=" bg-gray0">
        <div className="flex justify-center">
          <img
            src={userProfile ? userProfile.profileImage : '없'}
            className="w-16 h-16 bg-gray4 object-cover rounded-full"
          />
          <button></button>
        </div>
        <form>
          <div className="mt-[30px]">이름</div>
          <input type="text" className="rounded-xl bg-white text-black font-bold" placeholder={userProfile.userId} />
          <div className="mt-[30px]">닉네임</div>
          <input type="text" className="rounded-xl bg-white text-black font-bold" placeholder={userProfile.nickname} />
        </form>
      </div>

      <div className="border rounded-t-xl bg-primary font-bold text-white text-center">완료</div>
    </>
  );
}
