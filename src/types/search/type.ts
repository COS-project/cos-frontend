export interface TrendingKeywordType {
  rank: number;
  keyword: string;
  status: string;
}

/**
 * 자동 완성 검색어 조회
 */
export interface AutoCompleteSearchKeywordsResponseType {
  responseCode: string;
  message: string;
  result: string[];
}
