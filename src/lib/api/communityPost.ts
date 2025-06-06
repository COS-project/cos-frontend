import Cookies from 'js-cookie';

import { GenerateComment } from '@/types/global';

import { sendRequest } from '../axios';

//게시글 좋아요 추가
export const postToggleLikeData = async (targetId: number, likeTargetType: 'COMMENT' | 'POST') => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': Cookies.get('accessToken'),
      },
      method: 'POST',
      data: {
        likeTargetType: likeTargetType,
        targetId: targetId,
      },
      url: '/api/v2/likes',
    });
    // 성공적인 응답 처리

    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('게시글 좋아요 에러 발생:', error);
  }
};

//게시글 좋아요 추가
export const deleteToggleLikeData = async (targetId: number, likeTargetType: 'COMMENT' | 'POST') => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': Cookies.get('accessToken'),
      },
      method: 'DELETE',
      data: {
        likeTargetType: likeTargetType,
        targetId: targetId,
      },
      url: '/api/v2/likes',
    });
    // 성공적인 응답 처리

    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('게시글 좋아요 삭제 에러 발생:', error);
  }
};

//댓글 추가
export const postCommentData = async (postId: number, commentData?: GenerateComment) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': Cookies.get('accessToken'),
      },
      method: 'POST',
      data: commentData,
      url: `/api/v2/posts/${postId}/post-comments`,
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

//댓글 삭제
export const deleteComment = async (commentId: number) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': Cookies.get('accessToken'),
      },
      method: 'DELETE',
      url: `/api/v2/post-comments/${commentId}`,
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

//게시글 삭제
export const deletePost = async (postId: number) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': Cookies.get('accessToken'),
      },
      method: 'DELETE',
      url: `/api/v2/posts/${postId}`,
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};
