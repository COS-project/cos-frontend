'use client';

import Image from 'next/image';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import ImageDeleteButton from '@/components/community/ImageDeleteButton';
import { postCommentary } from '@/lib/api/community';
import { createPostDataState, imagePreviewsState, imageUrlListState } from '@/recoil/community/atom';

const WriteTipPost = () => {
  const [postData, setPostData] = useRecoilState(createPostDataState);
  const [imagePreviews, setImagePreviews] = useRecoilState<string[]>(imagePreviewsState);
  const [imageUrlList, setImageUrlList] = useRecoilState<File[]>(imageUrlListState);
  const imgRef = useRef<HTMLInputElement>(null);
  // 입력 필드 목록을 관리하는 상태
  const [onlineCourseInputs, setOnlineCourseInputs] = useState<string[]>([]);
  const [workbookInputs, setWorkbookInputs] = useState<string[]>([]);

  /**
   * 추천 강의 새 입력 필드를 추가하는 함수
   */
  const addOnlineCourseInput = () => {
    setOnlineCourseInputs([...onlineCourseInputs, '']); // 기존 입력 필드 목록에 빈 문자열을 추가
  };

  /**
   * 추천 문제집 새 입력 필드를 추가하는 함수
   */
  const addWorkbookInputs = () => {
    setWorkbookInputs([...workbookInputs, '']); // 기존 입력 필드 목록에 빈 문자열을 추가
  };

  /**
   * 추천 인강 입력 필드 값 변경 함수
   */
  const handleChangeOnlineCourseInput = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...onlineCourseInputs];
    newInputs[index] = event.target.value; // 변경된 값을 해당 인덱스의 입력 필드에 반영
    setOnlineCourseInputs(newInputs);
  };

  /**
   * 추천 문제집 입력 필드 값 변경 함수
   */
  const handleChangeWorkBookInput = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...workbookInputs];
    newInputs[index] = event.target.value; // 변경된 값을 해당 인덱스의 입력 필드에 반영
    setWorkbookInputs(newInputs);
  };

  /**
   * 추천 인강 삭제
   */
  const deleteOnlineCourseInputs = (i: number) => {
    const copyOnlineCourseInputs = [...onlineCourseInputs];
    setOnlineCourseInputs(copyOnlineCourseInputs.filter((onlineCourseInput, index) => index != i));
  };

  /**
   * 추천 문제집 삭제
   */
  const deleteWorkBookInputs = (i: number) => {
    const copyWorkbookInputs = [...workbookInputs];
    setWorkbookInputs(copyWorkbookInputs.filter((workBookInput, index) => index != i));
  };

  /**
   * 이미지 업로드 및 미리보기 함수
   */
  const saveImgFile = async () => {
    const files = imgRef.current?.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prevImagePreviews) => [...prevImagePreviews, reader.result as string]);
      };
      reader.readAsDataURL(file);

      setImageUrlList((prevImageUrlList) => [...prevImageUrlList, file]);
    }
  };

  /**
   * 게시글 제목을 변경하는 함수
   * @param value 게시글 제목
   */
  const changePostDataTitle = (value: string) => {
    setPostData((prevState) => ({
      ...prevState,
      title: value,
    }));
  };

  /**
   * 게시글 내용을 변경하는 함수
   * @param value 게시글 내용
   */
  const changePostDataContent = (value: string) => {
    setPostData((prevState) => ({
      ...prevState,
      content: value,
    }));
  };

  /**
   * 추천 인강, 추천 문제집 요구하는 post 타입으로 변경
   */
  const changeTags = () => {
    onlineCourseInputs.filter((lecture) => lecture !== '');
    workbookInputs.filter((book) => book !== '');

    const updatedTags = [
      ...postData.tags,
      ...onlineCourseInputs
        .filter((lecture) => lecture !== '')
        .map((lecture) => ({ tagType: 'LECTURE', tagName: lecture })),
      ...workbookInputs.filter((book) => book !== '').map((book) => ({ tagType: 'BOOK', tagName: book })),
    ];

    setPostData((prevState) => ({
      ...prevState,
      tags: updatedTags,
    }));
  };

  /**
   * 제출 함수 postData.tags 가 변경됨에 따라 아래의 useEffect 가 실행되어 제출됨.
   */
  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    changeTags(); // 태그 변경 함수 호출
  };

  useEffect(() => {
    if (postData.tags.length > 0) {
      // 태그가 업데이트된 후 실행할 로직
      const formData = new FormData();
      imageUrlList.forEach((file) => {
        formData.append('images', file);
      });
      formData.append('request', new Blob([JSON.stringify(postData)], { type: 'application/json' }));

      // API 호출 로직
      postCommentary(1, 'TIP', formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error('폼 제출 중 오류 발생:', error);
        });
    }
  }, [postData.tags]);

  return (
    <div className={'m-5'}>
      <form onSubmit={handleSubmit} className={'flex flex-col gap-y-3'}>
        <button type={'submit'} className={'p-3 bg-second text-white'}>
          저장
        </button>

        {/* 제목, 글 작성 세션 */}
        <div className={'flex flex-col gap-y-2 mt-[16px]'}>
          <div className={'text-h3 font-bold ml-2'}>꿀팁 작성</div>
          <div className={'flex flex-col gap-y-3'}>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changePostDataTitle(e.target.value);
              }}
              className={
                'w-full border-gray2 border-[1px] rounded-[16px] py-3 px-4 placeholder:text-gray4 focus:outline-0'
              }
              placeholder={'제목'}></input>
            <textarea
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                changePostDataContent(e.target.value);
              }}
              placeholder={'내용을 입력해주세요.'}
              className={
                'w-full h-[300px] border-gray2 border-[1px] rounded-[16px] py-3 px-4 placeholder:text-gray4 focus:outline-0'
              }></textarea>
          </div>
        </div>

        {/* 인강 추천 태그 세션*/}
        <div className={'flex flex-col gap-y-2 mt-[16px]'}>
          <div className={'text-h3 font-bold ml-2'}>
            추천 인강 <span className={'font-normal text-gray3 text-h4'}>(선택)</span>
          </div>
          <div className={'flex flex-col gap-y-3'}>
            {onlineCourseInputs.map((input: string, index: number) => (
              <div
                key={index}
                className={'flex justify-between w-full border-gray2 border-[1px] rounded-[16px] py-3 px-4'}>
                <input
                  type="text"
                  value={input}
                  placeholder={'인강 제목'}
                  className={'w-[90%] placeholder:text-gray4 focus:outline-0'}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeOnlineCourseInput(index, event)}
                />
                <button
                  type={'button'}
                  onClick={() => deleteOnlineCourseInputs(index)}
                  className={'bg-gray2 rounded-full p-1'}>
                  x
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => addOnlineCourseInput()}
            type={'button'}
            className={'bg-second rounded-[16px] py-3 px-4 text-white text-h6'}>
            + 추가
          </button>
        </div>

        {/* 문제집 추천 태그 세션*/}
        <div className={'flex flex-col gap-y-2 mt-[16px]'}>
          <div className={'text-h3 font-bold ml-2'}>
            추천 문제집 <span className={'font-normal text-gray3 text-h4'}>(선택)</span>
          </div>
          <div className={'flex flex-col gap-y-3'}>
            {workbookInputs.map((input: string, index: number) => (
              <div
                key={index}
                className={'flex justify-between w-full border-gray2 border-[1px] rounded-[16px] py-3 px-4'}>
                <input
                  type="text"
                  value={input}
                  placeholder={'문제집 제목'}
                  className={'w-[90%] placeholder:text-gray4 focus:outline-0'}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeWorkBookInput(index, event)}
                />
                <button
                  type={'button'}
                  onClick={() => deleteWorkBookInputs(index)}
                  className={'bg-gray2 rounded-full p-1'}>
                  x
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => addWorkbookInputs()}
            type={'button'}
            className={'bg-second rounded-[16px] py-3 px-4 text-white text-h6'}>
            + 추가
          </button>
        </div>

        {/* 이미지 추가 세션 */}
        <div className={'flex gap-x-2 '}>
          <div className={'rounded-[8px] p-2 bg-gray0 w-fit'}>
            <label htmlFor="image">
              <AddImageIcon />
            </label>
            <input
              type={'file'}
              accept={'image/*'}
              id="image"
              name="image"
              ref={imgRef}
              onChange={saveImgFile}
              multiple
              style={{ display: 'none' }}></input>
          </div>
          <div className={'w-[375px] flex items-center overflow-x-scroll gap-x-3'}>
            {imagePreviews.map((img, i) => {
              return (
                <div key={i} className={'relative rounded-[8px]'}>
                  <ImageDeleteButton i={i} usage={'create'} />
                  <div className={'relative rounded-[8px] w-[80px] h-[80px] overflow-hidden'}>
                    <Image key={i} src={img} fill alt={img} className={'object-cover'}></Image>;
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};
export default WriteTipPost;

function AddImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={34} height={30} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.139 29.528c-.663 0-1.217-.224-1.664-.67-.446-.447-.67-1.001-.67-1.664V9.584c0-.667.224-1.223.67-1.667.447-.445 1.001-.667 1.664-.667h5l3.083-3.389h8.528v1h-8.083L8.583 8.25H3.14c-.389 0-.708.13-.958.389a1.31 1.31 0 00-.375.944v17.611c0 .39.125.709.375.959s.569.375.958.375h24.333c.39 0 .708-.125.958-.375s.375-.57.375-.959V13.917h1v13.277c0 .663-.222 1.217-.666 1.664-.445.446-1 .67-1.667.67H3.14zM28.805 8.25V4.86h-3.388v-1h3.388V.472h1v3.389h3.39v1h-3.39V8.25h-1zm-13.5 15.889c1.62 0 2.984-.553 4.09-1.66 1.107-1.106 1.66-2.47 1.66-4.09 0-1.62-.553-2.984-1.66-4.09-1.106-1.107-2.47-1.66-4.09-1.66-1.62 0-2.983.553-4.09 1.66-1.106 1.106-1.66 2.47-1.66 4.09 0 1.62.554 2.984 1.66 4.09 1.107 1.107 2.47 1.66 4.09 1.66zm0-1c-1.351 0-2.48-.454-3.388-1.361-.908-.908-1.361-2.037-1.361-3.39 0-1.351.453-2.48 1.36-3.388.908-.908 2.038-1.361 3.39-1.361 1.351 0 2.481.454 3.388 1.36.908.908 1.361 2.038 1.361 3.39 0 1.352-.453 2.481-1.36 3.389-.908.907-2.038 1.36-3.39 1.36z"
        fill="#1C1B1F"
      />
    </svg>
  );
}
