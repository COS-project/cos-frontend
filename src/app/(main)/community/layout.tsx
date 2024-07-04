'use client';

import { useRecoilState } from 'recoil';
import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import { layoutState } from '@/recoil/atom';
import CommunityNav from '@/components/community/CommunityNav';
import { commentModalState, postingModalState } from '@/recoil/community/atom';
import PostingModal from '@/components/community/PostingModal';

export default function layout({ children }: { children: React.ReactNode }) {
  const [onPostModal, setOnPostModal] = useRecoilState(postingModalState);
  const [onCommentModal, setOnCommentModal] = useRecoilState(commentModalState);

  return (
    <div>
      {onPostModal ? ( //글 삭제 및 수정 모달창
        <PostingModal editOnOff={true} afterDelete="/community/Comhwal_level1/">
          글 메뉴
        </PostingModal>
      ) : null}
      {/* 댓글 삭제 모달창 */}
      {onCommentModal ? <PostingModal editOnOff={false}>댓글 메뉴</PostingModal> : null}
      
      {/*<Header />*/}
      {children}
      {/*<NavBar />*/}
    </div>
  );
}
