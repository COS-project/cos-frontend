import axios from 'axios';

const client = axios.create({
  baseURL: 'http://cercat.p-e.kr/api/v1',
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

export const swrGetFetcher = (url: string) => client.get(url).then((res) => res.data);

export { client };
