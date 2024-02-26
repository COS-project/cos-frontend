export interface YearsAndRounds {
  2017: number[];
  2018: number[];
  2019: number[];
  2020: number[];
  2021: number[];
  2022: number[];
  2023: number[];
}

export interface PostDataType {
  title: string;
  content: string;
  tags?: TipPostTagType[];
  examYear: number;
  round: number;
  questionSequence?: number;
}
interface TipPostTagType {
  tagType: string;
  tagName: string;
}
