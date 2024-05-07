'use client';

import { useState } from 'react';

import MyWritingMenu from '@/components/mypage/MyWritingMenu';
import Post from '@/components/mypage/Post';

export default function MyWriting() {
  // REVIEW, COMMENTARY, TIP, NORMAL
  const [boardType, setBoardType] = useState<string>('REVIEW');

  const commentaryElement = () => {
    return (
      <div className={'flex gap-x-[6px] pb-3'}>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>2023년도</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>1회차</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>23번</div>
      </div>
    );
  };

  const tipElement = () => {
    return (
      <div className={'pb-2'}>
        <div className={'px-3 py-[2px] text-white bg-primary rounded-full w-fit font-light'}>BEST</div>
      </div>
    );
  };

  const bottomElement = () => {
    return (
      <div className={'flex justify-end gap-x-2'}>
        <button className={'bg-gray0 py-2 px-4 rounded-[12px]'}>수정</button>
        <button className={'bg-black text-white py-2 px-4 rounded-[12px]'}>삭제</button>
      </div>
    );
  };

  return (
    <>
      <div className={'flex flex-col gap-y-4 bg-gray0 min-h-screen'}>
        <MyWritingMenu boardType={boardType} setBoardType={setBoardType} />
        <div className={'px-5 flex flex-col gap-y-4 '}>
          <Post
            content={'어려운 문제였어요. 데이터베이스 관계형 데이터 베이스...'}
            title={'스프레드시트 23번 문제'}
            commentCount={32}
            bottomElement={bottomElement}
            createdAt={'2023.7.12'}
            imageUrl={'/황유림.jpg'}
            likeCount={12}
            topElement={commentaryElement}></Post>
          <Post
            content={'어려운 문제였어요. 데이터베이스 관계형 데이터 베이스...'}
            title={'스프레드시트 23번 문제'}
            commentCount={32}
            bottomElement={bottomElement}
            createdAt={'2023.7.12'}
            imageUrl={'/황유림.jpg'}
            likeCount={12}></Post>
          <Post
            content={'어려운 문제였어요. 데이터베이스 관계형 데이터 베이스...'}
            title={'스프레드시트 23번 문제'}
            commentCount={32}
            bottomElement={bottomElement}
            createdAt={'2023.7.12'}
            imageUrl={'/황유림.jpg'}
            likeCount={12}
            topElement={tipElement}></Post>
        </div>
      </div>
    </>
  );
}
