import MyMap from 'components/Map';
import { StyledPage } from 'others/CommonStyles';
import { Category } from 'others/IntegrateInterfaces';
import myAxios from 'others/myAxios';
import { useState } from 'react';
import styled from 'styled-components';
import OptionalPin from '/public/optionalPin.svg';
import { useRouter } from 'next/router';
import Pin from '/public/pin.svg';
import { colorByCategory } from 'constants/default';
import Life from '/public/life.svg';
import Security from '/public/security.svg';
import Traffic from '/public/traffic.svg';

const WritingPage: React.FC = () => {
  const [isAgree, setIsAgree] = useState(false);
  const [choicedPin, setChoicedPin] = useState<Category | null>(null);
  const [posData, setPosData] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const router = useRouter();

  const handleWriting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const img = Object(data.get('img'));
    const body = {
      latitude: posData?.lat,
      longitude: posData?.lng,
      title: data.get('title'),
      content: data.get('content'),
      category: choicedPin,
      file: img.size === 0 ? undefined : data.get('img'),
    };
    const res = await myAxios('post', 'api/v1/complaint', body, undefined, undefined, 'multipart/form-data');
    console.log(res);
  };

  const handleCheckbox = () => {
    setIsAgree(!isAgree);
  };

  return (
    <StyledWritingPage choicedPin={choicedPin ?? 'LIFE'}>
      {posData ? (
        <div className={'writing'}>
          <StyledPreComplain choicedPin={choicedPin ?? 'LIFE'}>
            <h2>민원 작성하기</h2>
            <div className={'category'}>
              <button className={'life'}>
                <div>
                  <Life />
                </div>
                <p>생활불편</p>
              </button>
              <button className={'security'}>
                <div>
                  <Security />
                </div>
                <p>사회안전</p>
              </button>
              <button className={'traffic'}>
                <div>
                  <Traffic />
                </div>
                <p>교통불편</p>
              </button>
            </div>
            <div className={'map'}>
              <MyMap
                props={{
                  path: 'writing',
                  choicedPin,
                  isWriting: true,
                  posData,
                }}
              />
              {choicedPin && (
                <WritingConstMarker>
                  <Pin fill={colorByCategory[choicedPin]} />
                </WritingConstMarker>
              )}
            </div>
            <h3>개인정보 수집 및 이용안내</h3>
            <textarea rows={9} readOnly>
              1. 수집 및 이용 목적 (개인정보보호법 제15조) 핀플레인은 관계법령 등에서 정하는 소관 업무의 수행을 위하여
              다음과 같이 개인정보를 수집 및 이용합니다.&#10;&#10;수집된 개인정보는 정해진 목적 이외의 용도로는 이용되지
              않습니다. ※ 관계법령 : 민원처리에 관한 법률 및 동법 시행령, 전자정부법 및 동법 시행령 가. 민원, 제안,
              질의, 신고 등 모든 시민의견 접수·처리·사후관리 서비스 신청에 포함된 개인정보는 소관 업무수행을 위해
              행정·공공기관에서 이용합니다. 나. 타 행정·공공기관 시스템 이용 민원의 전자적 처리를 위해 내부적으로 타
              시스템 연계 및 이용 시 개인정보를 이용합니다. 다. 핀플레인 서비스 향상 및 정책평가를 위하여 접수된 민원은
              관계법령에 따라 분석·평가 및 처리결과의 사후관리를 시행합니다.
            </textarea>
            <div className={'agree'}>
              <input
                type="checkbox"
                id="agree"
                value={isAgree ? 'agree' : 'disagree'}
                onChange={handleCheckbox}
              ></input>
              <p>위 개인정보 수집 및 이용에 동의합니다</p>
            </div>
          </StyledPreComplain>
          {isAgree && (
            <form onSubmit={handleWriting} encType={'multipart/form-data'}>
              <label>제목</label>
              <input
                type={'text'}
                name={'title'}
                placeholder={'민원 내용을 잘 나타낼수 있는 언어를 사용해주세요'}
                required
              ></input>
              <label>내용</label>
              <textarea
                name={'content'}
                rows={12}
                placeholder={'민원 내용을 잘 나타낼수 있는 언어를 사용해주세요'}
                required
              ></textarea>
              <label>사진 첨부</label>
              <input type={'file'} name={'img'}></input>
              <button type={'submit'}>이 위치로 핀 찍기</button>
            </form>
          )}
        </div>
      ) : (
        <>
          {!choicedPin && (
            <StyledSelectPin>
              <p>작성하실 민원에 맞는 핀을 골라주세요</p>
              <div>
                <button onClick={() => setChoicedPin('LIFE')}>
                  <div>
                    <OptionalPin fill={'#F5564E'} width={'56'} height={'68'} />
                  </div>
                  <p>생활불편</p>
                </button>
                <button onClick={() => setChoicedPin('SECURITY')}>
                  <div>
                    <OptionalPin fill={'#2E3192'} width={'56'} height={'68'} />
                  </div>
                  <p>사회안전</p>
                </button>
                <button onClick={() => setChoicedPin('TRAFFIC')}>
                  <div>
                    <OptionalPin fill={'#662D91'} width={'56'} height={'68'} />
                  </div>
                  <p>교통불편</p>
                </button>
              </div>
              <button onClick={() => router.back()}>취소하기</button>
            </StyledSelectPin>
          )}
          <MyMap
            props={{
              path: 'writing',
              setPosData,
              setChoicedPin,
              choicedPin,
            }}
          />
          {choicedPin && (
            <ConstMarker>
              <Pin fill={colorByCategory[choicedPin]} />
            </ConstMarker>
          )}
        </>
      )}
    </StyledWritingPage>
  );
};

