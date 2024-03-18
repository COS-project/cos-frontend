'use client';

import { atom } from 'recoil';

import { GenerateComment, Post } from '@/types/global';

//글 삭제 및 수정 모달창 조작
export let postingModalState = atom<boolean>({
  key: 'postingModalState',
  default: false,
});

//댓글 삭제 모달창 조작
export let commentModalState = atom<boolean>({
  key: 'commentModalState',
  default: false,
});

//댓글 삭제
export let commentDeleteState = atom<number>({
  key: 'commentDeleteState',
  default: 0,
});

//글 삭제
export let postDeleteState = atom<number>({
  key: 'postDeleteState',
  default: 0,
});

//댓글 생성
export let GenerateCommentState = atom<GenerateComment>({
  key: 'GenerateCommentState',
  default: {
    parentCommentId: null,
    content: '',
  },
});
