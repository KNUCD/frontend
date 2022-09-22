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

  const onClusterClick = (_target: kakao.maps.MarkerClusterer, cluster: kakao.maps.Cluster) => {
    const map = mapRef.current;
    if (!map) return;
    const nowLevel = map?.getLevel();
    if (nowLevel < 4) {
      const bound = cluster.getBounds();
      // ha : 지도 좌측하단 위도
      // qa : 지도 좌측 하단 경도
      // oa : 지도 우측 상단 위도
      // pa : 지도 우측 상단 경도
    } else {
      const level = nowLevel - 1;
      map.setLevel(level, { anchor: cluster.getCenter() });
    }
  };

  const onMarkerClick = (_target: kakao.maps.Marker) => {
    const markerPos = _target.getPosition();
  };

  useEffect(() => {
    window.kakao.maps.load(() => {
      setIsMapLoaded(true);
    });
  }, []);

  return (
    <>
      {isMapLoaded && (
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
            {path === 'home' && (
              <MarkerClusterer
                averageCenter={true}
                disableClickZoom={true}
                onClusterclick={onClusterClick}
                calculator={[]}
                styles={[
                  {
                    width: '30px',
                    height: '30px',
                    background: '#ffd800',
                    borderRadius: '15px',
                    color: '#000',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    lineHeight: '31px',
                  },
                ]}
              >
                {pin.positions.map((pos, index) => {
                  return (
                    <MapMarker
                      key={index}
                      position={pos}
                      image={{
                        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
                        size: {
                          width: 44,
                          height: 49,
                        },
                      }}
                      onClick={onMarkerClick}
                    />
                  );
                })}
              </MarkerClusterer>
            )}
          </Map>
          <MapServices mapRef={mapRef} path={path} setPosData={setPosData}></MapServices>
        </>
      )}
    </>
  );
};

export default MyMap;
