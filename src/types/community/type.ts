import React from 'react';

import { UserInfo } from '@/types/mypage/type';
import { QuestionsResponse } from '@/types/global';

export type BoardType = 'REVIEW' | 'COMMENTARY' | 'TIP' | 'NORMAL';

export interface YearsAndRounds {
  2017: number[];
  2018: number[];
  2019: number[];
  2020: number[];
  2021: number[];
  2022: number[];
  2023: number[];
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

export interface RecommendTags {
  tagType: string;
  tagName: string;
}

export interface DateTime {
  createdAt: string;
  modifiedAt: string;
}
