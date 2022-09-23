import { StyledPage } from '../../others/CommonStyles';
import Image from 'next/future/image';
import main from '../../../public/main.png';
import main2 from '../../../public/main2.png';
import styled from 'styled-components';
import Pencil from '/public/pencil.svg';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <StyledHomePage>
      <div>
        <h3>A pin for civil complain</h3>
        <h2>
          언제 어디서든
          <br />
          불편한 곳에
          <br />
          핀을 찍어 주세요!
        </h2>
        <p>
          손쉽고 직관적인 민원 제기 시스템을 통해 지역의 문제를 한눈에 파악하고
          <br />
          지역 주민들과 함께 해결책을 찾아나갈 수 있습니다.
        </p>
        <div>
          <Link href={'/writing'} passHref>
            <StyledLink className={'writing'}>
              <div>
                <Pencil />
              </div>
              <p>민원 작성하기</p>
            </StyledLink>
          </Link>
          <Link href={'/sign'} passHref>
            <StyledLink className={'login'}>로그인</StyledLink>
          </Link>
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
      & .login {
        filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.25));
        width: 150px;
        height: 58px;
        color: #f5564e;
        font-weight: 700;
        font-size: 18px;
        background: #fff;
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

  @media (min-width: 1500px) {
    & > div {
      padding: 140px 130px;
    }
    & .pad {
      display: none;
    }
  }
  @media (max-width: 1499px) {
    & > div {
      padding: 70px 120px;
    }
    & .pc {
      display: none;
    }
  }
`;

const Main = styled(Image)`
  width: 100%;
`;

export default HomePage;
