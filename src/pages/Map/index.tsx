import ComplainDetail from 'components/ComplainDetail';
import ComplainList from 'components/ComplainList';
import MyMap from 'components/Map';
import { StyledPage } from '../../others/CommonStyles';

const MapPage: React.FC = () => {
  return (
    <StyledPage>
      {/* <ComplainDetail /> */}
      <ComplainList />
      <MyMap
        props={{
          path: 'home',
        }}
      />
    </StyledPage>
  );
};

export default MapPage;
