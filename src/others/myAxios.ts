import axios from 'axios';
import { Obj } from './IntegrateInterfaces';

interface myAxiosFunc {
  (
    action: string,
    path: string,
    body?: object | null,
    withCredentials?: boolean,
    token?: string | undefined,
    contentType?: string
  ): Promise<any>;
}

interface myAxiosOption {
  headers: Obj<string>;
  withCredentials: boolean;
}

const myAxios: myAxiosFunc = async (
  action,
  path,
  body = null,
  withCredentials = false,
  token = undefined,
  contentType = 'application/json'
) => {
  const option: myAxiosOption = {
    headers: { 'Content-Type': contentType },
    withCredentials,
  };
  if (token) option.headers['Authorization'] = `Bearer ${token}`;
  switch (action) {
    case 'get':
      return await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}${path}`, option);
    case 'post':
      return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}${path}`, body, option);
    case 'put':
      return await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}${path}`, body, option);
    case 'delete':
      return await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}${path}`, option);
    default:
      return;
  }
};

export default myAxios;
