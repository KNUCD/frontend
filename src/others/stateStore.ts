import { defaultPos } from 'constants/default';
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

export { geolocationAtom, realTimeAtom };
