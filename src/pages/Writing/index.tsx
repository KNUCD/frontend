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

const WritingPage: React.FC = () => {
  const [choicedPin, setChoicedPin] = useState<Category | null>(null);
  const [posData, setPosData] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const router = useRouter();

  const handleWriting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = {
      latitude: posData?.lat,
      longitude: posData?.lng,
      title: data.get('title'),
      content: data.get('content'),
      file: data.get('img'),
      category: data.get('category'),
    };

    const res = await myAxios('post', 'api/v1/complaint', body, undefined, undefined, 'multipart/form-data');
    console.log(res);
  };

  return (
    <StyledWritingPage>
      {posData ? (
        <>
          <form onSubmit={handleWriting} encType={'multipart/form-data'}>
            <input type={'text'} name={'title'}></input>
            <input type={'text'} name={'content'}></input>
            <input type={'file'} name={'img'}></input>
            <fieldset>
              <input type={'radio'} name={'category'} id={'LIFE'} value={'LIFE'} defaultChecked></input>
              <label htmlFor={'LIFE'}>생활불편</label>
              <input type={'radio'} name={'category'} id={'SECURITY'} value={'SECURITY'}></input>
              <label htmlFor={'SECURITY'}>사회안전</label>
              <input type={'radio'} name={'category'} id={'TRAFFIC'} value={'TRAFFIC'}></input>
              <label htmlFor={'TRAFFIC'}>교통불편</label>
            </fieldset>
            <button type={'submit'}>제출</button>
          </form>
        </>
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
  top: calc(50% - 25px);
  left: calc(50% + 35px);
  z-index: 2;
`;

const StyledWritingPage = styled(StyledPage)``;

export default WritingPage;
