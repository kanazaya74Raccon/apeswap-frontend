import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import ApeSwapStats from 'views/Home/components/ApeSwapStats'
import WelcomeCard from './components/WelcomeCard'
import Banner from './components/Banner'
import HotFarms from './components/HotFarms/HotFarms'
import CoolPools from './components/CoolPools/CoolPools'
import WhenNewsSer from './components/WhenNewsSer/WhenNewsSer'

export interface GridWidth {
  spanFirst?: number
  spanLast?: number
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`

const FrontRowWrapper = styled.div`
  display: flex;
  width: auto;
  height: auto;
  flex-direction: column;
  margin-bottom: 40px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 720px;
    height: 500px;
    margin-bottom: 0px;
    flex-direction: row;
  }
`
const FarmAndPoolsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 720px;
    height: 495px;
  }
`
const LeftSideFlexWrapper = styled.div`
  display: flex;
  width: auto;
  height: auto;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 720px;
    height: 970px;
  }
`

const RightSideFlexWrapper = styled.div`
  display: flex;
  width: auto;
  height: 950px;
  margin-top: 40px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 336px;
    height: 935px;
    margin-left: 32px;
    margin-top: 0px;
  }
`

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <Page width="1200px">
        <PageContainer>
          <LeftSideFlexWrapper>
            <FrontRowWrapper>
              <WelcomeCard />
              <FarmStakingCard />
            </FrontRowWrapper>
            <FarmAndPoolsWrapper>
              <HotFarms />
              <CoolPools />
            </FarmAndPoolsWrapper>
          </LeftSideFlexWrapper>
          <RightSideFlexWrapper>
            <WhenNewsSer />
            <ApeSwapStats />
          </RightSideFlexWrapper>
        </PageContainer>
      </Page>
    </>
  )
}

export default Home
