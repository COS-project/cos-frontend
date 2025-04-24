import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import React, { SVGProps } from 'react';
import { useRecoilValue } from 'recoil';

import { postReadAlarmList } from '@/lib/api/alarm';
import { certificateIdAtom } from '@/recoil/atom';
import { AlarmReceiverType, AlarmType } from '@/types/alarm/type';

interface Props {
  id: number;
  time: string;
  targetPostId?: number;
  type: AlarmType;
  receiver: AlarmReceiverType;
  setReadAlarmList: React.Dispatch<React.SetStateAction<number[]>>;
  likerNickname: string;
}
const AlarmItem = (props: Props) => {
  const { time, targetPostId, receiver, type, id, setReadAlarmList, likerNickname } = props;
  const certificateId = useRecoilValue(certificateIdAtom);
  const router = useRouter();

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = Date.now();
    const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
    if (diff < 60 * 1) {
      // 1분 미만일땐 방금 전 표기
      //TODO: 몊분 전
      return '방금 전';
    }
    if (diff < 60 * 60 * 24 * 7) {
      // 7일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
      return formatDistanceToNow(d, { addSuffix: true, locale: ko });
    }
    if (diff < 60 * 60 * 24 * 30 * 12) {
      // 1년, 1달 기준
      //TODO: 날짜로 나오게 하는게 좋을 것 같다.
      return formatDistanceToNow(d, { addSuffix: true, locale: ko });
    }
    if (diff > 60 * 60 * 24 * 30 * 12) {
      // 1년 넘어가면
      return format(d, 'yy.MM.dd'); // 날짜 포맷
    }
  };

  const switchAlarmType = (alarmType: AlarmType) => {
    switch (alarmType) {
      case 'NEW_LIKE_ON_POST':
        return (
          <div className={'flex flex-col gap-y-1'}>
            <div>
              {`${likerNickname}님이 `}
              <span className={'font-semibold'}>회원님의 글</span>
              {'을 좋아합니다.'}
            </div>
            <button
              className={'flex items-center text-h6 py-1 px-3 rounded-full border-[1px] border-gray2 w-fit'}
              onClick={() => {
                postReadAlarmList([id]);
                router.push(`/community/${certificateId}/${targetPostId}`);
              }}>
              게시글 이동하기
              <ArrowIcon />
            </button>
          </div>
        );
      case 'NEW_COMMENT_ON_POST':
        return (
          <div className={'flex flex-col gap-y-1'}>
            <div>
              <span className={'font-semibold'}>회원님의 글</span>
              {'에 누군가 댓글을 남겼습니다.'}
            </div>
            <button
              className={'flex items-center text-h6 py-1 px-3 rounded-full border-[1px] border-gray2 w-fit'}
              onClick={() => {
                postReadAlarmList([id]);
                router.push(`/community/${certificateId}/${targetPostId}`);
              }}>
              게시글 이동하기
              <ArrowIcon />
            </button>
          </div>
        );
      case 'NEW_LIKE_ON_COMMENT':
        return (
          <div className={'flex flex-col gap-y-1'}>
            <div>
              {`${likerNickname}님이 `}
              <span className={'font-semibold'}>회원님의 댓글</span>
              {'을 좋아합니다.'}
            </div>
            <button
              className={'flex items-center text-h6 py-1 px-3 rounded-full border-[1px] border-gray2 w-fit'}
              onClick={() => {
                postReadAlarmList([id]);
                router.push(`/community/${certificateId}/${targetPostId}`);
              }}>
              게시글 이동하기
              <ArrowIcon />
            </button>
          </div>
        );
      case 'BEFORE_APPLICATION':
        return (
          <div className={'flex flex-col gap-y-1'}>
            <div>시험 신청 하루 전날이에요.</div>
          </div>
        );
      case 'START_APPLICATION':
        return (
          <div className={'flex flex-col gap-y-1'}>
            <div>시험 신청이 시작되었어요. 자격증 시험에 신청해보세요.</div>
          </div>
        );
      case 'DEFAULT_DEADLINE':
        return (
          <div className={'flex flex-col gap-y-1'}>
            <div>시험 신청 마감 하루 전이에요. 서둘러 신청해보세요!</div>
          </div>
        );
    }
  };

  return (
    <div className={'flex flex-col gap-y-1 bg-white rounded-[32px] py-4 px-5'}>
      <div className={'text-h6 text-gray3'}>{formatDate(time)}</div>
      {switchAlarmType(type)}
    </div>
  );
};
export default AlarmItem;

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m5 11.5 6-6M5 5.5h6v6" />
  </svg>
);
