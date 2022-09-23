import { useRouter } from 'next/router';
import { RefObject, Ref, Dispatch, SetStateAction } from 'react';
import { geolocationAtom, realTimeAtom } from 'others/stateStore';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { colorByCategory, defaultPos } from '../constants/default';
import { Category, Path } from 'others/IntegrateInterfaces';

interface MapServicesProps {
  mapRef: RefObject<kakao.maps.Map>;
  path: Path;
  setPosData?: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    } | null>
  >;
  setChoicedPin?: Dispatch<SetStateAction<Category | null>>;
  choicedPin: Category | null;
}

const MapServices: React.FC<MapServicesProps> = ({ mapRef, path, setPosData, setChoicedPin, choicedPin }) => {
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

  const handleBackToChoice = () => {
    if (!setChoicedPin) return;
    setChoicedPin(null);
  };

  return (
    <StyledMapServices choicedPin={choicedPin ?? 'LIFE'}>
      <button
        className={`realTimeBtn ${isRealTime ? 'realTime' : 'nonRealTime'}`}
        onClick={handleRealTimeValue}
      ></button>
      {path === 'map' && (
        <button className={'complain'} onClick={directToWritingPage}>
          민원 넣기
        </button>
      )}
      {path === 'writing' && choicedPin && (
        <>
          <button className={'selectPos'} onClick={handleWritingNextStep}>
            이 위치로 핀 찍기
          </button>
          <button className={'cancel'} onClick={handleBackToChoice}>
            취소하기
          </button>
        </>
      )}
    </StyledMapServices>
  );
};

interface StyledMapServicesProps {
  choicedPin: Category;
}

const StyledMapServices = styled.div<StyledMapServicesProps>`
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

  & .selectPos {
    position: absolute;
    right: 180px;
    bottom: 30px;
    width: 278px;
    height: 48px;
    background: ${(props) => colorByCategory[props.choicedPin]};
    color: #fff;
    filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.25));
    border-radius: 5px;
    font-weight: 700;
    font-size: 20px;
  }

  & .cancel {
    position: absolute;
    right: 30px;
    bottom: 30px;
    width: 124px;
    height: 48px;
    background: #fff;
    outline: none;
    border: none;
    z-index: 2;
    filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.25));
    border-radius: 5px;
    color: ${(props) => colorByCategory[props.choicedPin]};
    font-weight: 700;
    font-size: 20px;
  }
`;

export default MapServices;
