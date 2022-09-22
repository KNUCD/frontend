import styled from 'styled-components';

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <div></div>
      <div></div>
    </StyledNav>
  );
};

const StyledNav = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 90px;
  height: 100%;
  background: #fff;
  z-index: 2;
  & > div {
    width: 100%;
    height: 180px;
    background: #ddd;
    margin: 90px 0;
  }
`;

export default Nav;
