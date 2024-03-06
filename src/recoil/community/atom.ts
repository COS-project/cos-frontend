'use client';

import { atom } from 'recoil';

import { SubjectResultRequests, UserAnswerRequests } from '@/types/global';
import { extend } from 'dayjs';
import SubjectList from '@/components/exam/SubjectList';
import { PostDataType } from '@/types/community/type';

export const imagePreviewsState = atom<string[]>({
  key: 'imagePreviewsState',
  default: [],
});

export const imageUrlListState = atom<File[]>({
  key: 'imageUrlListState',
  default: [],
});

export const postDataState = atom<PostDataType>({
  key: 'postDataState',
  default: {
    title: '제목',
    content: '내용',
    tags: [],
    examYear: 2023,
    round: 1,
    questionSequence: 0,
  },
});
