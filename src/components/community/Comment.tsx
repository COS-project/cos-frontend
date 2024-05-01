//커뮤니티 댓글
////api 연결하면서 pops부분 수정 예정

'use client';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import CommentContent from './CommentContent';
import CommunityProfile from './CommunityProfile';

interface Props {
  onClick: () => void;
}

const Comment = (props: Props) => {
  const { onClick } = props;
  return (
    <div className="py-5">
      <CommunityProfile fontsizing={false} date={'23.10.08'} time={'16:30'}>
        hongu90
      </CommunityProfile>
      <CommentContent
        reply={true}
        onClick={onClick}
        ddabonhNumber={9}
        content="블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라"></CommentContent>
    </div>
  );
};
export default Comment;
