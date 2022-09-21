import { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { useRecoilValue } from 'recoil';
import { geolocationAtom } from 'others/stateStore';

const MyMap: React.FC = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const myPos = useRecoilValue(geolocationAtom);
  useEffect(() => {
    window.kakao.maps.load(() => {
      setIsMapLoaded(true);
    });
  }, []);

  return (
    <>
      {isMapLoaded ? (
        <Map
          center={myPos}
          style={{
            width: '100%',
            height: '100%',
          }}
          level={2}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default MyMap;
