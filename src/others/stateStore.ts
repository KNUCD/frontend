import { defaultPos } from '../constants/default';
import { atom } from 'recoil';

const geolocationAtom = atom({
  key: 'geolocation',
  default: {
    lat: defaultPos.lat,
    lng: defaultPos.lng,
  },
});

const realTimeAtom = atom({
  key: 'realTime',
  default: {
    isRealTime: true,
    fixedPos: {
      lat: defaultPos.lat,
      lng: defaultPos.lng,
    },
  },
});

const closeAtom = atom({
  key: 'close',
  default: {
    isMapPage: false,
    isClosed: false,
    isList: true,
  },
});

const detailAtom = atom({
  key: 'detail',
  default: {
    id: 1,
  },
});

const listAtom = atom({
  key: 'list',
  default: {
    category: 'ALL',
    ha: defaultPos.lng - 1,
    qa: defaultPos.lat - 1,
    oa: defaultPos.lng + 1,
    pa: defaultPos.lat + 1,
  },
});

const accessTokenAtom = atom({
  key: 'accessToken',
  default: '',
});

const isReadyAtom = atom({
  key: 'isReady',
  default: false,
});

export { geolocationAtom, realTimeAtom, closeAtom, detailAtom, listAtom, accessTokenAtom, isReadyAtom };
