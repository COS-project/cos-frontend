import React from 'react';

import { MockExam, QuestionsResponse } from '@/types/global';
import { UserInfo } from '@/types/mypage/type';

export type BoardType = 'REVIEW' | 'COMMENTARY' | 'TIP' | 'NORMAL';

export type SortDirections = 'DESC' | 'ASC';

export type ExamReviewPostType = {
  examDifficulty: string;
  content: string;
};

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
  newTags?: TipPostTagType[];
  examYear?: number;
  round?: number;
  questionSequence?: number;
  removeImageUrls?: string[];
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
  responseCode: string;
  result: {
    content: PostType[];
    hasNext: boolean;
  };
}

export interface PostType {
  postId: number;
  postContent: PostContent;
  postStatus: PostStatus;
  user: UserInfo;
  recommendTags?: RecommendTags[]; //꿀팁
  question?: QuestionsResponse; //해설
  dateTime: DateTime;
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

export interface PostStatus {
  postType: string;
  likeCount: number;
  commentCount: number;
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
  responseCode: string;
  result: {
    content: ReviewPost[];
  };
  hasNext: boolean;
}

export interface RecommendTags {
  tagType: string;
  tagName: string;
}

export interface DateTime {
  createdAt: string;
  modifiedAt: string;
}

export type TrendingKeywordState = 'UNCHANGED' | 'NEW' | 'RANK_UP' | 'RANK_DOWN';
export interface TrendingKeyword {
  keyword: string;
  status: TrendingKeywordState;
}

export interface PerparePeriodType {
  startMonth: number | undefined;
  endMonth: number | undefined;
}
