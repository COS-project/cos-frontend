//게시판 종류
import { atom } from 'recoil';

import { PostType } from '@/types/community/type';

export const totalSearchResultsAtom = atom<PostType[]>({
  key: 'totalSearchResultsAtom',
  default: [],
});