interface StyledPreComplainProps {
  choicedPin: string;
}

const StyledPreComplain = styled.div<StyledPreComplainProps>`
  display: flex;
  flex-direction: column;
  min-width: 517px;
  width: 517px;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 0 18px;

  & > h2 {
    font-weight: 600;
    font-size: 24px;
    color: #4f4f4f;
    margin: 20px 0 30px 0;
  }

  & > .category {
    display: flex;
    width: 100%;
    gap: 9px;
    margin-bottom: 12px;

    & > button {
      display: flex;
      align-items: center;
      width: 100%;
      height: 50px;
      outline: none;
      border: none;
      border-radius: 3px;
      padding-left: 15px;
      cursor: pointer;
      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
      }
      & > p {
        font-weight: 600;
        font-size: 16px;
        color: #fff;
      }
    }
    & .life {
      background: #f5564e;
    }
    & .security {
      background: #2e3192;
    }
    & .traffic {
      background: #662d91;
    }
  }

  & .map {
    position: relative;
    margin-bottom: 70px;
  }
  & > h3 {
    font-weight: 600;
    font-size: 16px;
    color: ${(props) => colorByCategory[props.choicedPin]};
    margin-bottom: 16px;
  }
  & > textarea {
    border: 1px solid #f2f2f2;
    font-weight: 400;
    font-size: 12px;
    color: #4f4f4f;
    resize: none;
    margin-bottom: 10px;
  }
  & > .agree {
    display: flex;
    justify-content: right;
    gap: 8px;
    & > p {
      font-weight: 600;
      font-size: 11px;
      color: #4f4f4f;
    }
  }
`;

const StyledSelectPin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 70px;
  width: calc(100% - 70px);
  height: 100%;
  z-index: 3;
  background: rgba(0, 0, 0, 0.6);
  gap: 70px;

  & > p {
    font-weight: 700;
    font-size: 36px;
    color: #fff;
  }

  & > div {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 50px;
    & > button {
      width: 224px;
      height: 224px;
      outline: none;
      border: none;
      border-radius: 100%;
      background: #fff;
      cursor: pointer;
      & > div {
      }
      & > p {
        margin-top: 24px;
        font-weight: 600;
        font-size: 24px;
        color: #4f4f4f;
      }
    }
  }

  & > button {
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 124px;
    height: 48px;
    cursor: pointer;
    filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.25));
    border-radius: 5px;
    background: #fff;
    font-weight: 700;
    font-size: 20px;
    color: #f5564e;
    outline: none;
    border: none;
  }
`;

const ConstMarker = styled.div`
  position: fixed;
  top: calc(50% - 39px);
  left: calc(50% - 15px);
  z-index: 2;
`;

const WritingConstMarker = styled.div`
  position: absolute;
  top: calc(50% - 39px);
  left: calc(50% - 15px);
  z-index: 2;
`;

interface StyledWritingPageProps {
  choicedPin: string;
}

const StyledWritingPage = styled(StyledPage)<StyledWritingPageProps>`
  & .writing {
    display: flex;
    width: 100%;
    height: 100%;
    & form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 20px;
      & > label,
      input,
      button {
        width: 100%;
        max-width: 485px;
      }
      & > label {
        font-weight: 600;
        font-size: 16px;
        color: #333333;
        margin-bottom: 12px;
      }
      & input[type='text'],
      textarea {
        width: 100%;
        margin-bottom: 40px;
        background: #ffffff;
        padding: 0 13px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
        border-radius: 3px;
        border: none;
      }
      & input[type='text'] {
        height: 40px;
      }
      & textarea {
        resize: none;
        padding: 13px;
      }
      & > button {
        margin-top: 50px;
        width: 100%;
        height: 50px;
        background: ${(props) => colorByCategory[props.choicedPin]};
        font-weight: 700;
        font-size: 20px;
        color: #ffffff;
        outline: none;
        border: none;
        filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.25));
        border-radius: 5px;
      }
    }
  }
`;

export default WritingPage;
