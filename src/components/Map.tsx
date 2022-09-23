import { useEffect, useRef, useState, SetStateAction, Dispatch } from 'react';
import { Map, MarkerClusterer, MapMarker } from 'react-kakao-maps-sdk';
import { useRecoilState, useRecoilValue } from 'recoil';
import { closeAtom, geolocationAtom, realTimeAtom } from 'others/stateStore';
import MapServices from './MapServices';
import { Category, Obj, Path } from 'others/IntegrateInterfaces';
import useInterval from 'use-interval';
import myAxios from 'others/myAxios';
import styled from 'styled-components';
import Pin from '/public/pin.svg';

interface MyMapProps {
  props: {
    path: Path;
    setPosData?: Dispatch<
      SetStateAction<{
        lat: number;
        lng: number;
      } | null>
    >;
    setChoicedPin?: Dispatch<SetStateAction<Category | null>>;
    choicedPin: Category | null;
  };
}

interface Pin {
  id: number;
  latitude: number;
  longitude: number;
  category: Category;
}

const MyMap: React.FC<MyMapProps> = ({ props: { path, setPosData, setChoicedPin, choicedPin } }) => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const myPos = useRecoilValue(geolocationAtom);
  const mapRef = useRef<kakao.maps.Map>(null);
  const [realTimeData, setRealTimeData] = useRecoilState(realTimeAtom);
  const { isRealTime, fixedPos } = realTimeData;
  const [closeData, setCloseData] = useRecoilState(closeAtom);
  const [category, setCategory] = useState<Category>('ALL');

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

  const handleRefreshPin = async () => {
    const res = await myAxios('get', `api/v1/complaint/pin?category=${category}`);
    setPins(res.data.response);
  };

  const handleTransform = () => {
    const { isMapPage, isClosed, isList } = closeData;
    if (!isMapPage) return '0';
    if (isClosed) return '0';
    if (isList) return '258px';
    return '231px';
  };

  useEffect(() => {
    window.kakao.maps.load(() => {
      setIsMapLoaded(true);
    });
    handleRefreshPin();
  }, []);

  useInterval(() => {
    handleRefreshPin();
  }, 10000);

  return (
    <>
      {isMapLoaded && (
        <>
          <StyledMap transform={handleTransform()}>
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
              {path === 'map' && (
                <MarkerClusterer
                  averageCenter={true}
                  disableClickZoom={true}
                  onClusterclick={onClusterClick}
                  calculator={[]}
                  styles={[
                    {
                      width: '32px',
                      height: '40px',
                      background: 'url("/cluster.svg")',
                      paddingTop: '3px',
                      color: '#fff',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      lineHeight: '31px',
                    },
                  ]}
                >
                  {pins.map((pin, index) => {
                    return (
                      <MapMarker
                        key={index}
                        position={{
                          lat: pin.latitude,
                          lng: pin.longitude,
                        }}
                        image={{
                          src: svgNameByCategory[pin.category],
                          size: {
                            width: 32,
                            height: 40,
                          },
                        }}
                        onClick={onMarkerClick}
                      ></MapMarker>
                    );
                  })}
                </MarkerClusterer>
              )}
            </Map>
          </StyledMap>
          <MapServices
            mapRef={mapRef}
            path={path}
            setPosData={setPosData}
            setChoicedPin={setChoicedPin}
            choicedPin={choicedPin}
          ></MapServices>
        </>
      )}
    </>
  );
};

interface StyledMapProps {
  transform: string;
}

const svgNameByCategory: Obj<string> = {
  LIFE: '/lifePin.svg',
  SECURITY: '/securityPin.svg',
  TRAFFIC: '/trafficPin.svg',
};

const StyledMap = styled.div<StyledMapProps>`
  position: absolute;
  top: 0;
  left: ${(props) => props.transform};
  width: 100vw;
  height: 100vh;
  transition: 1s;
`;

export default MyMap;
