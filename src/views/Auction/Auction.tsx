import React from 'react'
import styled from 'styled-components'
import { Flex, useMatchBreakpoints } from '@apeswapfinance/uikit'
import SwiperProvider from 'contexts/SwiperProvider'
import Banner from 'components/Banner'
import { useAuctions, useFetchAuctions } from 'state/hooks'
import Positions from './components/Positions'
import Container from './components/Container'
import History from './components/History'
import ListYourNfa from './components/Actions/ListYourNfa'

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
  font-weight: 600;
  line-height: 32.5px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #fafafa;
  text-align: center;
  cursor: pointer;
  margin-right: 10px;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.colors.yellowHover};
  }
`

const Auction: React.FC = () => {
  useFetchAuctions()
  const { auctions } = useAuctions()
  const { isXl, isXxl } = useMatchBreakpoints()
  const isDesktop = isXxl || isXl
  return (
    <SwiperProvider>
      <Container>
        <Flex alignItems="center" justifyContent="center">
          <Flex alignSelf="center" style={{ width: '1200px' }}>
            <Banner banner="auction" title="Nfa Auction" margin="30px 10px 20px 10px" />
          </Flex>
        </Flex>
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
