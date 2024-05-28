import Image from 'next/image';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import MockExamYearsFilter from '@/components/common/MockExamYearsFilter';
import ImageDeleteButton from '@/components/community/ImageDeleteButton';
import MockExamRoundFilter from '@/components/community/MockExamRoundFilter';
import { postCommentary } from '@/lib/api/community';
import useGetMockExams from '@/lib/hooks/useGetMockExams';
import useGetMockExamYears from '@/lib/hooks/useGetMockExamYears';
import useMockExamQuestions from '@/lib/hooks/useMockExamQuestions';
import { createPostDataState, imagePreviewsState, imageUrlListState } from '@/recoil/community/atom';

const WriteExplanationPost = () => {
  const { examYears } = useGetMockExamYears();
  const { questions } = useMockExamQuestions(1); //TODO: 나중에 모의고사 번호로 변경해야 함.
  const [isYearsFilterOpen, setIsYearsFilterOpen] = useState(false);
  const [isRoundsFilterOpen, setIsRoundsFilterOpen] = useState(false);

  const [postData, setPostData] = useRecoilState(createPostDataState);
  const [imagePreviews, setImagePreviews] = useRecoilState<string[]>(imagePreviewsState);
  const [imageUrlList, setImageUrlList] = useRecoilState<File[]>(imageUrlListState);
  const imgRef = useRef<HTMLInputElement>(null);

  const [isEmpty, setIsEmpty] = useState(true);
  const [isQuestionSequenceNumeric, setIsQuestionSequenceNumeric] = useState(true);
  const [questionSequence, setQuestionSequence] = useState(0);
  const { mockExams } = useGetMockExams(1, postData.examYear); //해설 회차 필터값
  const [filteredExamYears, setFilteredExamYears] = useState<number[]>([]);

  useEffect(() => {
    console.log('mockExams', mockExams);
    console.log('postData', postData);
  }, [mockExams, postData]);

  useEffect(() => {
    if (examYears.includes('전체')) {
      const filterData = examYears.filter((item) => item !== '전체');
      setFilteredExamYears(filterData);
    }
  }, [examYears]);

  /**
   * 문제 번호를 변경하는 함수
   * @param value 문제 번호
   */
  const changePostDataQuestionSequence = (value: string) => {
    setPostData((prevState) => ({
      ...prevState,
      questionSequence: parseInt(value),
    }));
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
   * 문제 번호가 숫자로만 이루어졌는지 확인하는 함수
   */
  const isNumeric = (value: string) => {
    setIsQuestionSequenceNumeric(/^\d+$/.test(value));
  };

  /**
   * form 형식 제출 함수
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    const formData = new FormData();

    imageUrlList.forEach((file, index) => {
      formData.append('files', file);
    });

    formData.append(
      'request',
      new Blob([JSON.stringify(postData)], {
        type: 'application/json',
      }),
    );

    try {
      const response = await postCommentary(1, 'COMMENTARY', formData); // API 호출
    } catch (error) {
      console.error('폼 제출 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type={'submit'} className={'p-3 bg-second text-white'}>
          저장
        </button>
        <div className={'flex flex-col m-5 gap-y-4'}>
          {/* 년도 선택 세션 */}
          <div className={'flex flex-col relative gap-y-2'}>
            <div className={'text-h3 font-bold ml-2'}>모의고사 연도 선택</div>
            <div
              onClick={() => {
                setIsYearsFilterOpen(!isYearsFilterOpen);
              }}
              className={'flex justify-between bg-gray0 rounded-[16px] py-3 px-4'}>
              <div className={'text-h4'}>{postData.examYear}년</div>
              {isYearsFilterOpen ? <DropUpIcon /> : <DropDownIcon />}
            </div>
            {isYearsFilterOpen && (
              <MockExamYearsFilter
                years={filteredExamYears}
                setIsOpen={setIsYearsFilterOpen}
                setDataState={setPostData}
              />
            )}
          </div>

          {/* 회차 선택 세션 */}
          <div className={'flex flex-col relative gap-y-2'}>
            <div className={'text-h3 font-bold ml-2'}>모의고사 회차 선택</div>
            <div
              onClick={() => {
                setIsRoundsFilterOpen(!isRoundsFilterOpen);
              }}
              className={'flex justify-between bg-gray0 rounded-[16px] py-3 px-4'}>
              <div className={'text-h4'}>{postData.round}회차</div>
              {isRoundsFilterOpen ? <DropUpIcon /> : <DropDownIcon />}
            </div>
            {isRoundsFilterOpen && (
              <MockExamRoundFilter
                //TODO: 회차 모의고사
                mockExams={postData.examYear ? mockExams : null}
                setDataState={setPostData}
                setIsOpen={setIsRoundsFilterOpen}
                className={'absolute w-full top-[100%]'}
              />
            )}
          </div>

          {/* 문제 번호 선택 세션 */}
          <div className={'flex flex-col relative gap-y-2'}>
            <div className={'text-h3 font-bold ml-2'}>문항 번호 입력</div>
            <div>
              <input
                onChange={(e) => {
                  isNumeric(e.target.value);
                  setIsEmpty(e.target.value.length === 0);
                  setQuestionSequence(parseInt(e.target.value));
                  if (
                    /^\d+$/.test(e.target.value) &&
                    e.target.value.length !== 0 &&
                    parseInt(e.target.value) < questions.length
                  ) {
                    changePostDataQuestionSequence(e.target.value);
                  }
                }}
                className={'w-full bg-gray0 rounded-[16px] py-3 px-4 focus:outline-0'}></input>
              {/* 경고 문구 세션 */}
              {isEmpty ? <div className={'text-point ml-1'}>내용을 입력해주세요.</div> : null}
              {!isQuestionSequenceNumeric && !isEmpty ? (
                <div className={'text-point ml-1'}>숫자만 입력해주세요.</div>
              ) : null}
              {questionSequence > questions?.length && !isEmpty && isQuestionSequenceNumeric ? (
                <div className={'text-point ml-1'}>전체 문제 수({questions?.length}) 이하의 숫자를 입력해주세요.</div>
              ) : null}
            </div>
          </div>

          {/* 제목, 글 작성 세션 */}
          <div className={'flex flex-col gap-y-2 mt-[16px]'}>
            <div className={'text-h3 font-bold ml-2'}>해설 작성</div>
            <div className={'flex flex-col gap-y-3'}>
              <input
                onChange={(e) => {
                  changePostDataTitle(e.target.value);
                }}
                className={
                  'w-full border-gray2 border-[1px] rounded-[16px] py-3 px-4 placeholder:text-gray4 focus:outline-0'
                }
                placeholder={'제목'}></input>
              <textarea
                onChange={(e) => {
                  changePostDataContent(e.target.value);
                }}
                placeholder={'내용을 입력해주세요.'}
                className={
                  'w-full h-[300px] border-gray2 border-[1px] rounded-[16px] py-3 px-4 placeholder:text-gray4 focus:outline-0'
                }></textarea>
            </div>
          </div>
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
export default WriteExplanationPost;

function DropDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13.5 8.5l-3.5 3-3.5-3" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}

function DropUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.5 11.5l3.5-3 3.5 3" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}

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
