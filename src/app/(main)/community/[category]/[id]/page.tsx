'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Comment from '@/components/community/Comment';
import CommentBar from '@/components/community/CommentBar';
import CommentReply from '@/components/community/CommentReply';
import CommentWriting from '@/components/community/CommentWriting';
import CommunityNav from '@/components/community/CommunityNav';
import CommunityPost from '@/components/community/CommunityPost';
import CommunityProfile from '@/components/community/CommunityProfile';
import CommunityTag from '@/components/community/CommunityTag';

export default function CommunityDetailPage() {
  const [replyOnOff, setReplyOnOff] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  //2023년 반복으로 작성한 부분은 api연결하면서 map으로 바꾸겠습니다!

  const onOff = () => {
    setReplyOnOff(!replyOnOff);
  };

  return (
    <div className="mb-[100px]">
      <CommunityNav Icon={false}>해설 게시판</CommunityNav>
      <div className="pt-[21px]"></div>
      <div className="mx-[20px]">
        <CommunityProfile fontsizing={true} date={'23.10.08'} time={'16:30'}>
          hongu90
        </CommunityProfile>
        <div className="pb-[16px]"></div>
        <div className="justify-start items-start gap-2 inline-flex">
          <CommunityTag>2023년</CommunityTag>
          <CommunityTag>2023년</CommunityTag>
          <CommunityTag>2023년</CommunityTag>
        </div>
        <CommunityPost
          subject={'23번 꿀팁 가져가세요!!'}
          content={
            '데이터 베이스는 관계형 데이터 베이스가 있는데블라블라블라블라블라블라블라블라라블라블라블라블라블라라블라블라블라블라블라라블라블라블라블라블라라블라블라블라블라블라라블라블라블라블라블라라블라블라블라블라블라라블라블라블'
          }></CommunityPost>
        <CommentBar empathy={13} comment={36}></CommentBar>
        <CommentWriting></CommentWriting>
        <div className="h-2"></div>
        <Comment onClick={onOff}></Comment>
        <CommentReply></CommentReply>
        <CommentReply></CommentReply>
        {replyOnOff ? (
          <div>
            <CommentWriting padding="pl-[48px]"></CommentWriting>
          </div>
        ) : null}
        <Comment onClick={onOff}></Comment>
      </div>
    </div>
  );
}
