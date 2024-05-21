export interface ItemType {
  title: string;
  path: string;
}

export type DifficultyType = '' | '어려워요' | '조금 어려워요' | '보통이에요' | '쉬워요' | '너무 쉬워요';

export interface UserInfo {
  userId: number;
  nickname: string;
  email: string;
  profileImage: string;
}
