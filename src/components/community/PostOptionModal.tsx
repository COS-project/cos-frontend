import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';

import { deletePost } from '@/lib/api/communityPost';

interface Props {
  communityId: string | string[];
  postId: number;
  setPostIsOptionModal: Dispatch<React.SetStateAction<boolean>>;
  setIsClickEditPost: Dispatch<SetStateAction<boolean>>;
}

const PostOptionModal = (props: Props) => {
  const { setPostIsOptionModal, communityId, postId, setIsClickEditPost } = props;
  const router = useRouter();
  return (
    <div
      className={
        'absolute left-0 right-0 z-50 flex flex-col gap-y-2 justify-end bg-[rgba(0,0,0,0.6)] px-5 min-h-screen'
      }>
      <motion.div
        className={'relative'}
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 200, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
        <div className={'absolute w-full flex flex-col gap-y-2 bottom-[32px]'}>
          <div className={'flex flex-col rounded-[16px] bg-white'}>
            <div
              className={
                'py-2 text-h6 font-pre font-normal text-gray4 leading-[27px] tracking-[-0.36px] text-center border-b border-gray0'
              }>
              글 메뉴
            </div>
            <button
              onClick={() => {
                setIsClickEditPost(true);
                setPostIsOptionModal(false);
              }}
              className={
                'py-[17px] text-h3 font-pre font-normal text-black leading-normal tracking-[-0.09px] text-center border-b border-gray0'
              }>
              수정하기
            </button>
            <button
              className={
                'py-[17px] text-h3 font-pre font-normal text-black leading-normal tracking-[-0.09px] text-center border-b border-gray0'
              }>
              신고하기
            </button>
            <button
              onClick={() => {
                deletePost(postId).then(() => {
                  setPostIsOptionModal(false);
                  router.push(`/community/${communityId}`);
                });
              }}
              className={
                'py-[17px] text-h3 font-pre font-normal text-black leading-normal tracking-[-0.09px] text-center border-b'
              }>
              삭제하기
            </button>
          </div>

          <button
            onClick={() => {
              setPostIsOptionModal(false);
            }}
            className={'rounded-[16px] bg-white h-[56px]'}>
            <p
              className={
                'text-second text-center font-pre text-[18px] not-italic font-semibold leading-[27px] tracking-[-0.36px]'
              }>
              취소
            </p>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default PostOptionModal;
