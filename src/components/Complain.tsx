import styled from 'styled-components';
import Pin from '/public/pin.svg';
import Option from '/public/option.svg';
import Good from '/public/good.svg';
import Bad from '/public/bad.svg';
import Amazing from '/public/amazing.svg';
import Heart from '/public/heart.svg';
import BigGood from '/public/bigGood.svg';
import BigBad from '/public/bigBad.svg';
import BigAmazing from '/public/bigAmazing.svg';
import Comment from '/public/comment.svg';
import Share from '/public/share.svg';
import Image from 'next/image';
import { Category, Emotion } from 'others/IntegrateInterfaces';
import { colorByCategory, getDayOfWeek } from 'constants/default';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenAtom, closeAtom, detailAtom, isReadyAtom } from 'others/stateStore';
import { useEffect, useState } from 'react';
import myAxios from 'others/myAxios';

interface ComplainProps {
  category: Category;
  content: string;
  createdDate: string;
  file: string | null;
  id: number;
  title: string;
  writerName: string;
}

const Complain: React.FC<ComplainProps> = ({ category, content, createdDate, file, id, title, writerName }) => {
  const processedCreatedDate = createdDate.substr(0, 10);
  const [closeData, setCloseData] = useRecoilState(closeAtom);
  const setDetailId = useSetRecoilState(detailAtom);
  const [emotionData, setEmotionData] = useState({
    amazingCount: 0,
    badCount: 0,
    goodCount: 0,
  });
  const [myEmotion, setMyEmotion] = useState<Emotion | null>(null);
  const accessToken = useRecoilValue(accessTokenAtom);
  const isReady = useRecoilValue(isReadyAtom);

  const handleDetail = () => {
    const tempData = { ...closeData };
    tempData.isClosed = false;
    tempData.isList = false;
    setCloseData(tempData);
    setDetailId({
      id,
    });
  };

  const getEmotion = async () => {
    if (isReady) {
      const res = await myAxios('get', `api/v1/expression/${id}`);
      setEmotionData(res.data.response);

      const myRes = await myAxios('get', `api/v1/expression/${id}/me`, undefined, true, accessToken);
      setMyEmotion(myRes.data.response);
    }
  };

  useEffect(() => {
    getEmotion();
  }, [isReady]);

  return (
    <StyledComplain onClick={handleDetail}>
      <div className={'title'}>
        <div>
          <Pin fill={`${colorByCategory[category]}`} />
        </div>
        <p>{title}</p>
      </div>

      <div className={'header'}>
        <div className={'profile'}>
          <div className={'img'}></div>
          <div className={'texts'}>
            <h3>{writerName}</h3>
            <p>{`${processedCreatedDate} ${getDayOfWeek(processedCreatedDate)}`}</p>
          </div>
        </div>
        <div className={'option'}>
          <Option />
        </div>
      </div>

      <div className={'content'}>
        {content.length > 74 ? (
          <>
            <h3>{`${content.substr(0, 74)}...`}</h3>
            <p>자세히보기</p>
          </>
        ) : (
          <h3>{content}</h3>
        )}
        {file && <Image src={file ?? ''} width="100%" height="100%" layout="responsive" objectFit="contain" />}
        <div className={'interaction'}>
          <div>
            <div>
              <div>
                <Good />
              </div>
              <p>{emotionData.goodCount}</p>
            </div>
            <div>
              <div>
                <Bad />
              </div>
              <p>{emotionData.badCount}</p>
            </div>
            <div>
              <div>
                <Amazing />
              </div>
              <p>{emotionData.amazingCount}</p>
            </div>
          </div>
          <p>공유 23회</p>
        </div>
      </div>

      <div className={'footer'}>
        {!myEmotion && (
          <button>
            <div>
              <Heart />
            </div>
            <p>감정 남기기</p>
          </button>
        )}
        {myEmotion === 'GOOD' && (
          <button>
            <div>
              <BigGood fill={'#F5564E'} />
            </div>
            <p>좋아요</p>
          </button>
        )}
        {myEmotion === 'BAD' && (
          <button>
            <div>
              <BigBad fill={'#F5564E'} />
            </div>
            <p>화나요</p>
          </button>
        )}
        {myEmotion === 'AMAZING' && (
          <button>
            <div>
              <BigAmazing fill={'#F5564E'} />
            </div>
            <p>놀라워요</p>
          </button>
        )}
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
  cursor: pointer;

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
