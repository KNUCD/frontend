import styled from 'styled-components';
import Complain from './Complain';

const ComplainList: React.FC = () => {
  return (
    <StyledComplainList>
      <ComplainListHeader>
        <div className={'searchBar'}></div>
        <div className={'btn'}></div>
      </ComplainListHeader>
      <Complains>
        <Complain></Complain>
        <Complain></Complain>
        <Complain></Complain>
      </Complains>
    </StyledComplainList>
  );
};

const StyledComplainList = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
  height: 100%;
`;

const ComplainListHeader = styled.div`
  display: flex;
  padding: 20px;
  gap: 13px;
  & > .searchBar {
    width: 350px;
    height: 45px;
    background: #ddd;
  }
  & > .btn {
    width: 45px;
    height: 45px;
    background: #ddd;
  }
`;

const Complains = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 28px;
`;

export default ComplainList;
