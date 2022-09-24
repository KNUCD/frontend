import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GoBack from '/public/goBack.svg';
import GoFront from '/public/goFront.svg';
import Back from '/public/back.svg';
import Good from '/public/good.svg';
import Bad from '/public/bad.svg';
import Amazing from '/public/amazing.svg';
import OptionalPin from '/public/optionalPin.svg';
import Option from '/public/option.svg';
import Heart from '/public/heart.svg';
import CommentIcon from '/public/comment.svg';
import Share from '/public/share.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { closeAtom, detailAtom } from 'others/stateStore';
import myAxios from 'others/myAxios';
import { colorByCategory } from 'constants/default';
import { Category } from 'others/IntegrateInterfaces';
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
      body: '개추입니다.',
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
    console.log(res.data.response);
  };

  const goBackToList = () => {
    const tempData = { ...closeData };
    tempData.isClosed = false;
    tempData.isList = true;
    setCloseData(tempData);
  };

  useEffect(() => {
    getDetailData();
  }, []);

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

      <div className={'slide'}>
        <div className={'profile'}>
          <div className={'img'}></div>
          <div className={'texts'}>
            <h3>곽나영</h3>
            <p>{`2022-09-21 수`}</p>
          </div>
        </div>

        <div className={'detail'}>
          <div className={'title'}>쓰레기 불법투기 문제 개선방안 건의합니다!</div>
          <div className={'body'}>
            대성환경에너지(주)에서는 악취 발생의 주요 물질인 매립가스 포집을 이행하고 있으며, 매립가스 포집 배관의 막힘
            발생으로 인한 포집불량 지역에 대해서 호스대성환경에너지(주)에서는 악취 발생의 주요 물질인 매립가스 포집을
            이행하고 있으며, 매립가스 포집 배관의 막힘 발생으로 인한 포집불량 지역에 대해서 호스
          </div>
          {detailData && detailData.file && (
            <Image src={detailData.file} width="100%" height="100%" layout="responsive" objectFit="contain" />
          )}
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
            <button>
              <div>
                <Heart />
              </div>
              <p>감정 남기기</p>
            </button>
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
      font-weight: 700;
      font-size: 24px;
      padding: 0 50px 0 25px;
      margin-bottom: 20px;
    }
    & .body {
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
    margin-bottom: 140px;
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
