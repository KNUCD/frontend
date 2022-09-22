import ComplainDetail from 'components/ComplainDetail';
import ComplainList from 'components/ComplainList';
import MyMap from 'components/Map';
import { StyledPage } from '../../others/CommonStyles';

const HomePage: React.FC = () => {
  return (
    <StyledPage>
      {/* <ComplainDetail /> */}
      <ComplainList />
      <MyMap />
    </StyledPage>
  );
};

export default HomePage;
