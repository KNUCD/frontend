import MyMap from 'components/Map';
import { StyledPage } from 'others/CommonStyles';
import { Category } from 'others/IntegrateInterfaces';
import myAxios from 'others/myAxios';
import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import OptionalPin from '/public/optionalPin.svg';
import { useRouter } from 'next/router';
import Pin from '/public/pin.svg';
import { colorByCategory } from 'constants/default';
import Life from '/public/life.svg';
import Security from '/public/security.svg';
import Traffic from '/public/traffic.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenAtom, closeAtom } from 'others/stateStore';

const WritingPage: React.FC = () => {
  const [isFile, setIsFile] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [closeData, setCloseData] = useRecoilState(closeAtom);
  const [isAgree, setIsAgree] = useState(false);
  const [choicedPin, setChoicedPin] = useState<Category | null>(null);
  const [posData, setPosData] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const router = useRouter();
  const accessToken = useRecoilValue(accessTokenAtom);

  const handleWriting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
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
    await myAxios('post', 'api/v1/complaint', body, true, accessToken, 'multipart/form-data');
    const tempData = { ...closeData };
    tempData.isMapPage = true;
    setCloseData(tempData);
    router.push('/map');
    setDisabled(false);
  };

  const handleCheckbox = () => {
    setIsAgree(!isAgree);
  };

  const fileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFile(e.target.value ? true : false);
  };

  return (
    <>
      <StyledWritingPage choicedPin={choicedPin ?? 'LIFE'}>
        {posData ? (
          <>
            {choicedPin && (
              <div className={'writing'}>
                <button className={'cancel'} onClick={() => router.back()}>
                  ????????????
                </button>
                <StyledPreComplain choicedPin={choicedPin} isAgree={isAgree}>
                  <h2>?????? ????????????</h2>

                  <div className={'category'}>
                    <button className={`life${choicedPin === 'LIFE' ? '' : 'NonActive'}`}>
                      <div>
                        <Life fill={choicedPin === 'LIFE' ? 'white' : colorByCategory['LIFE']} />
                      </div>
                      <p>????????????</p>
                    </button>
                    <button className={`security${choicedPin === 'SECURITY' ? '' : 'NonActive'}`}>
                      <div>
                        <Security fill={choicedPin === 'SECURITY' ? 'white' : colorByCategory['SECURITY']} />
                      </div>
                      <p>????????????</p>
                    </button>
                    <button className={`traffic${choicedPin === 'TRAFFIC' ? '' : 'NonActive'}`}>
                      <div>
                        <Traffic fill={choicedPin === 'TRAFFIC' ? 'white' : colorByCategory['TRAFFIC']} />
                      </div>
                      <p>????????????</p>
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
                  <h3>???????????? ?????? ??? ????????????</h3>
                  <textarea rows={9} readOnly>
                    1. ?????? ??? ?????? ?????? (????????????????????? ???15???) ??????????????? ???????????? ????????? ????????? ?????? ????????? ?????????
                    ????????? ????????? ?????? ??????????????? ?????? ??? ???????????????.&#10;&#10;????????? ??????????????? ????????? ?????? ?????????
                    ???????????? ???????????? ????????????. ??? ???????????? : ??????????????? ?????? ?????? ??? ?????? ?????????, ??????????????? ??? ??????
                    ????????? ???. ??????, ??????, ??????, ?????? ??? ?????? ???????????? ???????????????????????????? ????????? ????????? ?????????
                    ??????????????? ?????? ??????????????? ?????? ?????????????????????????? ???????????????. ???. ??? ???????????????????? ????????? ??????
                    ????????? ????????? ????????? ?????? ??????????????? ??? ????????? ?????? ??? ?????? ??? ??????????????? ???????????????. ???. ????????????
                    ????????? ?????? ??? ??????????????? ????????? ????????? ????????? ??????????????? ?????? ?????????????? ??? ??????????????? ???????????????
                    ???????????????.
                  </textarea>
                  <div className={'agree'}>
                    <input
                      type="checkbox"
                      id="agree"
                      value={isAgree ? 'agree' : 'disagree'}
                      onChange={handleCheckbox}
                    ></input>
                    <p>??? ???????????? ?????? ??? ????????? ???????????????</p>
                  </div>
                </StyledPreComplain>
                {isAgree && (
                  <form onSubmit={handleWriting} encType={'multipart/form-data'}>
                    <label>??????</label>
                    <input
                      type={'text'}
                      name={'title'}
                      placeholder={'?????? ????????? ??? ???????????? ?????? ????????? ??????????????????'}
                      required
                    ></input>
                    <label>??????</label>
                    <textarea
                      name={'content'}
                      rows={12}
                      placeholder={'?????? ????????? ??? ???????????? ?????? ????????? ??????????????????'}
                      required
                    ></textarea>
                    <label>?????? ??????</label>
                    <div className="filebox">
                      <label htmlFor="file" className={isFile ? 'done' : ''}>{`${
                        isFile ? '?????? ??????' : '?????? ????????????'
                      }`}</label>
                      <input type={'file'} id="file" accept={'image/*'} name={'img'} onChange={fileUpload}></input>
                    </div>
                    <button type={'submit'} disabled={disabled}>
                      ??? ????????? ??? ??????
                    </button>
                  </form>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {!choicedPin && (
              <StyledSelectPin>
                <p>???????????? ????????? ?????? ?????? ???????????????</p>
                <div>
                  <button onClick={() => setChoicedPin('LIFE')}>
                    <div>
                      <OptionalPin fill={'#F5564E'} width={'56'} height={'68'} />
                    </div>
                    <p>????????????</p>
                  </button>
                  <button onClick={() => setChoicedPin('SECURITY')}>
                    <div>
                      <OptionalPin fill={'#2E3192'} width={'56'} height={'68'} />
                    </div>
                    <p>????????????</p>
                  </button>
                  <button onClick={() => setChoicedPin('TRAFFIC')}>
                    <div>
                      <OptionalPin fill={'#662D91'} width={'56'} height={'68'} />
                    </div>
                    <p>????????????</p>
                  </button>
                </div>
                <button onClick={() => router.back()}>????????????</button>
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
    </>
  );
};

interface StyledPreComplainProps {
  choicedPin: string;
  isAgree: boolean;
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

  & .category {
    display: flex;
    width: 100%;
    margin-bottom: 14px;
    gap: 9px;
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
    & .lifeNonActive {
      background: #fff;
      border: 1px solid #f5564e;
      border-radius: 3px;
      & > p {
        color: #f5564e;
      }
    }
    & .security {
      background: #2e3192;
    }
    & .securityNonActive {
      background: #fff;
      border: 1px solid #2e3192;
      border-radius: 3px;
      & > p {
        color: #2e3192;
      }
    }
    & .traffic {
      background: #662d91;
    }
    & .trafficNonActive {
      background: #fff;
      border: 1px solid #662d91;
      border-radius: 3px;
      & > p {
        color: #662d91;
      }
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

  @media (max-width: 600px) {
    display: ${(props) => (props.isAgree ? 'none' : '')};
    min-width: inherit;
    width: 100%;
    & .category {
      & > button {
        display: flex;
        justify-content: center;
        padding: 0;
        & > div {
          width: 40px;
        }
        & > p {
          white-space: nowrap;
        }
      }
    }
    & .fixPosBtn {
      display: none;
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

  @media (max-width: 600px) {
    left: 0;
    width: 100%;
    & > p {
      padding: 0 20px;
      font-size: 25px;
    }
    & > div {
      padding: 0 10px;
      height: 100px;
      & > button {
        width: 100px;
        height: 100%;
        & > div,
        > p {
          transform: scale(0.7);
        }
        & > p {
          font-size: 16px;
          transform: translateY(-25px);
        }
      }
    }
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
    & > .cancel {
      position: fixed;
      top: 24px;
      right: 16px;
      width: 124px;
      height: 48px;
      cursor: pointer;
      filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.25));
      border-radius: 5px;
      background: #fff;
      font-weight: 700;
      font-size: 20px;
      color: ${(props) => colorByCategory[props.choicedPin]};
      outline: none;
      border: none;
    }
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
      button,
      textarea,
      > div {
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
        cursor: pointer;
      }
      & .filebox label {
        display: inline-block;
        width: 100%;
        text-align: center;
        padding: 0.5em 0.75em;
        color: #999;
        cursor: pointer;
        background: #ffffff;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
        border-radius: 3px;
      }

      & .done {
        color: #333 !important;
      }

      & .filebox input[type='file'] {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
    }
  }

  @media (max-width: 600px) {
    & .writing {
      & > .cancel {
        top: 12px;
        right: 10px;
      }
    }
  }
`;

export default WritingPage;
