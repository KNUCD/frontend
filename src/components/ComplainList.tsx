import styled from 'styled-components';
import Complain from './Complain';
import Refresh from '/public/refresh.svg';
import Magnify from '/public/magnify.svg';
import Life from '/public/life.svg';
import Security from '/public/security.svg';
import Traffic from '/public/traffic.svg';
import MainIcon from '/public/mainIcon.svg';
import Back from '/public/back.svg';
import GoBack from '/public/goBack.svg';
import GoFront from '/public/goFront.svg';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { closeAtom, listAtom } from 'others/stateStore';
import myAxios from 'others/myAxios';
import { Category } from 'others/IntegrateInterfaces';
import { colorByCategory } from 'constants/default';
import { useRouter } from 'next/router';

const ComplainList: React.FC = () => {
  const [closeData, setCloseData] = useRecoilState(closeAtom);
  const [complains, setComplains] = useState([]);
  const { isClosed } = closeData;
  const [listData, setListData] = useRecoilState(listAtom);
  const router = useRouter();

  const handleClose = () => {
    const tempData = { ...closeData };
    tempData.isClosed = !closeData.isClosed;
    setCloseData(tempData);
  };

  const getComplainList = async () => {
    const { category, ha, qa, oa, pa } = listData;
    const res = await myAxios('get', `api/v1/complaint?category=${category}&ha=${ha}&qa=${qa}&oa=${oa}&pa=${pa}`);
    setComplains(res.data.response);
  };

  const handleCategory = (category: Category) => {
    const tempListData = { ...listData };
    if (tempListData.category === category) {
      tempListData.category = 'ALL';
    } else {
      tempListData.category = category;
    }
    setListData(tempListData);
  };

  const refreshComplainList = () => {
    const tempListData = { ...listData };
    tempListData.idx++;
    setListData(tempListData);
  };

  useEffect(() => {
    const tempData = { ...closeData };
    tempData.isMapPage = true;
    tempData.isList = true;
    setCloseData(tempData);
  }, []);

  useEffect(() => {
    getComplainList();
  }, [listData]);

  return (
    <StyledComplainList isClosed={isClosed}>
      <ComplainListHeader category={listData.category}>
        <div className={'upper'}>
          <div className={'back'} onClick={handleClose}>
            <Back />
          </div>
          <div className={'mainIcon'} onClick={() => router.push('/')}>
            <MainIcon />
          </div>
          <div onClick={refreshComplainList}>
            <Refresh />
          </div>
        </div>
        <div className={'searchBar'}>
          <input type={'text'} placeholder={'????????? ????????? ??????????????????'} />
          <div>
            <Magnify />
          </div>
        </div>
        <div className={'category'}>
          <button
            className={`life${listData.category === 'LIFE' || listData.category === 'ALL' ? '' : 'NonActive'}`}
            onClick={() => handleCategory('LIFE')}
          >
            <div>
              <Life
                fill={listData.category === 'LIFE' || listData.category === 'ALL' ? 'white' : colorByCategory['LIFE']}
              />
            </div>
            <p>????????????</p>
          </button>
          <button
            className={`security${listData.category === 'SECURITY' || listData.category === 'ALL' ? '' : 'NonActive'}`}
            onClick={() => handleCategory('SECURITY')}
          >
            <div>
              <Security
                fill={
                  listData.category === 'SECURITY' || listData.category === 'ALL'
                    ? 'white'
                    : colorByCategory['SECURITY']
                }
              />
            </div>
            <p>????????????</p>
          </button>
          <button
            className={`traffic${listData.category === 'TRAFFIC' || listData.category === 'ALL' ? '' : 'NonActive'}`}
            onClick={() => handleCategory('TRAFFIC')}
          >
            <div>
              <Traffic
                fill={
                  listData.category === 'TRAFFIC' || listData.category === 'ALL' ? 'white' : colorByCategory['TRAFFIC']
                }
              />
            </div>
            <p>????????????</p>
          </button>
        </div>
      </ComplainListHeader>
      <Complains>
        {complains.map((complain, index) => {
          const { category, content, createdDate, file, id, title, writerName, writerImg } = complain;
          return (
            <Complain
              key={index}
              category={category}
              content={content}
              createdDate={createdDate}
              file={file}
              id={id}
              title={title}
              writerName={writerName}
              writerImg={writerImg}
            ></Complain>
          );
        })}
      </Complains>
      <div className={'close'} onClick={handleClose}>
        {isClosed ? <GoFront /> : <GoBack />}
      </div>
    </StyledComplainList>
  );
};

const Complains = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  gap: 6px;
  background: #f2f2f2;
`;

interface StyledComplainListProps {
  isClosed: boolean;
}

const StyledComplainList = styled.div<StyledComplainListProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  min-width: 517px;
  width: 517px;
  height: 100%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  z-index: 2;
  transform: ${(props) => (props.isClosed ? 'translateX(-100%)' : 'translateX(0)')};
  transition: 1s;
  background: #fff;
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
    z-index: -1;
    cursor: pointer;
  }

  & .back {
    display: none;
  }

  @media (max-width: 600px) {
    min-width: inherit;
    width: 100% !important;
    z-index: 4;
    & .back {
      display: flex;
      align-items: center;
    }
  }
`;

interface ComplainListHeaderProps {
  category: string;
}

const ComplainListHeader = styled.div<ComplainListHeaderProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 21px 21px 0 16px;
  background: #f3f4f7;
  & .upper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 18px;
    & > p {
      font-weight: 600;
      font-size: 24px;
    }
    & > div {
      display: flex;
      cursor: pointer;
    }
  }

  & .searchBar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    background: #fff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    margin-bottom: 15px;
    & > input {
      width: 100%;
      outline: none;
      border: none;
      padding: 0 15px;
    }
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
    }
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
  @media (max-width: 600px) {
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
  }
`;

export default ComplainList;
