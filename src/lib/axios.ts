import axios from 'axios';

const client = axios.create({
  baseURL: 'http://cercat.p-e.kr/api/v1',
  headers: {
    'Content-type': 'application/json',
    'Access-Token':
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0dVRVNUIl0sImVtYWlsIjoidGtkZ2g2NDI3QG5hdmVyLmNvbSIsInN1YiI6InRrZGdoNjQyN0BuYXZlci5jb20iLCJpYXQiOjE3MDc5OTM0NzAsImV4cCI6MTcwODI1MjY3MH0.L6_y1MFe7pEshx5T1ML0ed7S3p_cAWVT98p_x3xP54s',
  },
  withCredentials: true,
});
export const swrGetFetcher = (url: string) => client.get(url).then((res) => res.data);

export { client };
