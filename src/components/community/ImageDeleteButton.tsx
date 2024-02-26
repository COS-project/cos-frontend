'use client';

import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { deleteUrls,imagePreviewsState, imageUrlListState } from '@/recoil/community/atom';

interface Props {
  usage: string;
  //imgFiles(현재)과 imageUrls(과거)의 인덱스
  i: number;
  //imgFiles에서 사용되는지, imageUrls에서 사용되는지 판별
  type?: string;
}
const ImageDeleteButton = (props: Props) => {
  const { usage, i, type } = props;
  const [imagePreviews, setImagePreviews] = useRecoilState<string[]>(imagePreviewsState);// 파일 업로드
  const [imageUrlList, setImageUrlList] = useRecoilState<File[]>(imageUrlListState);

  /**
   * 선택된 imageUrl 을 제외하고 남은 imageUrl 로 새로운 리스트를 구성합니다.
   */
  const deleteImageUrl = () => {
    const copyImageUrlList = [...imageUrlList]; // 과거에서 삭제할 경우
    const copyImagePreviews = [...imagePreviews];
    setImageUrlList(copyImageUrlList.filter((imageUrl) => imageUrl != copyImageUrlList[i]));
    setImagePreviews(copyImagePreviews.filter((imagePreview) => imagePreview != copyImagePreviews[i]));
  };

  return (
    <div>
      <button
        className="absolute bg-red-600 rounded-full p-1 top-0 right-0 z-10"
        type={'button'}
        onClick={() => {
          deleteImageUrl();
        }}>
        <div className={'absolute top-0 right-0 bg-gray3 rounded-full p-[5px] w-fit'}>
          <DeleteIcon />
        </div>
      </button>
    </div>
  );
};
export default ImageDeleteButton;
function DeleteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={11} height={10} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#9E9FA1" d="M.507 0h9.723v9.723H.507z" />
      <path
        d="M.949 8.986a.63.63 0 010-.884l7.66-7.66a.63.63 0 01.884 0 .63.63 0 010 .884l-7.66 7.66a.63.63 0 01-.884 0z"
        fill="#fff"
      />
      <path
        d="M6.842 7.218L.949 1.326a.63.63 0 010-.884.63.63 0 01.884 0l5.892 5.893a.63.63 0 010 .883.63.63 0 01-.883 0zM8.462 9.133a.833.833 0 101.179-1.178.833.833 0 00-1.179 1.178z"
        fill="#fff"
      />
    </svg>
  );
}

