'use client';

import React from 'react';

import MyPageHeader from '@/components/mypage/MyPageHeader';
import MyPageItem from '@/components/mypage/MyPageItem';
import {
  accountManagementContents,
  alarmContents,
  boardContents,
  etcContents,
  goalContents,
} from '@/utils/mypage/ItemContents';

export default function MyPage() {
  return (
    <>
      <div className={'flex flex-col gap-y-6 bg-gray0 min-h-screen'}>
        <MyPageHeader />
        <div className={'mx-5 flex flex-col gap-y-3'}>
          <MyPageItem contents={boardContents} category={'게시판'} />
          <MyPageItem contents={goalContents} category={'목표'} />
          <MyPageItem contents={alarmContents} category={'설정'} />
          <MyPageItem contents={accountManagementContents} category={'계정관리'} />
          <MyPageItem contents={etcContents} category={'기타'} />
        </div>
      </div>
    </>
  );
}
