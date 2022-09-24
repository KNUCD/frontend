import myAxios from 'others/myAxios';
import { accessTokenAtom, geolocationAtom, isReadyAtom } from 'others/stateStore';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useInterval from 'use-interval';
import { useRouter } from 'next/router';

const Checker: React.FC = () => {
  const setGeolocationData = useSetRecoilState(geolocationAtom);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [isReady, setIsReady] = useRecoilState(isReadyAtom);
  const router = useRouter();

  const checkLogin = async () => {
    try {
      const res = await myAxios('post', 'api/v1/auth/account-token', null, true);
      setAccessToken(res.data.response.accessToken);
    } catch (e) {
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
    };

    const error = () => {
      console.log('error');
    };

    const success = (pos: any) => {
      const crd = pos.coords;
      setGeolocationData({
        lat: crd.latitude,
        lng: crd.longitude,
      });
    };
    navigator.geolocation.watchPosition(success, error, options);
  }, []);

  useEffect(() => {
    checkLogin();
  }, []);

  useInterval(() => {
    checkLogin();
  }, REFRESH_ACCESS_TOKEN_TIME);

  useEffect(() => {
    if (!isReady) return;
    if (accessToken === '') {
      if (router.pathname !== '/' && router.pathname !== '/map') {
        router.push('/');
      }
    } else {
      if (router.pathname !== '/' && router.pathname !== '/map' && router.pathname !== '/writing') {
        router.push('/');
      }
    }
  }, [isReady, router.pathname, accessToken]);

  return <></>;
};

const REFRESH_ACCESS_TOKEN_TIME = 5000000;

export default Checker;
