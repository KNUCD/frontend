import styled from 'styled-components';
import Icon from '/public/icon.svg';
import Home from '/public/home.svg';
import Map from '/public/map.svg';
import Complains from '/public/complains.svg';
import Ideas from '/public/ideas.svg';
import Profile from '/public/profile.svg';
import Setting from '/public/setting.svg';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ACTIVE = '#F5564E',
  NON_ACTIVE = '#828282';

const Nav: React.FC = () => {
  const router = useRouter();

  return (
    <StyledNav>
      <div className={'icon'}>
        <Icon />
      </div>
      <div className={'router'}>
        <Link href={'/'} passHref>
          <StyledLink>
            <Home fill={router.asPath === '/' ? ACTIVE : NON_ACTIVE} />
            <StyledBar fill={router.asPath === '/' ? ACTIVE : NON_ACTIVE} />
          </StyledLink>
        </Link>
        <Link href={'/map'} passHref>
          <StyledLink>
            <Map fill={router.asPath === '/map' ? ACTIVE : NON_ACTIVE} />
            <StyledBar fill={router.asPath === '/map' ? ACTIVE : NON_ACTIVE} />
          </StyledLink>
        </Link>
        <Link href={''} passHref>
          <StyledLink>
            <Complains fill={router.asPath === '/complains' ? ACTIVE : NON_ACTIVE} />
            <StyledBar fill={router.asPath === '/complains' ? ACTIVE : NON_ACTIVE} />
          </StyledLink>
        </Link>
        <Link href={''} passHref>
          <StyledLink>
            <Ideas fill={router.asPath === '/ideas' ? ACTIVE : NON_ACTIVE} />
            <StyledBar fill={router.asPath === '/ideas' ? ACTIVE : NON_ACTIVE} />
          </StyledLink>
        </Link>
      </div>
      <div></div>
      <div className={'footer'}>
        <Link href={''} passHref>
          <StyledLink>
            <Profile fill={router.asPath === '/profile' ? ACTIVE : NON_ACTIVE} />
            <StyledBar fill={router.asPath === '/profile' ? ACTIVE : NON_ACTIVE} />
          </StyledLink>
        </Link>
        <Link href={''} passHref>
          <StyledLink>
            <Setting fill={router.asPath === '/setting' ? ACTIVE : NON_ACTIVE} />
            <StyledBar fill={router.asPath === '/setting' ? ACTIVE : NON_ACTIVE} />
          </StyledLink>
        </Link>
      </div>
    </StyledNav>
  );
};

interface StyledBarProps {
  fill: string;
}

const StyledLink = styled.a``;

const StyledBar = styled.div<StyledBarProps>`
  display: ${(props) => (props.fill === ACTIVE ? '' : 'none')};
  position: absolute;
  right: 0;
  width: 3px;
  height: 30px;
  background: ${(props) => props.fill};
`;

const StyledNav = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 70px;
  height: 100%;
  background: #fff;
  z-index: 3;
  border-right: 1px solid #e0e0e0;

  & > div,
  .router > a,
  .footer > a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70px;
    cursor: pointer;
  }
  & .router,
  .footer {
    display: flex;
    flex-direction: column;
  }
  & .router {
    height: 280px;
  }
  & .footer {
    border-top: 1px solid #e0e0e0;
    height: 140px;
  }
  & .icon {
    cursor: inherit;
  }

  @media (max-width: 600px) {
  }
`;

export default Nav;
