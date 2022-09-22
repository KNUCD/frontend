import MyMap from 'components/Map';
import { StyledPage } from 'others/CommonStyles';
import { useState } from 'react';
import styled from 'styled-components';

const WritingPage: React.FC = () => {
  const [posData, setPosData] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  return (
    <StyledWritingPage>
      {posData ? (
        <></>
      ) : (
        <MyMap
          props={{
            path: 'writing',
            setPosData,
          }}
        />
      )}
    </StyledWritingPage>
  );
};

const StyledWritingPage = styled(StyledPage)``;

export default WritingPage;
