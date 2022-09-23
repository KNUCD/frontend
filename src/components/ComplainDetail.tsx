import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GoBack from '/public/goBack.svg';
import GoFront from '/public/goFront.svg';
import { useRecoilState } from 'recoil';
import { closeAtom } from 'others/stateStore';

const ComplainDetail: React.FC = () => {
  const [closeData, setCloseData] = useRecoilState(closeAtom);
  const { isClosed } = closeData;
  const comments = [
    {
      name: '곽나영',
      body: '지나갈 때마다 냄새가 너무 납니다. 게시판을 설치하거나 계단과 같이 입주민들이 주로 볼 수 있는 곳에 인식개선에 관련된 홍보물을 부착하시는 건 어떨까요?',
    },
    {
      name: '곽나영',
      body: '지나갈 때마다 냄새가 너무 납니다. 게시판을 설치하거나 계단과 같이 입주민들이 주로 볼 수 있는 곳에 인식개선에 관련된 홍보물을 부착하시는 건 어떨까요?',
    },
    {
      name: '곽나영',
      body: '지나갈 때마다 냄새가 너무 납니다. 게시판을 설치하거나 계단과 같이 입주민들이 주로 볼 수 있는 곳에 인식개선에 관련된 홍보물을 부착하시는 건 어떨까요?',
    },
  ];

  const handleClose = () => {
    const tempData = { ...closeData };
    tempData.isClosed = !closeData.isClosed;
    setCloseData(tempData);
  };

  useEffect(() => {
    const tempData = { ...closeData };
    tempData.isMapPage = true;
    tempData.isList = false;
    setCloseData(tempData);
  }, []);

  return (
    <StyledComplainDetail isClosed={isClosed}>
      <div className={'header'}>
        <div></div>
        <div></div>
      </div>
      <div className={'detail'}>
        <div className={'img'}></div>
        <div className={'title'}>쓰레기 불법투기 문제 개선방안 건의합니다!</div>
        <div className={'body'}>
          지나갈 때마다 냄새가 너무 납니다. 게시판을 설치하거나 계단과 같이 입주민들이 주로 볼 수 있는 곳에 인식개선에
          관련된 홍보물을 부착하시는 건 어떨까요?
        </div>
      </div>
      <div className={'subHeader'}>
        <div className={'img'}></div>
        <div className={'texts'}>
          <div className={'profile'}>
            <h3>곽나영</h3>
            <p>열정적인 활동가</p>
          </div>
          <div className={'date'}>
            <h3>건의 날짜</h3>
            <p>2022-09-21 수</p>
          </div>
          <div className={'state'}>
            <h3>답변 상태</h3>
            <p>검토 중</p>
          </div>
        </div>
      </div>
      <div className={'empathy'}></div>
      <div className={'comments'}>
        {comments.map(({ name, body }, index) => {
          return (
            <Comment key={index}>
              <h3>{name}</h3>
              <p>{body}</p>
              <h4>답글달기</h4>
            </Comment>
          );
        })}
      </div>
      <div className={'commentForm'}>
        <div className={'input'}></div>
        <div className={'emotion'}></div>
      </div>
      <div className={'close'} onClick={handleClose}>
        {isClosed ? <GoFront /> : <GoBack />}
      </div>
    </StyledComplainDetail>
  );
};

interface StyledComplainDetailProps {
  isClosed: boolean;
}

const StyledComplainDetail = styled.div<StyledComplainDetailProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 463px;
  min-width: 463px;
  height: 100%;
  background: #fff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  z-index: 2;
  transform: ${(props) => (props.isClosed ? 'translateX(-100%)' : 'translateX(0)')};
  transition: 1s;
  & > .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 110px;
    & > div {
      margin: 21px 31px;
      width: 45px;
      height: 45px;
      background: #ddd;
    }
  }
  & > .detail {
    width: 100%;
    & > div {
      width: 100%;
    }
    & .img {
      width: 100%;
      height: 279px;
      background: #aaa;
    }
    & .title {
      padding: 20px 30px 0 30px;
      font-weight: 700;
      font-size: 20px;
    }
    & .body {
      padding: 13px 30px 30px 30px;
      font-weight: 400;
      font-size: 14px;
    }
  }
  & > .subHeader {
    display: flex;
    width: 100%;
    height: 50px;
    gap: 12px;
    padding: 0 30px;
    margin-bottom: 40px;
    & .img {
      width: 52px;
      min-width: 52px;
      height: 50px;
      background: #ddd;
      border-radius: 100%;
    }
    & .texts {
      display: flex;
      width: 100%;
      & > div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        padding: 5px;
        & h3 {
          font-weight: 700;
          font-size: 13px;
        }
        & p {
          font-weight: 400;
          font-size: 12px;
        }
      }
    }
  }
  & > .empathy {
    width: 100%;
    min-height: 70px;
    background: #eee;
    margin-bottom: 20px;
  }
  & > .comments {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  & > .commentForm {
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 70px;
    z-index: 2;
    gap: 17px;
    background: #efefef;
    & .input {
      width: 344px;
      height: 45px;
      background: #ccc;
    }
    & .emotion {
      width: 45px;
      height: 45px;
      background: #ccc;
    }
  }
  & .close {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: calc(50% - 30px);
    right: -20px;
    width: 20px;
    height: 60px;
    background: #fff;
    border-radius: 0px 3px 3px 0px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    z-index: 3;
    cursor: pointer;
  }
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 30px;
  & h3 {
    font-weight: 700;
    font-size: 13px;
    margin-bottom: 7px;
  }
  & p {
    font-weight: 400;
    font-size: 14px;
  }
  & h4 {
    position: relative;
    font-weight: 400;
    font-size: 12px;
    text-align: right;
  }
`;

export default ComplainDetail;
