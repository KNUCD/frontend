import { geolocationAtom } from 'others/stateStore';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const Checker: React.FC = () => {
  const setGeolocationData = useSetRecoilState(geolocationAtom);

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
  return <></>;
};

export default Checker;
