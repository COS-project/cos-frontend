import React from 'react';

import { FavoriteBoard, MockExam, Post, PostComments, QuestionsResponse } from '@/types/global';
import { UserInfo } from '@/types/mypage/type';

export type BoardType = 'REVIEW' | 'COMMENTARY' | 'TIP' | 'NORMAL';

export type SortDirections = 'DESC' | 'ASC';

export type ExamReviewPostType = {
  examDifficulty: string;
  content: string;
};

export interface LikeStatusResponseType {
  responseCode: string;
  result: boolean;
}

export interface MockExamsYearResponseType {
  responseCode: string;
  result: number[];
}

export interface MockExamsByYearResponseType {
  responseCode: string;
  result: MockExam[];
}

export interface CreatePostDataType {
  title: string;
  content: string;
  tags?: TipPostTagType[];
  examYear?: number;
  round?: number;
  questionSequence?: number;
}
export interface TipPostTagType {
  tagType: string;
  tagName: string;
}

export interface EditPostDataType {
  postId: number;
  title: string;
  content: string;
  tags?: TipPostTagType[];
  examYear?: number;
  round?: number;
  questionSequence?: number;
  removeImageIds?: number[];
}

export interface RecentSearchResult {
  keyword: string;
  createdAt: string;
}

export interface PopularSearchKeyword {
  sequence: number;
  keyword: string;
  icon: React.JSX.Element;
}

/**
 ************ post Detail *************
 */

export interface ResponsePostType {
  content: PostType[];
  postComments: PostComments[];
  hasNext: boolean;
}

export interface PostType {
  postId: number;
  postContent: PostContent;
  postImages: string[];
  user: UserInfo;
  question?: QuestionsResponse; //해설
  recommendTags?: RecommendTags[]; //꿀팁
  dateTime: DateTime;
  likeStatus: boolean;
  likeCount: number;
  commentCount: number;
}

export interface PostContent {
  title: string;
  content: string;
  images: Image[];
}

export interface Image {
  id: number;
  imageUrl: string;
}

export interface ReviewPost {
  examDifficulty: ExamDifficulty;
  prepareMonths: number;
  content: string;
  user: UserInfo;
  createdAt: string;
}

export type ExamDifficulty = 'TOO_EASY' | 'EASY' | 'NORMAL' | 'TOO_DIFFICULT' | 'LITTLE_DIFFICULT';

export interface ResponseReviewPost {
  content: ReviewPost[];
  hasNext: boolean;
}

export interface RecommendTags {
  tagType: string;
  tagName: string;
}

export interface DateTime {
  createdAt: string;
  modifiedAt?: string;
}

export type TrendingKeywordState = 'UNCHANGED' | 'NEW' | 'RANK_UP' | 'RANK_DOWN';
export interface TrendingKeyword {
  keyword: string;
  status: TrendingKeywordState;
}

export interface PreparePeriodType {
  startMonth: number | undefined;
  endMonth: number | undefined;
}

/**
 * 게시판 목록 보기
 */
export interface BoardListResponseType {
  responseCode: string;
  message: string;
  result: FavoriteBoard[];
}

// 정렬 Type
export type SortFieldType = 'createdAt' | 'count';
export type SortFieldKorType = '최신순' | '인기순';

// 게시글 상세
export interface ResponsePostDetailType {
  postResponse: Post;
  postComments: PostComments[];
}
