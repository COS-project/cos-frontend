import { motion } from 'framer-motion';
import React, { Dispatch, SetStateAction } from 'react';
import { KeyedMutator } from 'swr';

import { deleteComment } from '@/lib/api/communityPost';
import { ResponseType } from '@/types/common/type';
import { ResponsePostDetailType } from '@/types/community/type';

interface Props {
  commentId: number;
  setCommentIsOptionModal: Dispatch<React.SetStateAction<boolean>>;
  setIsReportSubmittedModalOpen: Dispatch<SetStateAction<boolean>>;
  communityPostDataMutate: KeyedMutator<ResponseType<ResponsePostDetailType>>; // communityPostData를 바로 불러오는 mutate함수
}

const CommentOptionModal = (props: Props) => {
  const { commentId, setCommentIsOptionModal, setIsReportSubmittedModalOpen, communityPostDataMutate } = props;
  return (
    <div
      className={'fixed left-0 right-0 z-50 flex flex-col gap-y-2 justify-end bg-[rgba(0,0,0,0.6)] px-5 min-h-screen'}>
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
                setIsReportSubmittedModalOpen(true);
                setCommentIsOptionModal(false);
              }}
              className={
                'py-[17px] text-h3 font-pre font-normal text-black leading-normal tracking-[-0.09px] text-center border-b border-gray0'
              }>
              신고하기
            </button>
            <button
              onClick={() => {
                deleteComment(commentId).then(() => {
                  communityPostDataMutate();
                  setCommentIsOptionModal(false);
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
              setCommentIsOptionModal(false);
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
export default CommentOptionModal;
