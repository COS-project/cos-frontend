import { ItemType } from '@/types/mypage/type';

export const boardContents: ItemType[] = [
  { title: '내가 작성한 글', path: '/mypage/writing' },
  { title: '내가 작성한 댓글', path: '/mypage/comment' },
];

export const alarmContents: ItemType[] = [{ title: '알림설정', path: '/home/goal-setting' }];
export const etcContents: ItemType[] = [
  { title: '약관 및 개인정보 처리', path: '/mypage/etc' },
  { title: '앱버전', version: 0.1 },
];
