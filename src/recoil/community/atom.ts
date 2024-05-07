'use client';

import { extend } from 'dayjs';
import { atom } from 'recoil';

import { CreatePostDataType, EditPostDataType, PopularSearchKeyword, RecentSearchResult } from '@/types/community/type';
import SubjectList from '@/components/exam/SubjectList';
import { SubjectResultRequests, UserAnswerRequests } from '@/types/global';

export const imagePreviewsState = atom<string[]>({
  key: 'imagePreviewsState',
  default: [],
});

export const imageUrlListState = atom<File[]>({
  key: 'imageUrlListState',
  default: [],
});

export const pastImageUrlsState = atom<string[]>({
  key: 'pastImageUrlsState',
  default: [],
});

export const createPostDataState = atom<CreatePostDataType>({
  key: 'createPostDataState',
  default: {
    title: '제목',
    content: '내용',
    tags: [],
    examYear: 2023,
    round: 1,
    questionSequence: 0,
  },
});

export const editPostDataState = atom<EditPostDataType>({
  key: 'editPostDataState',
  default: {
    postId: 0,
    title: '제목',
    content: '내용',
  },
});

//검색 키워드 자동완성 데이터
export const autoCompleteSearchKeywordState = atom<string>({
  key: 'autoCompleteSearchKeywordState',
  default: '',
});

//최근 검색 기록
export const recentSearchResultState = atom<RecentSearchResult>({
  key: 'recentSearchResultState',
  default: {
    keyword: '',
    createdAt: '',
  },
});

//최근 검색 기록
export const popularSearchKeywordState = atom<PopularSearchKeyword[]>({
  key: 'popularSearchKeywordState',
  default: [],
});
