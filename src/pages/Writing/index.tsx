import MyMap from 'components/Map';
import { StyledPage } from 'others/CommonStyles';
import myAxios from 'others/myAxios';
import { useState } from 'react';
import styled from 'styled-components';

const WritingPage: React.FC = () => {
  const [posData, setPosData] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

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
          <MyMap
            props={{
              path: 'writing',
              setPosData,
            }}
          />
          <ConstMarker />
        </>
      )}
    </StyledWritingPage>
  );
};

const ConstMarker = styled.div`
  position: fixed;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  width: 50px;
  height: 50px;
  background: #aaa;
  z-index: 2;
`;

const StyledWritingPage = styled(StyledPage)``;

export default WritingPage;
