import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React from 'react'
import styled from 'styled-components'
import LaunchCalendar from './components/LaunchCalendar/LaunchCalendar'
import News from './components/News/News'
import Services from './components/Services/Services'
import Banner from './components/TopBanner/Banner'
import TrendingTokens from './components/TrendingTokens/TrendingTokens'
import Values from './components/Values/Values'

export interface GridWidth {
  spanFirst?: number
  spanLast?: number
}

const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 5px;
  @media screen and (max-width: 350px) {
    width: 300px;
    padding-right: 0px;
  }
`
const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  margin-bottom: 50px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0px;
  }
`
const FrontRowWrapper = styled.div`
  display: flex;
  width: auto;
  height: auto;
  flex-direction: column;
  margin-bottom: 40px;
  @media screen and (max-width: 350px) {
    width: 300px;
  }
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
  @media screen and (max-width: 350px) {
    width: 300px;
  }
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
  @media screen and (max-width: 350px) {
    width: 342px;
  }
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
  @media screen and (max-width: 350px) {
    width: 320px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 336px;
    height: 935px;
    margin-left: 10px;
    margin-top: 0px;
    flex-direction: column;
  }

  @media screen and (max-width: 730px) {
    width: 346px;
    margin-left: 0px;
    margin-top: 40px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 720px;
    height: 935px;
    margin-left: 0px;
    margin-top: 0px;
    flex-direction: row;
    justify-content: space-between;
  }

  @media screen and (min-width: 852px) {
    width: 720px;
    height: 935px;
    margin-left: 0px;
    margin-top: 0px;
    flex-direction: row;
    justify-content: space-between;
  }

  @media screen and (min-width: 1375px) {
    width: 336px;
    height: 935px;
    margin-left: 32px;
    margin-top: 0px;
    flex-direction: column;
  }
`

const Home: React.FC = () => {
  const { chainId } = useActiveWeb3React()

  return (
    <>
      <Banner />
      <TrendingTokens />
      <News />
      <Services />
      <Values />
      <LaunchCalendar />
    </>
  )
}

export default Home
