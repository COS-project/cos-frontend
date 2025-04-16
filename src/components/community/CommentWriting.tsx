//댓글 입력하는 칸
//link부분 수정 필요함
'use client';

import Image from 'next/image';
import React, { FormEvent, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { KeyedMutator } from 'swr';

import { postCommentData } from '@/lib/api/communityPost';
import { GenerateCommentState } from '@/recoil/community/atom';
import { ResponseType } from '@/types/common/type';
import { ResponsePostDetailType } from '@/types/community/type';

interface Props {
  postId: number; //포스트 id
  communityPostDataMutate: KeyedMutator<ResponseType<ResponsePostDetailType>>; // communityPostData를 바로 불러오는 mutate함수
}

const CommentWriting = (props: Props) => {
  const { postId, communityPostDataMutate } = props;
  const [generateComment, setGenerateComment] = useRecoilState(GenerateCommentState);

  /**
   * form 형식 제출 함수
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    try {
      await postCommentData(postId, generateComment).then(() => {
        communityPostDataMutate();
      }); // API 호출
      setGenerateComment({ ...generateComment, content: '', parentCommentId: null });
    } catch (error) {
      console.error('댓글 제출 중 오류 발생:', error);
    }
  };

  return (
    <div className={'fixed bottom-0 bg-white flex flex-col px-5 w-full shadow-[0_-2px_10px_rgba(0,0,0,0.1)]'}>
      <form
        onSubmit={handleSubmit}
        className="mt-4 mb-3 w-full px-4 bg-gray0 rounded-2xl border border-white justify-between items-center inline-flex">
        <div
          contentEditable
          onInput={(e) => {
            const content = e.currentTarget.textContent || '';
            setGenerateComment({ ...generateComment, content: content });
          }}
          data-placeholder={
            generateComment.parentCommentId !== null ? '대댓글을 작성해주세요.' : '댓글을 작성해주세요.'
          }
          className="w-full min-h-[40px] max-h-[200px] overflow-y-auto outline-none placeholder:text-gray4 text-black text-[15px] font-['Pretendard Variable'] leading-snug bg-gray0 rounded-[12px] py-4 empty:before:content-[attr(data-placeholder)] empty:before:text-gray4"
        />
        <div className="w-10 h-10 relative">
          <button type="submit" className="w-10 h-10 left-0 top-0 absolute bg-indigo-600 grid place-content-center">
            <Image
              src="/community/SubmitButtonIcon.svg"
              alt="SubmitButtonIcon"
              width={40}
              height={40}
              style={{ width: 40, height: 40 }}
            />
          </button>
        </div>
      </form>
    </div>
  );
};
export default CommentWriting;
