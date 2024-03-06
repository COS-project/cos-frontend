//커뮤니티 포스팅 양식: 제목, 내용, 사진
//사진 입력받는 부분 api 연결하면서 수정 필요

import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  subject: string; //글 제목
  content: string; //글 내용
  image?: string; //첨부 사진
}

const CommunityPost = (props: Props) => {
  const router = useRouter();
  const { subject, content, image } = props;
  return (
    <>
      <div className="py-[8px] self-stretch text-black text-h2 font-bold font-['Pretendard Variable'] leading-[30px]">
        {subject}
      </div>
      <div className="pb-4 self-stretch text-black text-base font-normal font-['Pretendard Variable'] leading-normal">
        {content}
      </div>
      <div className="mb-6 h-[100px] justify-start items-start gap-3 inline-flex overflow-y-hidden">
        <img className="w-[95.67px] h-[100px] rounded-[5px]" src="https://via.placeholder.com/96x100" />
        <img className="w-[95.67px] h-[100px] rounded-[5px]" src="https://via.placeholder.com/96x100" />
        <img className="w-[95.67px] h-[100px] rounded-[5px]" src="https://via.placeholder.com/96x100" />
        <img className="w-[95.67px] h-[100px] rounded-[5px]" src="https://via.placeholder.com/96x100" />
        <img className="w-[95.67px] h-[100px] rounded-[5px]" src="https://via.placeholder.com/96x100" />
        <img className="w-[95.67px] h-[100px] rounded-[5px]" src="https://via.placeholder.com/96x100" />
      </div>
    </>
  );
};
export default CommunityPost;
