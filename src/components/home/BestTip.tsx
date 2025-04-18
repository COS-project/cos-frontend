import { useRouter } from 'next/navigation';
import * as React from 'react';
import { SVGProps } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import CarouselCardView from '@/components/home/goal-attaining/Carousel';
import { certificateIdAtom } from '@/recoil/atom';
import { boardTypeStateAtom, selectedNormalAndTipFilterContentAtom } from '@/recoil/community/atom';
import { BoardType } from '@/types/community/type';

const BestTip = () => {
  const router = useRouter();
  const certificateId = useRecoilValue(certificateIdAtom);
  const setBoardType = useSetRecoilState<BoardType>(boardTypeStateAtom);
  const setSelectedNormalAndTipFilterContent = useSetRecoilState<'최신순' | '인기순'>(
    selectedNormalAndTipFilterContentAtom,
  );
  return (
    <div>
      <div className="mx-auto mt-2 rounded-3xl bg-white py-[3%]">
        <div className="w-[90%] mx-auto">
          <div className="flex justify-between my-[1%]">
            <div className="font-semibold text-h3">베스트 꿀팁</div>
            <button
              className={'flex items-center py-1 px-3 rounded-full border-[1px] border-gray2 text-h6'}
              onClick={() => {
                setBoardType('TIP');
                setSelectedNormalAndTipFilterContent('인기순');
                router.push(`/community/${certificateId}`);
              }}>
              더보기
              <ArrowIcon />
            </button>
          </div>
          <div className="flex mx-auto">
            <div className="w-full">
              <CarouselCardView />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BestTip;

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m5 11.5 6-6M5 5.5h6v6" />
  </svg>
);
