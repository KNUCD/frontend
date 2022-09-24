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
    isList: false,
  },
});

const detailAtom = atom({
  key: 'detail',
  default: {
    id: -1,
  },
});

const listAtom = atom({
  key: 'list',
  default: {
    category: 'ALL',
    ha: defaultPos.lat - 1,
    qa: defaultPos.lng - 1,
    oa: defaultPos.lat + 1,
    pa: defaultPos.lng + 1,
  },
});

const categoryAtom = atom({
  key: 'category',
  default: 'ALL',
});

export { geolocationAtom, realTimeAtom, closeAtom, categoryAtom, detailAtom, listAtom };
