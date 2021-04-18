import React from 'react'
import { BaseLayout, Heading } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { TranslateString } from 'utils/translateTextHelpers'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Divider from './components/Divider'
import BuyCard from './components/BuyCard'
import SellCard from './components/SellCard'
import Iao from './components/IAO/CurrentIao'
import Description from './components/Description/Description'
import Pools from './components/Pools/Pools'

const StyledHero = styled.div`
  background-color: #af6e5aff;
  padding-bottom: 40px;
  padding-top: 40px;
  margin-bottom: 32px;
  padding-left: 53px;
  padding-right: 53px;
`

const StyledHeroSection = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`

const MarginContainer = styled.div`
  margin: 53px 30px;
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin: 32px 0px;
  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const Zone = () => {
  const { account } = useWallet()

  return (
    <>
      <Description />
      <StyledHeroSection>
        <MarginContainer>
          <Heading size="xl" mb="26px" color="primary">
            {TranslateString(999, 'ApeZone')}
          </Heading>
          <Heading size="sm" fontFamily="poppins" color="primary">
            GOLDEN BANANA
          </Heading>
          <Heading size="sm" fontFamily="poppins" color="primary">
            Pay a 30% burn fee to get your hands into golden BANANA
          </Heading>
          <Cards>
            <BuyCard account={account} />
            <SellCard account={account} />
          </Cards>
        </MarginContainer>
      </StyledHeroSection>
      <Iao />
      <Divider />
      <Pools />
    </>
  )
}
export default Zone
