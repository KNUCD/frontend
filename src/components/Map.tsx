import { useEffect, useRef, useState, SetStateAction, Dispatch } from 'react';
import { Map, MarkerClusterer, MapMarker } from 'react-kakao-maps-sdk';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { closeAtom, detailAtom, geolocationAtom, listAtom, realTimeAtom } from 'others/stateStore';
import MapServices from './MapServices';
import { Category, Obj, Path } from 'others/IntegrateInterfaces';
import useInterval from 'use-interval';
import myAxios from 'others/myAxios';
import styled from 'styled-components';
import Pin from '/public/pin.svg';
import { defaultPos } from 'constants/default';

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
    choicedPin?: Category | null;
    isWriting?: boolean;
    posData?: {
      lat: number;
      lng: number;
    } | null;
  };
}

interface Pin {
  id: number;
  latitude: number;
  longitude: number;
  category: Category;
}

interface Bound {
  ha: number;
  qa: number;
  oa: number;
  pa: number;
}

const MyMap: React.FC<MyMapProps> = ({
  props: { path, setPosData, setChoicedPin, choicedPin, isWriting = false, posData },
}) => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const myPos = useRecoilValue(geolocationAtom);
  const mapRef = useRef<kakao.maps.Map>(null);
  const [realTimeData, setRealTimeData] = useRecoilState(realTimeAtom);
  const { isRealTime, fixedPos } = realTimeData;
  const [closeData, setCloseData] = useRecoilState(closeAtom);
  const [listData, setListData] = useRecoilState(listAtom);
  const setDetailAtom = useSetRecoilState(detailAtom);

  const onClusterClick = async (_target: kakao.maps.MarkerClusterer, cluster: kakao.maps.Cluster) => {
    const map = mapRef.current;
    if (!map) return;
    const nowLevel = map?.getLevel();
    if (nowLevel < 6) {
      const bound = Object(cluster.getBounds());
      // ha : 지도 좌측 하단 경도
      // qa : 지도 좌측 하단 위도
      // oa : 지도 우측 상단 경도
      // pa : 지도 우측 상단 위도
      const { ha, qa, oa, pa } = bound;
      const tempListData = { ...listData };

      tempListData.ha = ha;
      tempListData.qa = qa;
      tempListData.oa = oa;
      tempListData.pa = pa;
      setListData(tempListData);

      const tempData = { ...closeData };
      tempData.isClosed = false;
      tempData.isList = true;
      setCloseData(tempData);
    } else {
      const level = nowLevel - 1;
      map.setLevel(level, { anchor: cluster.getCenter() });
    }
  };

  const onMarkerClick = (_target: kakao.maps.Marker, id: number) => {
    // const markerPos = _target.getPosition();
    setDetailAtom({
      id,
    });
    const tempData = { ...closeData };
    tempData.isList = false;
    tempData.isClosed = false;
    setCloseData(tempData);
  };

  const handleRefreshPin = async () => {
    const res = await myAxios('get', `api/v1/complaint/pin?category=${listData.category}`);
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

  useEffect(() => {
    handleRefreshPin();
  }, [listData.category]);

  useInterval(() => {
    handleRefreshPin();
  }, 10000);

  return (
    <>
      {isMapLoaded && (
        <>
          <StyledMap transform={handleTransform()} isWriting={isWriting}>
            <Map
              center={isWriting ? posData ?? defaultPos : isRealTime ? myPos : fixedPos}
              draggable={isWriting ? false : true}
              zoomable={isWriting ? false : true}
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
                        onClick={(marker) => onMarkerClick(marker, pin.id)}
                      ></MapMarker>
                    );
                  })}
                </MarkerClusterer>
              )}
            </Map>
          </StyledMap>
          {!isWriting && (
            <MapServices
              mapRef={mapRef}
              path={path}
              setPosData={setPosData}
              setChoicedPin={setChoicedPin}
              choicedPin={choicedPin ?? null}
            ></MapServices>
          )}
        </>
      )}
    </>
  );
};

interface StyledMapProps {
  transform: string;
  isWriting: boolean;
}

const svgNameByCategory: Obj<string> = {
  LIFE: '/lifePin.svg',
  SECURITY: '/securityPin.svg',
  TRAFFIC: '/trafficPin.svg',
};

const StyledMap = styled.div<StyledMapProps>`
  position: ${(props) => (props.isWriting ? '' : 'absolute')};
  top: 0;
  left: ${(props) => props.transform};
  width: ${(props) => (props.isWriting ? '100%' : '100vw')};
  height: ${(props) => (props.isWriting ? '250px' : '100vh')};
  transition: 1s;
`;

export default MyMap;
