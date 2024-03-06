//커뮤니티 태그
import React from 'react';

interface Props {
  children: React.ReactNode; //태그 내용
}

const CommunityTag = (props: Props) => {
  const { children } = props;
  return (
    <div className="px-2 py-0.5 bg-gray0 rounded-lg text-neutral-500 text-sm font-normal font-['Pretendard Variable'] leading-[21px] text-gray4">
      {children}
    </div>
  );
};
export default CommunityTag;
