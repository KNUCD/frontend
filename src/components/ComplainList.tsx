import styled from 'styled-components';
import Complain from './Complain';
import Refresh from '/public/refresh.svg';
import Magnify from '/public/magnify.svg';
import Life from '/public/life.svg';
import Security from '/public/security.svg';
import Traffic from '/public/traffic.svg';

const ComplainList: React.FC = () => {
  return (
    <StyledComplainList>
      <ComplainListHeader>
        <div className={'upper'}>
          <p>민원 꾸러미</p>
          <div>
            <Refresh />
          </div>
        </div>
        <div className={'searchBar'}>
          <input type={'text'} placeholder={'궁금한 민원을 검색해주세요'} />
          <div>
            <Magnify />
          </div>
        </div>
        <div className={'category'}>
          <button className={'life'}>
            <div>
              <Life />
            </div>
            <p>생활불편</p>
          </button>
          <button className={'security'}>
            <div>
              <Security />
            </div>
            <p>사회안전</p>
          </button>
          <button className={'traffic'}>
            <div>
              <Traffic />
            </div>
            <p>교통불편</p>
          </button>
        </div>
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
  min-width: 517px;
  width: 517px;
  height: 100%;
  z-index: 2;
`;

const ComplainListHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 21px 21px 0 16px;
  background: #f3f4f7;
  & .upper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 18px;
    & > p {
      font-weight: 600;
      font-size: 24px;
    }
    & > div {
      display: flex;
    }
  }

  & .searchBar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    background: #fff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    margin-bottom: 15px;
    & > input {
      width: 100%;
      outline: none;
      border: none;
      padding: 0 15px;
    }
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
    }
  }

  & .category {
    display: flex;
    width: 100%;
    margin-bottom: 14px;
    gap: 9px;
    & > button {
      display: flex;
      align-items: center;
      width: 100%;
      height: 50px;
      outline: none;
      border: none;
      border-radius: 3px;
      padding-left: 15px;
      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
      }
      & > p {
        font-weight: 600;
        font-size: 16px;
        color: #fff;
      }
    }
    & .life {
      background: #f5564e;
    }
    & .security {
      background: #2e3192;
    }
    & .traffic {
      background: #662d91;
    }
  }
`;

const Complains = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 28px;
`;

export default ComplainList;
