import { post } from 'axios';

import { CreatePostDataType } from '@/types/community/type';

import { sendRequest } from '../axios';

export const postFavoriteBoards = async (certificateId: number) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'POST',
      url: `/favorite-boards/${certificateId}`,
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

export const postCommentary = async (certificateId: number, postType: string, formData: FormData) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      data: formData,
      url: `/certificates/${certificateId}/${postType}/posts`,
    });
    console.log(response.data);
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

export const putPostDetail = async (certificateId: number, postType: string, formData: FormData) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
        'Content-Type': 'multipart/form-data',
      },
      method: 'PUT',
      data: formData,
      url: `/certificates/${certificateId}/${postType}/posts`,
    });
    console.log(response.data);
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};
