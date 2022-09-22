import { useEffect, useRef, useState } from 'react';
import { Map, MarkerClusterer, MapMarker } from 'react-kakao-maps-sdk';
import { useRecoilState, useRecoilValue } from 'recoil';
import { geolocationAtom, realTimeAtom } from 'others/stateStore';
import { pin } from 'constants/pin';
import MapServices from './MapServices';
import { Path } from 'others/IntegrateInterface';

interface MyMapProps {
  props: {
    path: Path;
    setPosData?: Function;
  };
}

const MyMap: React.FC<MyMapProps> = ({ props: { path, setPosData } }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const myPos = useRecoilValue(geolocationAtom);
  const mapRef = useRef<kakao.maps.Map>(null);
  const [realTimeData, setRealTimeData] = useRecoilState(realTimeAtom);
  const { isRealTime, fixedPos } = realTimeData;
  useEffect(() => {
    window.kakao.maps.load(() => {
      setIsMapLoaded(true);
    });
  }, []);

  return (
    <>
      {isMapLoaded ? (
        <>
          <Map
            center={isRealTime ? myPos : fixedPos}
            style={{
              width: '100%',
              height: '100%',
            }}
            level={3}
            ref={mapRef}
            onCenterChanged={() => {
              if (isRealTime) {
                setRealTimeData({
                  isRealTime: false,
                  fixedPos: myPos,
                });
              }
            }}
          >
            {path === 'home' ? (
              <MarkerClusterer>
                {pin.positions.map((pos, index) => {
                  return <MapMarker key={index} position={pos} />;
                })}
              </MarkerClusterer>
            ) : (
              <></>
            )}
          </Map>
          <MapServices mapRef={mapRef} path={path} setPosData={setPosData}></MapServices>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyMap;
