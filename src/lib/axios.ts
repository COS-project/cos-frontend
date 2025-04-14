import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const client = axios.create({
  baseURL: 'https://cercat.o-r.kr',
  headers: {
    'Content-type': 'application/json',
    'Access-Token':
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0dVRVNUIl0sImVtYWlsIjoidGtkZ2g2NDI3QG5hdmVyLmNvbSIsInN1YiI6InRrZGdoNjQyN0BuYXZlci5jb20iLCJpYXQiOjE3MDk0NjEwNDUsImV4cCI6MTcwOTcyMDI0NX0.u_S6efRZoZUBcCxLcGG2Szio20CUMn2qsVLgNl5TCB8',
  },
  withCredentials: true,
});

/**
 * 토큰 관리를 위한 함수
 */
const setAuthHeader = (token: string) => {
  if (token) {
    client.defaults.headers['access-token'] = `${token}`;
    Cookies.remove('accessToken');
  } else {
    delete client.defaults.headers['access-token'];
  }
};

/**
 * 액세스 토큰 및 리프레시 토큰을 저장하는 함수
 */
const saveTokensToCookies = (accessToken: string, refreshToken: string) => {
  Cookies.set('accessToken', accessToken);
  Cookies.set('refreshToken', refreshToken);
};

/**
 * 액세스 토큰 및 리프레시 토큰을 불러오는 함수
 */
const getTokensFromCookies = () => {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
  return { accessToken, refreshToken };
};

/**
 * API 요청을 보내는 함수
 * @param config 는 axios 요청
 */
const sendRequest = async (config: any) => {
  try {
    return await client(config);
  } catch (error) {
    const axiosError = error as AxiosError; // AxiosError로 캐스팅
    if (axiosError.response && axiosError.response.status === 401) {
      // 만료된 액세스 ㅇ토큰일 경우 리프레시 토큰으로 갱신
      const { refreshToken } = getTokensFromCookies();
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

          // headers는 객체로 직접 접근
          const newAccessToken = response.headers['access-token'];
          const newRefreshToken = response.headers['refresh-token'];

          if (newAccessToken && newRefreshToken) {
            // 갱신된 토큰을 처리
            Cookies.remove('refreshToken');
            Cookies.remove('accessToken');
            setAuthHeader(newAccessToken);
            saveTokensToCookies(newAccessToken, newRefreshToken);

            // 이전 요청 재시도
            return await client({
              headers: {
                'Access-Token': newAccessToken,
              },
              method: config.method,
              data: config.data,
              url: config.url,
            });
          } else {
            console.error('새로운 토큰이 없습니다.');
          }
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

export const swrGetFetcher = async (url: any) => {
  const response = await sendRequest({
    headers: {
      'Access-Token': Cookies.get('accessToken'),
    },
    method: 'GET',
    url: url,
  });
  return response.data;
};

export { client, getTokensFromCookies, saveTokensToCookies, sendRequest, setAuthHeader };
