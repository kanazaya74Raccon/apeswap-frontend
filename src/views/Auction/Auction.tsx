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
  height: 100%;
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
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: url(/images/auction-banner.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledMonkey = styled.img`
  height: 299px;
  width: 425px;
  opacity: 0.07;
  border-radius: 0px;
  background-image: url(/images/auction-monkey.svg);
  background-repeat: no-repeat;
  margin-bottom: 50px;
`

const HeadingText = styled(Text)`
  position: absolute;
  width: 585px;
  height: 80px;
  font-size: 70px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.05em;
  color: #fafafa;
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
