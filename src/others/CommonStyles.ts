import styled from 'styled-components';

export const StyledPage = styled.div`
  display: flex;
  margin-left: 70px;
  width: calc(100% - 70px);
  height: 100%;
  @media (max-width: 600px) {
    margin-left: 0;
    width: 100%;
  }
`;
