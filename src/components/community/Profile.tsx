import Image from 'next/image';
import React from 'react';

import { formatDateTime } from '@/utils/community/function';

interface Props {
  profileUrl: string;
  isWriter: boolean;
  nickName: string;
  createdTime: string;
  setIsOptionModalOpen: () => void;
  imageClassName?: string;
  nickNameClassName?: string;
}

const Profile = (props: Props) => {
  const { profileUrl, isWriter, nickName, createdTime, setIsOptionModalOpen, imageClassName, nickNameClassName } =
    props;

  return (
    <div className={'flex justify-between items-center'}>
      <div className={'flex gap-x-2 items-center'}>
        <div className={imageClassName ? imageClassName : 'relative w-[40px] h-[40px]'}>
          <Image alt={'profile'} src={profileUrl} fill className={'object-cover rounded-full'} />
        </div>
        <div className={'flex flex-col'}>
          <p
            className={
              nickNameClassName ? nickNameClassName : 'subtitle1 text-gray4 leading-[21px] tracking-[-0.28px]'
            }>
            {nickName}
          </p>
          <p
            className={
              'flex gap-x-2 text-gray3 items-center font-pre text-h6 font-normal leading-[21px] tracking-[-0.28px]'
            }>
            <span>{formatDateTime(createdTime).date}</span>
            <div className={'h-[14px] w-[1px] bg-gray1'} />
            <span>{formatDateTime(createdTime).time}</span>
          </p>
        </div>
      </div>
      {isWriter && (
        <Image
          onClick={setIsOptionModalOpen}
          src="/community/OptionIcon.svg"
          alt="Logo"
          width={24}
          height={24}
          style={{ width: 24, height: 24 }}
        />
      )}
    </div>
  );
};
export default Profile;
