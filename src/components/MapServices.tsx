import { useRouter } from 'next/router';
import { RefObject, Ref, Dispatch, SetStateAction } from 'react';
import { accessTokenAtom, closeAtom, geolocationAtom, realTimeAtom } from 'others/stateStore';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Pencil from '/public/pencil.svg';
import Plus from '/public/plus.svg';
import Minus from '/public/minus.svg';
import RealTime from '/public/realTime.svg';
import { colorByCategory, defaultPos, loginURL } from '../constants/default';
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
  const [closeData, setCloseData] = useRecoilState(closeAtom);
  const router = useRouter();
  const myPos = useRecoilValue(geolocationAtom);
  const [realTimeData, setRealTimeData] = useRecoilState(realTimeAtom);
  const { isRealTime, fixedPos } = realTimeData;
  const accessToken = useRecoilValue(accessTokenAtom);

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
    if (accessToken === '') {
      router.push(loginURL);
      return;
    }

    const tempData = { ...closeData };
    tempData.isMapPage = false;
    setCloseData(tempData);

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

  const handlePlus = () => {
    const map = mapRef.current;
    if (!map) return;
    const nowLevel = map.getLevel();
    map.setLevel(nowLevel - 1);
  };

  const handleMinus = () => {
    const map = mapRef.current;
    if (!map) return;
    const nowLevel = map.getLevel();
    map.setLevel(nowLevel + 1);
  };

  return (
    <StyledMapServices choicedPin={choicedPin ?? 'LIFE'}>
      <div className={'option'}>
        <button onClick={handleRealTimeValue}>
          <RealTime fill={isRealTime ? '#1A95FF' : '#4F4F4F'} />
        </button>
        <button onClick={handlePlus}>
          <Plus />
        </button>
        <button onClick={handleMinus}>
          <Minus />
        </button>
      </div>
      {path === 'map' && (
        <button className={'complain'} onClick={directToWritingPage}>
          <div>
            <Pencil fill={'#F5564E'} />
          </div>
          <p>민원 작성하기</p>
        </button>
      )}
      {path === 'writing' && choicedPin && (
        <>
          <button className={'selectPos'} onClick={handleWritingNextStep}>
            이 위치로 핀 찍기
          </button>
          <button className={'cancel'} onClick={() => router.back()}>
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
  & .option {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 16px;
    right: 16px;
    width: 48px;
    height: 144px;
    background: #ffffff;
    opacity: 0.9;
    filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.25));
    border-radius: 5px;
    z-index: 2;
    & > button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      outline: none;
      background: none;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
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
    display: flex;
    align-items: center;
    width: 124px;
    height: 48px;
    top: 16px;
    right: 80px;
    background: #fff;
    filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.25));
    border-radius: 5px;
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
    }
    & > p {
      position: relative;
      left: -4px;
      font-weight: 700;
      font-size: 12px;
      color: #4f4f4f;
    }
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
