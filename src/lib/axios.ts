import axios from 'axios';
import { Param } from '@/types/global';
import qs from 'qs';
import { string } from 'prop-types';

const client = axios.create({
  baseURL: 'http://cercat.o-r.kr/api/v2',
  headers: {
    'Content-type': 'application/json',
    'Access-Token':
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0dVRVNUIl0sImVtYWlsIjoidGtkZ2g2NDI3QG5hdmVyLmNvbSIsInN1YiI6InRrZGdoNjQyN0BuYXZlci5jb20iLCJpYXQiOjE3MDc5OTM0NzAsImV4cCI6MTcwODI1MjY3MH0.L6_y1MFe7pEshx5T1ML0ed7S3p_cAWVT98p_x3xP54s',
  },
  withCredentials: true,
});

/**
 * 토큰 관리를 위한 함수
 */
const setAuthHeader = (token: string) => {
  if (token) {
    client.defaults.headers['access-token'] = `${token}`;
    localStorage.removeItem('accessToken');
  } else {
    delete client.defaults.headers['access-token'];
  }
};

/**
 * 액세스 토큰 및 리프레시 토큰을 저장하는 함수
 */
const saveTokensToLocalStorage = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

/**
 * 액세스 토큰 및 리프레시 토큰을 불러오는 함수
 */
const getTokensFromLocalStorage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return { accessToken, refreshToken };
};

/**
 * API 요청을 보내는 함수
 * @param config 는 axios 요청
 */
const sendRequest = async (config) => {
  try {
    console.log('In send Request' + localStorage.getItem('accessToken'));
    return await client(config);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // 만료된 액세스 토큰일 경우 리프레시 토큰으로 갱신
      const { refreshToken } = getTokensFromLocalStorage();
      if (refreshToken) {
        try {
          const response = await client.post(
            config.url,
            {}, // 여기에 요청 바디 데이터를 넣어줘야 함
            {
              headers: {
                'Refresh-Token': refreshToken,
              },
            },
          );
          const newAccessToken = response.headers.get('access-token');
          const newRefreshToken = response.headers.get('refresh-token');

          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
          // 갱신된 액세스 토큰을 헤더에 설정
          setAuthHeader(newAccessToken);

          // 갱신된 토큰을 로컬 스토리지에 저장
          saveTokensToLocalStorage(newAccessToken, newRefreshToken);

          // 이전 요청 재시도
          return await client({
            headers: {
              'Access-Token': newAccessToken,
            },
            method: config.method,
            data: config.data,
            url: config.url,
          });
        } catch (refreshError) {
          // 리프레시 토큰으로의 갱신에 실패하면 로그인 페이지로 리다이렉트 또는 다른 처리 수행
          console.error('토큰 갱신에 실패했습니다..', refreshError);
          // 예: 로그인 페이지로 리다이렉트
        }
      }
    }

    // 401 에러가 아니거나 리프레시 토큰이 없는 경우 또는 갱신에 실패한 경우
    throw error;
  }
};

export const swrGetFetcher = async (url) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기

    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'GET',
      url: url,
    });
    // 성공적인 응답 처리
    console.log('데이터:', response.data);
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

export { client, getTokensFromLocalStorage, saveTokensToLocalStorage, sendRequest, setAuthHeader };
