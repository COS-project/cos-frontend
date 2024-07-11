'use client';

import Image from 'next/image';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import FilterModal from '@/components/common/FilterModal';
import MockExamYearsFilter from '@/components/common/MockExamYearsFilter';
import ImageDeleteButton from '@/components/community/ImageDeleteButton';
import { putPostDetail } from '@/lib/api/community';
import useGetMockExamYears from '@/lib/hooks/useGetMockExamYears';
import useGetPost from '@/lib/hooks/useGetPost';
import useMockExamQuestions from '@/lib/hooks/useMockExamQuestions';
import { editPostDataState, imagePreviewsState, imageUrlListState, pastImageUrlsState } from '@/recoil/community/atom';
import { EditPostDataType, TipPostTagType } from '@/types/community/type';
import { ImageType } from '@/types/global';

interface Props {
  postId: string | string[];
  mockExamId: number | undefined;
}
const EditPost = (props: Props) => {
  const { postId, mockExamId } = props;
  const { postDetailData } = useGetPost(postId);
  const { questions } = useMockExamQuestions(mockExamId);
  const { examYears } = useGetMockExamYears();
  const [editPostData, setEditPostData] = useRecoilState(editPostDataState);
  const [onlineCourseInputs, setOnlineCourseInputs] = useState<string[]>([]);
  const [workbookInputs, setWorkbookInputs] = useState<string[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);
  const [imagePreviews, setImagePreviews] = useRecoilState<string[]>(imagePreviewsState);
  const [imageUrlList, setImageUrlList] = useRecoilState<File[]>(imageUrlListState);
  const [pastImageUrls, setPastImageUrls] = useRecoilState<ImageType[]>(pastImageUrlsState);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isQuestionSequenceNumeric, setIsQuestionSequenceNumeric] = useState(true);
  const [questionSequence, setQuestionSequence] = useState(0);
  const [isYearsFilterOpen, setIsYearsFilterOpen] = useState(false);
  const [isRoundsFilterOpen, setIsRoundsFilterOpen] = useState(false);
  // 기존 코드는 유지하고, 입력 필드의 상태를 관리하기 위한 새로운 state를 추가합니다.
  const [inputValue, setInputValue] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    console.log('postDetailData', postDetailData);
  }, [postDetailData]);

  /**
   * 해설 게시글 Recoil 상태를 초기화하는 함수
   * @param apiResponse postDetailData.result
   */
  const initializeCommentaryEditPostData = (apiResponse) => {
    return {
      postId: apiResponse.postResponse.postId,
      title: apiResponse.postResponse.postContent.title,
      content: apiResponse.postResponse.postContent.content,
      examYear: apiResponse.postResponse.question.mockExam.examYear,
      round: apiResponse.postResponse.question.mockExam.round,
      questionSequence: apiResponse.postResponse.question.questionSeq,
      removeImageIds: [],
    };
  };

  /**
   * 꿀팁 게시글 Recoil 상태를 초기화하는 함수
   * @param apiResponse postDetailData.result
   */
  const initializeTipEditPostData = (apiResponse) => {
    return {
      postId: apiResponse.postResponse.postId,
      title: apiResponse.postResponse.postContent.title,
      content: apiResponse.postResponse.postContent.content,
      removeImageIds: [],
    };
  };

  /**
   * 자유 게시글 Recoil 상태를 초기화하는 함수
   * @param apiResponse postDetailData.result
   */
  const initializeNormalEditPostData = (apiResponse) => {
    return {
      postId: apiResponse.postResponse.postId,
      title: apiResponse.postResponse.postContent.title,
      content: apiResponse.postResponse.postContent.content,
      removeImageIds: [],
    };
  };

  /**
   * API 에서 데이터를 가져와 Recoil 상태 업데이트 해주는 함수
   */
  const fetchDataAndUpdateState = async () => {
    try {
      const response = postDetailData;
      if (response) {
        // 해설 게시글일 때,
        if (postDetailData?.postResponse.postStatus.postType === 'COMMENTARY') {
          const initialCommentaryState: EditPostDataType = initializeCommentaryEditPostData(response);
          setEditPostData(initialCommentaryState);
        }
        // 꿀팁 게시글일 때,
        if (postDetailData?.postResponse.postStatus.postType === 'TIP') {
          const initialTipState: EditPostDataType = initializeTipEditPostData(response);
          setEditPostData(initialTipState);
        }
        //자유게시글일 때,
        if (
          postDetailData?.postResponse.postStatus.postType !== 'COMMENTARY' &&
          postDetailData?.postResponse.postStatus.postType !== 'TIP'
        ) {
          const initialNormalState: EditPostDataType = initializeNormalEditPostData(response);
          setEditPostData(initialNormalState);
        }
        setPastImageUrls(postDetailData.postResponse.postContent.images);
      } else {
        // 에러 처리를 수행할 수 있습니다.
        console.error('Failed to fetch');
      }
    } catch (error) {
      // 네트워크 오류 또는 다른 예외에 대한 처리를 수행할 수 있습니다.
      console.error('Error fetching:', error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchDataAndUpdateState();
  }, [postDetailData]);

  /**
   * 꿀팁 게시글 수정하기 전 과거 remonnedTags 값을 가져와서 onlineCourseInputs 값을 초기화해주는 함수
   */
  const updateNewOnlineCourseInput = () => {
    if (postDetailData?.postResponse.recommendTags && postDetailData?.postResponse.postStatus.postType === 'TIP') {
      postDetailData.postResponse.recommendTags.map((recommendTag: TipPostTagType) => {
        if (!onlineCourseInputs.includes(recommendTag.tagName)) {
          if (recommendTag.tagType === 'LECTURE') {
            setOnlineCourseInputs((prevState) => [...prevState, recommendTag.tagName]);
          }
        }
      });
    }
  };

  /**
   * 꿀팁 게시 과거 remonnedTags 값을 가져와서 workbookInputs 값을 초기화해주는 함수
   */
  const updateNewWorkBookInput = () => {
    if (postDetailData?.postResponse.recommendTags && postDetailData?.postResponse.postStatus.postType === 'TIP') {
      postDetailData.postResponse.recommendTags.map((recommendTag: TipPostTagType) => {
        if (!workbookInputs.includes(recommendTag.tagName)) {
          if (recommendTag.tagType === 'BOOK') {
            setWorkbookInputs((prevState) => [...prevState, recommendTag.tagName]);
          }
        }
      });
    }
  };

  useEffect(() => {
    updateNewOnlineCourseInput();
    updateNewWorkBookInput();
  }, [postDetailData]);

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
   * 문제 번호가 숫자로만 이루어졌는지 확인하는 함수
   */
  const isNumeric = (value: string) => {
    setIsQuestionSequenceNumeric(/^\d+$/.test(value));
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
   * 문제 번호를 변경하는 함수
   * @param value 문제 번호
   */
  const changePostDataQuestionSequence = (value: string) => {
    setEditPostData((prevState) => ({
      ...prevState,
      questionSequence: parseInt(value),
    }));
  };

  /**
   * 게시글 제목을 변경하는 함수
   * @param value 게시글 제목
   */
  const changePostDataTitle = (value: string) => {
    setEditPostData((prevState) => ({
      ...prevState,
      title: value,
    }));
  };

  /**
   * 게시글 내용을 변경하는 함수
   * @param value 게시글 내용
   */
  const changePostDataContent = (value: string) => {
    setEditPostData((prevState) => ({
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
      ...onlineCourseInputs
        .filter((lecture) => lecture !== '')
        .map((lecture) => ({ tagType: 'LECTURE', tagName: lecture })),
      ...workbookInputs.filter((book) => book !== '').map((book) => ({ tagType: 'BOOK', tagName: book })),
    ];

    setEditPostData((prevState) => ({
      ...prevState,
      tags: updatedTags,
    }));
    setIsSubmitEnabled(true);
  };

  // 해설 게시글일 때, 문제 번호를 컨트롤하는 inputValue state 값을 과거 데이터로 초기화
  useEffect(() => {
    setInputValue(editPostData.questionSequence?.toString() ?? '');
  }, [editPostData.questionSequence]);

  /**
   * Input 이벤트에 따라 안내문구 변경 함수
   * @param e input 이벤트
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    isNumeric(value);
    setIsEmpty(value.length === 0);
    setQuestionSequence(parseInt(value) || 0); // 입력값을 상태에 저장, NaN이면 0으로 설정

    if (/^\d+$/.test(value) && value.length !== 0 && parseInt(value) < questions.length) {
      changePostDataQuestionSequence(value);
    }
    setInputValue(value); // 입력 필드 상태 업데이트
  };

  /**
   * 꿀팁 게시글 제출 함수 postData.tags 가 변경됨에 따라 아래의 useEffect 가 실행되어 제출됨.
   */
  const handleTipSubmit = async (e: FormEvent) => {
    e.preventDefault();

    changeTags(); // 태그 변경 함수 호출
  };

  useEffect(() => {
    if (postDetailData?.postResponse.postStatus.postType === 'TIP' && isSubmitEnabled) {
      // removeImageUrls에서 id만 추출하여 배열로 변환
      const idsToRemove = editPostData.removeImageIds.map(item => item.id);

      // editPostData를 복제하고 removeImageUrls를 id 배열로 대체
      const updatedEditPostData = {
        ...editPostData,
        removeImageIds: idsToRemove,
      };

      // 태그가 업데이트된 후 실행할 로직
      const formData = new FormData();
      imageUrlList.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('request', new Blob([JSON.stringify(updatedEditPostData)], { type: 'application/json' }));

      // FormData의 내용을 확인하는 로직
      for (let [key, value] of formData.entries()) {
        if (value instanceof Blob) {
          // Blob인 경우 내용을 문자열로 변환
          const reader = new FileReader();
          reader.onloadend = () => {
            console.log(`${key}: ${reader.result}`);
          };
          reader.readAsText(value);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      // API 호출 로직
      console.log('수정할 데이터', editPostData);
      putPostDetail(1, 'TIP', formData)
        .then((response) => {
          setIsSubmitEnabled(false);
          console.log(response);
        })
        .catch((error) => {
          setIsSubmitEnabled(false);
          console.error('폼 제출 중 오류 발생:', error);
        });
    }
  }, [isSubmitEnabled]);

  /**
   * 자유 게시글, 해설 게시글 form 형식 제출 함수
   */
  const handleNormalAndCommentarySubmit = async (e: FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    const formData = new FormData();

    imageUrlList.forEach((file, index) => {
      formData.append('files', file);
    });

    formData.append(
      'request',
      new Blob([JSON.stringify(editPostData)], {
        type: 'application/json',
      }),
    );
    try {
      if (postDetailData?.postResponse.postStatus.postType === 'COMMENTARY') {
        const response = await putPostDetail(1, 'COMMENTARY', formData); // API 호출
        console.log('COMMENTARY', response.data);
      }
      if (
        postDetailData?.postResponse.postStatus.postType !== 'COMMENTARY' &&
        postDetailData?.postResponse.postStatus.postType !== 'TIP'
      ) {
        const response = await putPostDetail(1, 'NORMAL', formData); // API 호출
        console.log('TIP', response.data);
      }
    } catch (error) {
      console.error('폼 제출 중 오류 발생:', error);
    }
  };

  return (
    <div className={'min-h-screen mx-5'}>
      <form
        onSubmit={
          postDetailData?.postResponse.postStatus.postType !== 'COMMENTARY' &&
          postDetailData?.postResponse.postStatus.postType !== 'TIP'
            ? handleNormalAndCommentarySubmit
            : postDetailData?.postResponse.postStatus.postType === 'COMMENTARY'
            ? handleNormalAndCommentarySubmit
            : handleTipSubmit
        }>
        <button type={'submit'} className={'p-3 bg-second text-white'}>
          저장
        </button>
        {postDetailData?.postResponse.postStatus.postType === 'COMMENTARY' && (
          <div>
            {/* 년도 선택 세션 */}
            <div className={'flex flex-col relative gap-y-2'}>
              <div className={'text-h3 font-bold ml-2'}>모의고사 연도 선택</div>
              <div
                onClick={() => {
                  setIsYearsFilterOpen(!isYearsFilterOpen);
                }}
                className={'flex justify-between bg-gray0 rounded-[16px] py-3 px-4'}>
                <div className={'text-h4'}>{editPostData.examYear}년</div>
                {isYearsFilterOpen ? <DropUpIcon /> : <DropDownIcon />}
              </div>
              {isYearsFilterOpen && (
                <MockExamYearsFilter
                  years={examYears?.examYearWithRounds}
                  setIsOpen={setIsYearsFilterOpen}
                  setDataState={setEditPostData}
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
                <div className={'text-h4'}>{editPostData.round}회차</div>
                {isRoundsFilterOpen ? <DropUpIcon /> : <DropDownIcon />}
              </div>
              {isRoundsFilterOpen && (
                <FilterModal
                  data={
                    postDetailData.mockExam.examYear
                      ? examYears?.examYearWithRounds[postDetailData.mockExam.examYear]
                      : null
                  }
                  setDataState={setEditPostData}
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
                  value={inputValue}
                  onChange={handleInputChange}
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
          </div>
        )}

        {/* 제목, 글 작성 세션 */}
        <div className={'flex flex-col gap-y-2 mt-[16px]'}>
          <div className={'text-h3 font-bold ml-2'}>
            {postDetailData?.postResponse.postStatus.postType === 'TIP'
              ? '꿀팁'
              : postDetailData?.postResponse.postStatus.postType === 'COMMENTARY'
              ? '해설'
              : '자유'}
            작성
          </div>
          <div className={'flex flex-col gap-y-3'}>
            <input
              onChange={(e) => {
                changePostDataTitle(e.target.value);
              }}
              className={
                'w-full border-gray2 border-[1px] rounded-[16px] py-3 px-4 placeholder:text-gray4 focus:outline-0'
              }
              defaultValue={postDetailData?.postResponse.postContent.title}></input>
            <textarea
              onChange={(e) => {
                changePostDataContent(e.target.value);
              }}
              defaultValue={postDetailData?.postResponse.postContent.content}
              className={
                'w-full h-[300px] border-gray2 border-[1px] rounded-[16px] py-3 px-4 placeholder:text-gray4 focus:outline-0'
              }></textarea>
          </div>
        </div>

        {/* 인강 추천 태그 세션*/}
        {postDetailData?.postResponse.postStatus.postType === 'TIP' && (
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeOnlineCourseInput(index, event)
                    }
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
        )}

        {/* 문제집 추천 태그 세션*/}
        {postDetailData?.postResponse.postStatus.postType === 'TIP' && (
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
        )}

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
            {/* API에서 받은 과거의 urls */}
            {pastImageUrls?.map((img, i) => {
              return (
                <div key={img.id} className={'relative rounded-[8px]'}>
                  <ImageDeleteButton i={i} type={'과거 이미지 URL'} usage={'edit'} />
                  <div className={'relative rounded-[8px] w-[80px] h-[80px] overflow-hidden'}>
                    <Image key={img.id} src={img.imageUrl} fill alt={img.imageUrl} className={'object-cover'}></Image>;
                  </div>
                </div>
              );
            })}

            {/* 현재 추가된 urls */}
            {imagePreviews.map((img, i) => {
              return (
                <div key={i} className={'relative rounded-[8px]'}>
                  <ImageDeleteButton i={i} type={'현재 이미지 URL'} usage={'edit'} />
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
export default EditPost;

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
