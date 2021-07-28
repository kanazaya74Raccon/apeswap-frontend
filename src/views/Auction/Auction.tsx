import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import SwiperProvider from 'contexts/SwiperProvider'
import { useAuctions } from 'state/hooks'
import Positions from './components/Positions'
import Container from './components/Container'

const PageWrapper = styled.div`
  display: none;
  display: flex;
  padding-bottom: 50px;
`

const AuctionCardsWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  max-width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  & > div {
    flex: 1;
    overflow: hidden;
  }
`
const SplitWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 12px 0;
  flex: 1;
  overflow: hidden;
`
const Header = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  height: 251px;
  width: 100%;
  padding-top: 36px;
  background-image: url(/images/auction-banner.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 300px;
  }
`

const StyledMonkey = styled.img`
  width: 400px;
  height: 250px;
  opacity: 0.07;
  border-radius: 0px;
  background-image: url(/images/auction-monkey.svg);
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 50px;
  border: 1px solid red;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 300px;
    width: 425px;
    right: 27px;
  }
`

const HeadingText = styled(Text)`
  position: absolute;
  text-align: center;
  letter-spacing: 0.05em;
  color: #fafafa;
  width: 366px;
  height: 125px;
  font-family: Titan One;
  font-style: normal;
  font-weight: normal;
  font-size: 50px;
  line-height: 57px;
  text-align: center;
  letter-spacing: 0.05em;
  ${({ theme }) => theme.mediaQueries.lg} {
    top: 155px;
    width: 585px;
    height: 80px;
    font-size: 70px;
    line-height: 20px;
  }
`

const Auction: React.FC = () => {
  const { auctions } = useAuctions()

  return (
    <SwiperProvider>
      <Container>
        <Header>
          <StyledMonkey />
          <HeadingText>NFA Auction</HeadingText>
        </Header>
        <PageWrapper>
          <SplitWrapper>
            <AuctionCardsWrapper>{auctions && <Positions auctions={auctions} />}</AuctionCardsWrapper>
          </SplitWrapper>
        </PageWrapper>
      </Container>
    </SwiperProvider>
  )
}

export default Auction
