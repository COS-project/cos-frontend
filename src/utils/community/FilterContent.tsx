import { PerparePeriodType } from '@/types/community/type';

export const filterNormalAndTipContent: string[] = ['최신순', '인기순'];

export const examDifficulty: string[] = ['전체', '어려워요', '조금 어려워요', '보통이에요', '쉬워요', '매우 쉬워요'];

export const PerparePeriod: PerparePeriodType[] = [
  { startMonth: undefined, endMonth: undefined },
  { startMonth: 0, endMonth: 3 },
  { startMonth: 4, endMonth: 6 },
  { startMonth: 7, endMonth: 9 },
  { startMonth: 10, endMonth: 12 },
  { startMonth: 12, endMonth: 0 },
  { startMonth: 24, endMonth: 0 },
  { startMonth: 36, endMonth: 0 },
];
