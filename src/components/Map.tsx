import { useEffect, useRef, useState } from 'react';
import { Map, MarkerClusterer, MapMarker } from 'react-kakao-maps-sdk';
import { useRecoilValue } from 'recoil';
import { geolocationAtom } from 'others/stateStore';
import { pin } from 'constants/pin';

const MyMap: React.FC = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const myPos = useRecoilValue(geolocationAtom);
  const map = useRef();
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
        >
          <MarkerClusterer>
            {pin.positions.map((pos) => {
              return <MapMarker key={`${pos.lat}-${pos.lng}`} position={pos} />;
            })}
          </MarkerClusterer>
        </Map>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyMap;
