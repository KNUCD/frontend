import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GoBack from '/public/goBack.svg';
import GoFront from '/public/goFront.svg';
import Back from '/public/back.svg';
import Good from '/public/good.svg';
import Bad from '/public/bad.svg';
import Amazing from '/public/amazing.svg';
import BigGood from '/public/bigGood.svg';
import BigBad from '/public/bigBad.svg';
import BigAmazing from '/public/bigAmazing.svg';
import OptionalPin from '/public/optionalPin.svg';
import Option from '/public/option.svg';
import Heart from '/public/heart.svg';
import CommentIcon from '/public/comment.svg';
import Share from '/public/share.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenAtom, closeAtom, detailAtom, isReadyAtom } from 'others/stateStore';
import myAxios from 'others/myAxios';
import { colorByCategory, getDayOfWeek } from 'constants/default';
import { Category, Emotion } from 'others/IntegrateInterfaces';
import Image from 'next/image';

interface detailDataProps {
  category: Category;
  content: string;
  createdDate: string;
  file: string | null;
  title: string;
  writerName: string;
}

const ComplainDetail: React.FC = () => {
  const [closeData, setCloseData] = useRecoilState(closeAtom);
  const { isClosed } = closeData;
  const { id } = useRecoilValue(detailAtom);
  const [detailData, setDetailData] = useState<detailDataProps>();
  const isReady = useRecoilValue(isReadyAtom);
  const [emotionData, setEmotionData] = useState({
    amazingCount: 0,
    badCount: 0,
    goodCount: 0,
  });
  const [myEmotion, setMyEmotion] = useState<Emotion | null>(null);
  const accessToken = useRecoilValue(accessTokenAtom);
  const [isEmotionBoxOpen, setIsEmotionBoxOpen] = useState(false);

  const comments = [
    {
      name: '곽나영',
      img: '',
      date: '2022-09-01',
      body: '공감합니다. 너무 좋은 해결책이네요',
    },
    {
      name: '최윤석',
      img: '',
      date: '2022-09-01',
      body: '저도 공감합니다.',
    },
  ];

  const handleClose = () => {
    const tempData = { ...closeData };
    tempData.isClosed = !closeData.isClosed;
    setCloseData(tempData);
  };

  const getDetailData = async () => {
    const res = await myAxios('get', `api/v1/complaint/${id}`);
    setDetailData(res.data.response);

    const emotionRes = await myAxios('get', `api/v1/expression/${id}`);
    setEmotionData(emotionRes.data.response);

    if (isReady) {
      const myRes = await myAxios('get', `api/v1/expression/${id}/me`, undefined, true, accessToken);
      setMyEmotion(myRes.data.response);
    }
  };

  const goBackToList = () => {
    const tempData = { ...closeData };
    tempData.isClosed = false;
    tempData.isList = true;
    setCloseData(tempData);
  };

  const handleEmotionBox = () => {
    setIsEmotionBoxOpen(!isEmotionBoxOpen);
  };

  const handleEmotionSubmit = async (emotion: Emotion) => {
    const body = {
      complaintId: id,
      type: emotion,
    };
    await myAxios('post', 'api/v1/expression', body, true, accessToken);
    setIsEmotionBoxOpen(false);
    getDetailData();
  };

  useEffect(() => {
    getDetailData();
  }, [id, isReady]);

  return (
    <StyledComplainDetail isClosed={isClosed}>
      <div className={'header'}>
        <div className={'back'} onClick={goBackToList}>
          <Back />
        </div>
        <div>
          {detailData && <OptionalPin width={'21px'} height={'25px'} fill={colorByCategory[detailData.category]} />}
        </div>
      </div>

      {detailData && (
        <div className={'slide'}>
          <div className={'profile'}>
            <div className={'img'}></div>
            <div className={'texts'}>
              <h3>{detailData.writerName}</h3>
              <p>{`${detailData.createdDate.substr(0, 10)} ${getDayOfWeek(detailData.createdDate.substr(0, 10))}`}</p>
            </div>
          </div>

          <div className={'detail'}>
            <div className={'title'}>{detailData.title}</div>
            <div className={'body'}>{detailData.content}</div>
            {detailData && detailData.file && (
              <Image src={detailData.file} width="100%" height="100%" layout="responsive" objectFit="contain" />
            )}
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
            <div className={'grey'}></div>
          </div>

          <div className={'comments'}>
            {comments.map(({ name, body, date }, index) => {
              return (
                <Comment key={index}>
                  <div className={'profile'}>
                    <div className={'img'}></div>
                    <div className={'texts'}>
                      <h3>{name}</h3>
                      <p>{date}</p>
                    </div>
                  </div>
                  <p>{body}</p>
                  <div className={'option'}>
                    <Option />
                  </div>
                </Comment>
              );
            })}
          </div>
          <div className={'commentFooter'}>
            <div>
              {isEmotionBoxOpen && (
                <div>
                  <button onClick={() => handleEmotionSubmit('GOOD')}>
                    <div>
                      <BigGood fill={'#000'} />
                    </div>
                    <p>좋아요</p>
                  </button>
                  <button onClick={() => handleEmotionSubmit('BAD')}>
                    <div>
                      <BigBad fill={'#000'} />
                    </div>
                    <p>화나요</p>
                  </button>
                  <button onClick={() => handleEmotionSubmit('AMAZING')}>
                    <div>
                      <BigAmazing fill={'#000'} />
                    </div>
                    <p>놀라워요</p>
                  </button>
                </div>
              )}
              {!myEmotion && (
                <button onClick={handleEmotionBox}>
                  <div>
                    <Heart />
                  </div>
                  <p>감정 남기기</p>
                </button>
              )}
              {myEmotion === 'GOOD' && (
                <button onClick={handleEmotionBox}>
                  <div>
                    <BigGood fill={'#F5564E'} />
                  </div>
                  <p>좋아요</p>
                </button>
              )}
              {myEmotion === 'BAD' && (
                <button onClick={handleEmotionBox}>
                  <div>
                    <BigBad fill={'#F5564E'} />
                  </div>
                  <p>화나요</p>
                </button>
              )}
              {myEmotion === 'AMAZING' && (
                <button onClick={handleEmotionBox}>
                  <div>
                    <BigAmazing fill={'#F5564E'} />
                  </div>
                  <p>놀라워요</p>
                </button>
              )}
              <button>
                <div>
                  <CommentIcon />
                </div>
                <p>댓글 9</p>
              </button>
              <button>
                <div>
                  <Share />
                </div>
                <p>공유하기</p>
              </button>
            </div>
            <input type={'text'} placeholder={'댓글을 입력해주세요'}></input>
          </div>
          <div className={'close'} onClick={handleClose}>
            {isClosed ? <GoFront /> : <GoBack />}
          </div>
        </div>
      )}
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
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
    }
    & .back {
      cursor: pointer;
    }
  }

  & .slide {
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }
  & .profile {
    display: flex;
    gap: 7px;
    padding-left: 24px;
    margin-bottom: 20px;
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

  & .detail {
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
      word-break: break-all;
      font-weight: 700;
      font-size: 24px;
      padding: 0 50px 0 25px;
      margin-bottom: 20px;
    }
    & .body {
      word-break: break-all;
      width: 100%;
      font-weight: 400;
      font-size: 14px;
      padding: 0 50px 0 25px;
      margin-bottom: 22px;
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

    & .grey {
      width: 100%;
      height: 6px;
      background: #f2f2f2;
    }
  }

  & .comments {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 160px;
  }
  & .commentFooter {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 140px;
    z-index: 2;
    background: #f3f4f7;
    box-shadow: 0px -4px 21px rgba(0, 0, 0, 0.25);
    padding-bottom: 10px;

    & > div {
      display: flex;
      justify-content: space-around;
      width: 100%;
      & > div {
        display: flex;
        position: absolute;
        justify-content: center;
        top: -35px;
        left: 41px;
        width: 192px;
        height: 50px;
        background: #fff;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        border-radius: 25px;
        gap: 18px;
        & > button {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 100%;
          background: none;
          outline: none;
          border: none;
          gap: 3px;
          cursor: pointer;
          & > p {
            white-space: nowrap;
            font-weight: 700;
            font-size: 10px;
            color: #bdbdbd;
          }
        }
      }
      & > button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 50px;
        border: none;
        background: none;
        outline: none;
        cursor: pointer;
        & > div {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
        }
        & > p {
          font-weight: 500;
          font-size: 12px;
          color: #828282;
        }
      }
    }
    & > input {
      background: #ffffff;
      border: 1px solid #bdbdbd;
      border-radius: 45px;
      padding: 16px 27px;
      font-weight: 500;
      font-size: 16px;
      margin: 0 16px;
      ::placeholder {
        font-weight: 600;
        font-size: 16px;
        color: #4f4f4f;
      }
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
  position: relative;
  padding: 20px 20px 0 20px;
  & .profile {
    display: flex;
    gap: 7px;
    margin-bottom: 14px;
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

  & > p {
    padding: 0 22px 0 48px;
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 4px;
  }

  & .option {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 12px;
    right: 0;
    width: 40px;
    height: 40px;
  }
`;

export default ComplainDetail;
