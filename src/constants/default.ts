import { Obj } from '../others/IntegrateInterfaces';

export const defaultPos = {
  lat: 35.888836,
  lng: 128.6102997,
};

export const colorByCategory: Obj<string> = {
  LIFE: '#F5564E',
  SECURITY: '#2E3192',
  TRAFFIC: '#662D91',
};

export const getDayOfWeek = (date: string) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[new Date(date).getDay()];
  return dayOfWeek;
};

export const convertToHttps = (url: string) => {
  if (url.includes('https')) return url;
  const res = url.replace('http', 'https');
  return res;
};

export const loginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code`;
