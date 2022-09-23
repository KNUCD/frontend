import ComplainDetail from 'components/ComplainDetail';
import ComplainList from 'components/ComplainList';
import MyMap from 'components/Map';
import { closeAtom } from 'others/stateStore';
import { useRecoilValue } from 'recoil';
import { StyledPage } from '../../others/CommonStyles';

const MapPage: React.FC = () => {
  const closeData = useRecoilValue(closeAtom);
  const { isList } = closeData;

  return (
    <StyledPage>
      {!isList && <ComplainDetail />}
      {isList && <ComplainList />}
      <MyMap
        props={{
          path: 'map',
        }}
      />
    </StyledPage>
  );
};

export default MapPage;
