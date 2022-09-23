import styled from 'styled-components';
import Pin from '/public/pin.svg';
import Option from '/public/option.svg';
import Good from '/public/good.svg';
import Bad from '/public/bad.svg';
import Amazing from '/public/amazing.svg';
import Heart from '/public/heart.svg';
import Comment from '/public/comment.svg';
import Share from '/public/share.svg';
import Image from 'next/image';

const Complain: React.FC = () => {
  return (
    <StyledComplain>
      <div className={'title'}>
        <div>
          <Pin fill={'#F5564E'} />
        </div>
        <p>쓰레기 불법투기 문제 개선방안 건의합니다!</p>
      </div>

      <div className={'header'}>
        <div className={'profile'}>
          <div className={'img'}></div>
          <div className={'texts'}>
            <h3>곽나영</h3>
            <p>2022-09-21 수</p>
          </div>
        </div>
        <div className={'option'}>
          <Option />
        </div>
      </div>

      <div className={'content'}>
        <h3>
          대성환경에너지(주)에서는 악취 발생의 주요 물질인 매립가스 포집을 이행하고 있으며, 매립가스 포집 배관의 막힘
          발생으로 인한 포집불량 지역에 대해서 호스...
        </h3>
        <p>자세히보기</p>
        <div className={'img'}></div>
        <div className={'interaction'}>
          <div>
            <div>
              <div>
                <Good />
              </div>
              <p>23</p>
            </div>
            <div>
              <div>
                <Bad />
              </div>
              <p>13</p>
            </div>
            <div>
              <div>
                <Amazing />
              </div>
              <p>87</p>
            </div>
          </div>
          <p>공유 23회</p>
        </div>
      </div>

      <div className={'footer'}>
        <button>
          <div>
            <Heart />
          </div>
          <p>감정 남기기</p>
        </button>
        <button>
          <div>
            <Comment />
          </div>
          <p>댓글달기</p>
        </button>
        <button>
          <div>
            <Share />
          </div>
          <p>공유하기</p>
        </button>
      </div>
    </StyledComplain>
  );
};

const StyledComplain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;

  & .title {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 25px 30px;
    gap: 20px;
    & > p {
      font-weight: 700;
      font-size: 24px;
      color: #000;
      white-space: nowrap;
    }
  }

  & .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & .option {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
    }
    & .profile {
      display: flex;
      gap: 7px;
      padding-left: 24px;
      & .img {
        width: 40px;
        height: 40px;
        background: #ddd;
        border-radius: 100%;
      }
      & .texts {
        display: flex;
        flex-direction: column;
        padding: 2px;
        gap: 3px;
        margin-bottom: 16px;
        & h3 {
          font-weight: 600;
          font-size: 14px;
        }
        & p {
          font-weight: 500;
          font-size: 14px;
          color: #828282;
        }
      }
    }
  }

  & .content {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    & > h3 {
      font-weight: 400;
      font-size: 14px;
      padding: 0 50px 0 24px;
      margin-bottom: 6px;
    }
    & > p {
      font-weight: 700;
      font-size: 12px;
      color: #333;
      margin-bottom: 22px;
      padding: 0 50px 0 24px;
      cursor: pointer;
    }
    & .img {
      width: 100%;
      height: 300px;
      background: #ddd;
    }
    & .interaction {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      padding: 0 15px 0 6px;
      & > div {
        display: flex;
        gap: 5px;
        & > div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 18px;
          padding: 2px 3px 2px 5px;
          background: #f2f2f2;
          border-radius: 9px;
          gap: 4px;
          & > div {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          & > p {
            font-weight: 300;
            font-size: 11px;
          }
        }
      }
      & > p {
        font-weight: 500;
        font-size: 11px;
        color: #333;
      }
    }
  }

  & .footer {
    display: flex;
    width: 100%;
    height: 50px;
    border-top: 1px solid #e0e0e0;

    & > button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      cursor: pointer;
      background: #fff;
      gap: 5px;
      & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
      }
      & > p {
        font-weight: 500;
        font-size: 12px;
        color: #828282;
      }
    }
  }
`;

export default Complain;
