import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import SwiperProvider from 'contexts/SwiperProvider'
import { useAuctions, useFetchAuctions } from 'state/hooks'
import Positions from './components/Positions'
import Container from './components/Container'
import History from './components/History'
import ListYourNfa from './components/Actions/ListYourNfa'

const float = keyframes`
  0% {transform: translate3d(0px, 0px, 0px);}
  25% {transform: translate3d(0px, 10px, 0px);}
  50% {transform: translate3d(0px, 0px, 0px);}
  75% {transform: translate3d(0px, -10px, 0px);}
  100% {transform: translate3d(0px, 0px, 0px);}
`

const floatMobile = keyframes`
  0% {transform: translate3d(0px, 0px, 0px);}
  25% {transform: translate3d(0px, 5px, 0px);}
  50% {transform: translate3d(0px, 0px, 0px);}
  75% {transform: translate3d(0px, -5px, 0px);}
  100% {transform: translate3d(0px, 0px, 0px);}
`

const PageWrapper = styled.div`
  display: none;
  display: flex;
  padding-bottom: 200px;
  margin-bottom: 100px;
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
  background-image: ${({ theme }) =>
    theme.isDark
      ? 'url(/images/mobile-nfa-auction-banner-dark.svg)'
      : 'url(/images/mobile-nfa-auction-banner-light.svg)'};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.xl} {
    height: 300px;
    background-image: ${({ theme }) =>
      theme.isDark ? 'url(/images/nfa-auction-banner-dark.svg)' : 'url(/images/nfa-auction-banner-light.svg)'};
  }
`

const AuctionFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 161px;
  height: 161px;
  margin-right: 120px;
  margin-top: 40px;
  background-image: url(/images/auction-frame.svg);
  background-repeat: no-repeat;
  background-size: cover;
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 274px;
    height: 274px;
    margin-left: 500px;
    margin-bottom: 30px;
    margin-top: 0px;
  }
`

const NfaHead = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(/images/nfa-head.svg);
  background-repeat: no-repeat;
  background-size: cover;
  animation: 10s ${floatMobile} linear infinite;
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 225px;
    height: 225px;
    animation: 10s ${float} linear infinite;
  }
`

const HeadingText = styled(Text)`
  position: absolute;
  text-align: center;
  letter-spacing: 0.05em;
  color: ${({ theme }) => (theme.isDark ? '#fafafa' : 'rgba(161, 101, 82, 1)')};
  width: 366px;
  height: 125px;
  font-family: Titan One;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 57px;
  text-align: center;
  letter-spacing: 0.05em;
  top: 5px;
  ${({ theme }) => theme.mediaQueries.xl} {
    top: 80px;
    margin-right: 525px;
    width: 585px;
    height: 80px;
    font-size: 70px;
    line-height: 20px;
  }
`
const SecondaryText = styled(Text)`
  position: absolute;
  text-align: center;
  letter-spacing: 0.05em;
  color: ${({ theme }) => (theme.isDark ? '#fafafa' : 'rgba(161, 101, 82, 1)')};
  width: 366px;
  height: 125px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 57px;
  text-align: center;
  letter-spacing: 0.05em;
  top: 40px;
  ${({ theme }) => theme.mediaQueries.xl} {
    top: 150px;
    margin-right: 525px;
    width: 585px;
    height: 80px;
    font-size: 20px;
    line-height: 20px;
  }
`

const MoreInfoWrapper = styled.div`
  position: absolute;
  width: 100%;
  right: 0;
  height: 60px;
  display: flex;
  flex-wrap: wrap-reverse;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ButtonHolder = styled.div`
  width: 340px;
  height: 60px;
  margin-left: 220px;
  display: flex;
  flex-wrap: wrap-reverse;
  flex-direction: column;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: 520px;
    width: 380px;
  }
`

const MoreInfo = styled.div`
  height: 35px;
  background: #ffb300;
  border-radius: 10px;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 32.5px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #fafafa;
  text-align: center;
  cursor: pointer;
  margin-right: 10px;
  width: 100%;
`

const Auction: React.FC = () => {
  useFetchAuctions()
  const { auctions } = useAuctions()
  const { isXl } = useMatchBreakpoints()
  const isDesktop = isXl
  return (
    <SwiperProvider>
      <Container>
        <Header>
          <AuctionFrame>
            <NfaHead />
          </AuctionFrame>
          <HeadingText>NFA Auction</HeadingText>
          <SecondaryText>Sell your Non-Fungible Ape to the highest bidder</SecondaryText>
        </Header>
        <PageWrapper>
          <MoreInfoWrapper>
            <ButtonHolder>
              <a
                href="https://apeswap.gitbook.io/apeswap-finance/product-information/non-fungible-apes-nfas/nfa-auction-house"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MoreInfo>HOW IT WORKS</MoreInfo>
              </a>
              <ListYourNfa />
            </ButtonHolder>
          </MoreInfoWrapper>
          <SplitWrapper>
            <AuctionCardsWrapper>{auctions && <Positions auctions={auctions} />}</AuctionCardsWrapper>
          </SplitWrapper>
          {isDesktop && <History />}
        </PageWrapper>
      </Container>
    </SwiperProvider>
  )
}

export default Auction
