//커뮤니티 대댓글
'use client';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import CommentContent from './CommentContent';
import { PostComments } from '@/types/global';
import { format } from 'date-fns';
import CommunityProfile from './CommunityProfile';

interface Props {
  info: PostComments; //댓글 정보
  profileModal?: () => void; //댓글 삭제 모달 창 띄울 때 동작
  DdabongClick?: () => void; //좋아요 버튼 클릭 시 동작
}

const CommentReply = (props: Props) => {
  const { info, profileModal, DdabongClick } = props;
  return (
    <div className="pb-3 pl-[48px]">
      <CommunityProfile
        fontsizing={true}
        date={format(info.createdAt, 'yy.MM.dd')}
        time={format(info.createdAt, 'HH:mm')}
        imgSrc={info.user.profileImage}
        onClick={profileModal}>
        {info.user.nickname}
      </CommunityProfile>
      <CommentContent
        reply={false} //답글달기 부분 삭제
        ddabonhNumber={info.likeCount}
        content={info.content}
        DdabongClick={DdabongClick}></CommentContent>
    </div>
  );
};
export default CommentReply;
