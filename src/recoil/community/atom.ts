'use client';
import { atom } from 'recoil';

import {
  BoardType,
  CreatePostDataType,
  EditPostDataType,
  ExamReviewPostType,
  SortFieldKorType,
} from '@/types/community/type';
import { GenerateComment, ImageType } from '@/types/global';

//게시판 종류
export const boardTypeStateAtom = atom<BoardType>({
  key: 'boardTypeStateAtom',
  default: 'REVIEW',
});

//게시판 종류
export const boardTypeInitAtom = atom<boolean>({
  key: 'boardTypeInitAtom',
  default: true,
});

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

export const imagePreviewsState = atom<string[]>({
  key: 'imagePreviewsState',
  default: [],
});

export const imageUrlListState = atom<File[]>({
  key: 'imageUrlListState',
  default: [],
});

export const pastImageUrlsState = atom<ImageType[]>({
  key: 'pastImageUrlsState',
  default: [],
});

export const createPostDataState = atom<CreatePostDataType>({
  key: 'createPostDataState',
  default: {
    title: '',
    content: '',
    tags: [],
    examYear: 0,
    round: 0,
    questionSequence: 0,
  },
});

export const editPostDataState = atom<EditPostDataType>({
  key: 'editPostDataState',
  default: {
    postId: 0,
    title: '제목',
    content: '내용',
    removeImageIds: [],
  },
});

//검색 키워드 자동완성 데이터
export const autoCompleteSearchKeywordState = atom<string>({
  key: 'autoCompleteSearchKeywordState',
  default: '',
});

//최근 검색 기록
export const recentSearchResultState = atom<string>({
  key: 'recentSearchResultState',
  default: '',
});

//해설 게시글 번호 검색
export const commentarySearchQuestionSequence = atom<number>({
  key: 'commentarySearchQuestionSequence',
  default: undefined,
});

export const examReviewPostState = atom<ExamReviewPostType>({
  key: 'examReviewPostState',
  default: {
    examDifficulty: '',
    content: '',
  },
});

//따끈후기 시험정보 입력 안할경우 생기는 에러
export const examReviewsCRT_003ErrorAtom = atom<boolean>({
  key: 'examReviewsCRT_003ErrorAtom',
  default: false,
});

export const examReviewsCRT_004ErrorAtom = atom<boolean>({
  key: 'examReviewsCRT_004ErrorAtom',
  default: false,
});

//꿀팁 게시글 더보기 누를때 인기순으로 정렬되도록 하는 atom
export const selectedNormalAndTipFilterContentAtom = atom<SortFieldKorType>({
  key: 'selectedNormalAndTipFilterContentAtom',
  default: '최신순',
});

export const selectedCommentaryYearFilterContentAtom = atom<number | string>({
  key: 'selectedCommentaryYearFilterContentAtom',
  default: '전체',
});

export const selectedCommentaryRoundFilterContentAtom = atom<number | string>({
  key: 'selectedCommentaryRoundFilterContentAtom',
  default: '전체',
});
