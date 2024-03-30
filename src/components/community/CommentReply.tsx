//커뮤니티 대댓글
//api 연결하면서 pops부분 수정 예정
'use client';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import CommentContent from './CommentContent';
import CommunityProfile from './CommunityProfile';

interface Props {}

const CommentReply = (props: Props) => {
  //const {} =props;
  return (
    <div className="pb-3 pl-[48px]">
      <CommunityProfile fontsizing={true} date={'23.10.08'} time={'16:30'}>
        hongu90
      </CommunityProfile>
      <CommentContent
        reply={false}
        ddabonhNumber={9}
        content="블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라"></CommentContent>
    </div>
  );
};
export default CommentReply;
