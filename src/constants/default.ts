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
