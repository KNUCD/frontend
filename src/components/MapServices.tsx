import { useRouter } from 'next/router';
import { RefObject, Ref, Dispatch, SetStateAction } from 'react';
import { geolocationAtom, realTimeAtom } from 'others/stateStore';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { defaultPos } from 'constants/default';
import { Path } from 'others/IntegrateInterfaces';

interface MapServicesProps {
  mapRef: RefObject<kakao.maps.Map>;
  path: Path;
  setPosData?: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    } | null>
  >;
}

const MapServices: React.FC<MapServicesProps> = ({ mapRef, path, setPosData }) => {
  const router = useRouter();
  const myPos = useRecoilValue(geolocationAtom);
  const [realTimeData, setRealTimeData] = useRecoilState(realTimeAtom);
  const { isRealTime, fixedPos } = realTimeData;
  const handleRealTimeValue = () => {
    const map = mapRef.current;
    if (!isRealTime) {
      const moveLatLng = new kakao.maps.LatLng(myPos.lat, myPos.lng);
      map?.setCenter(moveLatLng);
    }
    setRealTimeData({
      isRealTime: !isRealTime,
      fixedPos: isRealTime
        ? myPos
        : {
            lat: map?.getCenter().getLat() ?? defaultPos.lat,
            lng: map?.getCenter().getLng() ?? defaultPos.lng,
          },
    });
  };

  const directToWritingPage = () => {
    if (!isRealTime) {
      const map = mapRef.current;
      setRealTimeData({
        isRealTime,
        fixedPos: {
          lat: map?.getCenter().getLat() ?? defaultPos.lat,
          lng: map?.getCenter().getLng() ?? defaultPos.lng,
        },
      });
    }
    router.push('/writing');
  };

  const handleWritingNextStep = () => {
    if (!setPosData) return;
    const map = mapRef.current;
    setPosData({
      lat: map?.getCenter().getLat() ?? defaultPos.lat,
      lng: map?.getCenter().getLng() ?? defaultPos.lng,
    });
  };

  return (
    <StyledMapServices>
      <button
        className={`realTimeBtn ${isRealTime ? 'realTime' : 'nonRealTime'}`}
        onClick={handleRealTimeValue}
      ></button>
      {path === 'map' && (
        <button className={'complain'} onClick={directToWritingPage}>
          민원 넣기
        </button>
      )}
      {path === 'writing' && (
        <button className={'complainPosBtn'} onClick={handleWritingNextStep}>
          이 위치에 민원 넣기
        </button>
      )}
    </StyledMapServices>
  );
};

const StyledMapServices = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  & > button {
    position: absolute;
    z-index: 2;
    cursor: pointer;
    outline: none;
    border: none;
  }
  & .realTimeBtn {
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    z-index: 2;
  }
  & .realTime {
    background: #aaa;
  }
  & .nonRealTime {
    background: red;
  }
  & .complain {
    top: 20px;
    right: 90px;
    width: 50px;
    height: 50px;
  }
  & .complainPosBtn {
    position: fixed;
    bottom: 40px;
    left: calc(50% - 200px);
    width: 400px;
    height: 40px;
    background: #ffd800;
    outline: none;
    border: none;
    z-index: 2;
  }
`;

export default MapServices;
