import { StyledPage } from '../../others/CommonStyles';
import Image from 'next/future/image';
import main from '../../../public/main.png';
import main2 from '../../../public/main2.png';
import styled from 'styled-components';
import Pencil from '/public/pencil.svg';
import MainIcon from '/public/mainIcon.svg';
import Burgar from '/public/burgar.svg';
import Location from '/public/location.svg';
import char from '../../../public/mainChar.png';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenAtom, closeAtom } from 'others/stateStore';
import { useRouter } from 'next/router';
import { loginURL } from 'constants/default';
import Nav from 'components/Nav';

const HomePage: React.FC = () => {
  const [closeData, setCloseData] = useRecoilState(closeAtom);
  const router = useRouter();
  const accessToken = useRecoilValue(accessTokenAtom);

  const handleCloseData = () => {
    const tempData = { ...closeData };
    tempData.isMapPage = false;
    setCloseData(tempData);
  };

  const handleLogin = () => {
    router.push(loginURL);
  };

  const handleRedirectToMap = () => {
    router.push('/map');
  };

  return (
    <StyledHomePage>
      <div className={'mobileHeader'}>
        <div>
          <MainIcon />
        </div>
        <div>{/* <Burgar /> */}</div>
      </div>
      <div>
        <h3>A pin for civil complain</h3>
        <h2>
          언제 어디서든
          <br />
          불편한 곳에
          <br />
          핀을 찍어 주세요!
        </h2>
        <div className={'char'}>
          <Char src={char} />
        </div>
        <p>
          손쉽고 직관적인 민원 제기 시스템을 통해 지역의 문제를 한눈에 파악하고
          <br />
          지역 주민들과 함께 해결책을 찾아나갈 수 있습니다.
        </p>
        <div>
          <Link href={'/map'} passHref>
            <StyledLink className={'writing'} onClick={handleRedirectToMap}>
              <div>
                <Location />
              </div>
              <p>지도로 가기</p>
            </StyledLink>
          </Link>
          {accessToken === '' ? (
            <button className={'redirect'} onClick={handleLogin}>
              로그인
            </button>
          ) : (
            <Link href={accessToken === '' ? '' : '/writing'} passHref>
              <StyledLink className={'redirect'} onClick={accessToken === '' ? handleLogin : handleCloseData}>
                <div>
                  <Pencil fill={'#f5564e'} />
                </div>
                <p>민원 작성하기</p>
              </StyledLink>
            </Link>
          )}
        </div>
      </div>

      <div className={'pad'}>
        <Main src={main2} />
      </div>
      <div className={'pc'}>
        <Main src={main} />
      </div>
    </StyledHomePage>
  );
};

const StyledLink = styled.a``;

const StyledHomePage = styled(StyledPage)`
  & .mobileHeader {
    display: none;
  }

  & > div {
    display: flex;
    position: absolute;
    flex-direction: column;
    z-index: 1;
    & > h3 {
      font-style: bold;
      font-size: 27px;
      color: #f5564e;
      margin-bottom: 30px;
    }
    & > h2 {
      font-style: 700;
      font-size: 84px;
      color: #333;
      margin-bottom: 50px;
      white-space: nowrap;
    }
    & > p {
      font-style: bold;
      font-size: 16px;
      color: #828282;
      margin-bottom: 70px;
      padding-right: 20px;
    }
    & > div {
      display: flex;
      gap: 14px;
      & > a {
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      & .writing {
        width: 190px;
        height: 58px;
        background: #f5564e;
        gap: 25px;
        & > p {
          color: #fff;
          font-weight: 700;
          font-size: 18px;
        }
      }
      & .redirect {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.25));
        width: 150px;
        height: 58px;
        color: #f5564e;
        font-weight: 700;
        font-size: 18px;
        background: #fff;
        border: none;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
  & .pad,
  .pc {
    width: 100%;
    padding: 0;
    height: 100vh;
    z-index: 0;
  }
  & .char {
    display: none;
  }

  @media (min-width: 1400px) {
    & > div {
      padding: 140px 130px;
    }
    & .pad {
      display: none;
    }
  }
  @media (max-width: 1399px) {
    & > div {
      padding: 70px 120px;
    }
    & .pc {
      display: none;
    }
  }
  @media (max-width: 600px) {
    & .mobileHeader {
      display: flex;
      flex-direction: row;
      position: absolute;
      justify-content: space-between;
      top: 0;
      left: 0;
      width: 100%;
      height: 50px;
      padding: 0 15px;
      z-index: 2;
      & > div {
        display: flex;
        align-items: center;
        height: 100%;
        cursor: pointer;
      }
    }
    & > div {
      width: 100%;
      padding: 70px 0 0 20px;
      & > h3 {
        font-size: 20px;
      }
      & > h2 {
        font-size: 47px;
      }
      & > p {
        width: 100%;
        word-break: break-all;
        margin-bottom: 60px;
        color: #333;
      }
    }

    /* & .writing {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 60% !important;
    }
    & .redirect {
      position: fixed;
      bottom: 0;
      right: 0;
      width: 40% !important;
    } */

    & .char {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      opacity: 0.3;
      margin-top: -100px;

      z-index: -1;
    }
  }
`;

const Char = styled(Image)`
  width: 100%;
  max-width: 300px;
`;

const Main = styled(Image)`
  width: 100%;
`;

export default HomePage;
