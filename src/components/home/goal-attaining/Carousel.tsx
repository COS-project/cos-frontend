import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useRecoilValue } from 'recoil';

import useBest3TipPosts from '@/lib/hooks/useBest3TipPosts';
import { certificateIdAtom } from '@/recoil/atom';

const CarouselCardView = () => {
  const certificateId = useRecoilValue(certificateIdAtom);
  const { bestTipPosts } = useBest3TipPosts(certificateId);
  const router = useRouter();

  function formatDate(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear().toString().slice(2); // 마지막 두 자리만 사용
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = date.getDate().toString().padStart(2, '0'); // 일자
    return `${year}.${month}.${day}`;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={6000}
        showArrows={true}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          const indicatorClasses = `inline-block h-2 w-2 mr-2 rounded-full ${isSelected ? 'bg-black' : 'bg-gray2'}`;
          return (
            <button
              type="button"
              onClick={onClickHandler}
              className={indicatorClasses}
              aria-label={`Slide ${index}`}
              title={`${index + 1}`}
            />
          );
        }}>
        {bestTipPosts?.map((bestTipPost) => {
          return (
            <section
              onClick={() => {
                router.push(`/community/${certificateId}/${bestTipPost.postId}`);
              }}
              key={bestTipPost.postId}
              className={
                'flex flex-col justify-between mx-[21.5px] mt-[12px] p-5 bg-gray0 rounded-[24px] mb-10 h-[300px]'
              }>
              {bestTipPost.postImages[0] && (
                <div className={'relative w-full h-[100px]'}>
                  <Image
                    src={bestTipPost.postImages[0].imageUrl}
                    alt={bestTipPost.postImages[0].imageUrl}
                    fill
                    className={'object-cover rounded-[16px]'}
                  />
                </div>
              )}
              <div className={'flex flex-col justify-start items-start w-full'}>
                <div className={'text-h3 mt-[12px] text-left'}>{bestTipPost.postContent.title}</div>
                <div className={'mt-[8px] text-gray4 line-clamp-4 text-left'}>{bestTipPost.postContent.content}</div>
              </div>

              <div className={'mt-[24px] flex justify-between'}>
                <div className={'flex flex-col items-start'}>
                  <div className={'text-h6 text-gray3'}>
                    {formatDate(
                      bestTipPost.dateTime.modifiedAt
                        ? bestTipPost.dateTime.modifiedAt
                        : bestTipPost.dateTime.createdAt,
                    )}
                  </div>
                  <div className={'text-h6 text-gray3'}>{bestTipPost.user.nickname}</div>
                </div>
                {bestTipPost.likeStatus ? (
                  <div>
                    <Image
                      src="/community/BlueFillLikeIcon.svg"
                      alt="GrayArrowIcon"
                      width={24}
                      height={24}
                      style={{ width: 24, height: 24 }}
                    />
                    <div className={'text-second text-[13px]'}>{bestTipPost.likeCount}</div>
                  </div>
                ) : (
                  <div>
                    <Image
                      src="/community/GrayLikeIcon.svg"
                      alt="GrayArrowIcon"
                      width={24}
                      height={24}
                      style={{ width: 24, height: 24 }}
                    />
                    <div className={'text-gray4 text-[13px]'}>{bestTipPost.likeCount}</div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselCardView;
