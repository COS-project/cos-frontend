import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';

import { deleteToggleLikeData, postToggleLikeData } from '@/lib/api/communityPost';
import { ImageType } from '@/types/global';

interface Props {
  postId: number;
  children?: ReactNode;
  title: string;
  content: string;
  imageList: ImageType[];
  commentCount: number;
  likeCount: number;
  likeStatus: boolean;
}

const CommunityPost = (props: Props) => {
  const { postId, title, content, children, imageList, commentCount, likeStatus, likeCount } = props;

  const [firstRendering, setFirstRendering] = useState(true);
  const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined);
  const [fakeLikeCount, setFakeLikeCount] = useState(0);

  /**
   * 처음 likeCount 를 fakeLikeCount 에 추가, likeStatus 를 isLiked 에 추가
   */
  useEffect(() => {
    if (firstRendering) {
      setIsLiked(likeStatus);
      setFakeLikeCount(likeCount);
      setFirstRendering(false);
    }
  }, [likeStatus, likeCount]);

  return (
    <div className={'mt-[16px]'}>
      {/* 내용 */}
      <section className={'flex flex-col gap-y-2'}>
        {children}
        <h2 className={'self-stretch justify-start text-black text-h2 font-bold font-pre leading-loose'}>{title}</h2>
        <p className={'self-stretch justify-start text-black text-base font-normal font-pre leading-normal'}>
          {content}
        </p>
      </section>

      {/* 사진 */}
      <section className={'mt-[16px] flex gap-x-3 overflow-x-scroll'}>
        {imageList.map((image) => {
          return (
            <div key={image.id} className={'relative w-[95px] h-[100px]'}>
              <Image src={image.imageUrl} className={'object-cover rounded-[5px]'} alt={'사진'} fill />
            </div>
          );
        })}
      </section>
      {/* 반응 */}
      <section className={'flex justify-between mt-[24px] mb-[20px] items-end'}>
        <div className={'flex gap-x-2'}>
          <div className={'flex items-center'}>
            {isLiked ? (
              <Image
                src="/community/BlueFillLikeIcon.svg"
                alt="BlueLikeIcon"
                width={24}
                height={24}
                style={{ width: 24, height: 24 }}
              />
            ) : (
              <Image
                src="/community/BlueLikeIcon.svg"
                alt="BlueLikeIcon"
                width={24}
                height={24}
                style={{ width: 24, height: 24 }}
              />
            )}
            <p className={'font-pre text-h6 font-normal leading-[21px] tracking-[-0.28px] text-second'}>
              {fakeLikeCount}
            </p>
          </div>
          <div className={'flex items-center'}>
            <Image
              src="/community/CommnetIcon.svg"
              alt="Logo"
              width={24}
              height={24}
              style={{ width: 24, height: 24 }}
            />
            <p className={'font-pre text-h6 font-normal leading-[21px] tracking-[-0.28px] text-point'}>
              {commentCount}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            if (isLiked) {
              deleteToggleLikeData(postId, 'POST').then(() => {
                console.log('좋아요 삭제');
              });
              setFakeLikeCount((prev) => prev - 1);
            } else {
              postToggleLikeData(postId, 'POST').then(() => {
                console.log('좋아요 추가');
              });
              setFakeLikeCount((prev) => prev + 1);
            }
            setIsLiked(!isLiked);
          }}
          className={
            isLiked
              ? 'flex gap-x-1 items-center bg-second py-1 px-2 rounded-[8px] text-white font-pre text-h6 font-normal leading-[21px] tracking-[-0.28px]'
              : 'flex gap-x-1 items-center bg-gray0 py-1 px-2 rounded-[8px] text-gray4 font-pre text-h6 font-normal leading-[21px] tracking-[-0.28px]'
          }>
          <Image
            src={isLiked ? '/community/WhiteLikeIcon.svg' : '/community/GrayLikeIcon.svg'}
            alt="Logo"
            width={24}
            height={24}
            style={{ width: 24, height: 24 }}
          />
          <p>추천</p>
        </button>
      </section>
    </div>
  );
};
export default CommunityPost;
