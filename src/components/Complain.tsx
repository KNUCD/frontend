import styled from 'styled-components';

const Complain: React.FC = () => {
  return (
    <StyledComplain>
      <div className={'content'}>
        <div className={'header'}>
          <div className={'profileImg'}></div>
          <div className={'data'}>
            <div className={'name'}>날으는 새</div>
            <div className={'date'}>2022-09-21 수</div>
          </div>
        </div>
        <div className={'body'}>쓰레기 불법투기 문제 개선방안 건의합니다!</div>
      </div>
      <div className={'img'}></div>
    </StyledComplain>
  );
};

const StyledComplain = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
  gap: 10px;
  border-top: solid 1px #ddd;
  & .content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    & .header {
      display: flex;
      gap: 10px;
      & .profileImg {
        width: 39px;
        height: 38px;
        border-radius: 100%;
        background: #ddd;
      }
      & .data {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 3px;
        & .name {
          font-weight: 700;
          font-size: 13px;
        }
        & .date {
          font-weight: 400;
          font-size: 12px;
        }
      }
    }
    & .body {
      font-weight: 700;
      font-size: 15px;
    }
  }
  & .img {
    width: 116px;
    height: 100%;
    max-height: 98px;
    background: #ddd;
  }
`;

export default Complain;
