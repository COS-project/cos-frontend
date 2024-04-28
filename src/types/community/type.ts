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
