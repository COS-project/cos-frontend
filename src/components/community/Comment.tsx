//커뮤니티 댓글

'use client';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import CommentContent from './CommentContent';
import { PostComments } from '@/types/global';
import { format } from 'date-fns';
import CommunityProfile from './CommunityProfile';

interface Props {
  onClick: () => void; //답글달기 버튼 클릭 시 동작
  info: PostComments; //하위 컴포넌트에 넘겨줄 데이터
  profileModal?: () => void; //프로필의 ...버튼 클릭 시 동작
  DdabongClick?: () => void; //추천버튼 클릭 시 동작
}

const Comment = (props: Props) => {
  const { onClick, info, profileModal, DdabongClick } = props;
  return (
    <div className="py-5">
      <CommunityProfile
        fontsizing={false} //폰트 사이즈를 크게 함
        date={format(info.createdAt, 'yy.MM.dd')}
        time={format(info.createdAt, 'HH:mm')}
        imgSrc={info.user.profileImage}
        onClick={profileModal}>
        {/* ...버튼 클릭 시 동작 */}
        {info.user.nickname}
      </CommunityProfile>
      <CommentContent
        reply={true} //답글달기 유무
        onClick={onClick} //답글달기 버튼 클릭 시 동작
        ddabonhNumber={info.likeCount} //댓글 좋아요 수
        content={info.content} //내용
        isLike={info.isLiked} //사용자 좋아요 클릭 여부
        DdabongClick={DdabongClick}>
        {/* 좋아요 버튼 클릭 시 동작 */}
      </CommentContent>
    </div>
  );
};
export default Comment;
