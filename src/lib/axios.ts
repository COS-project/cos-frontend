import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_IP,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

export const swrGetFetcher = (url: string) => client.get(url).then((res) => res.data);

export { client };
