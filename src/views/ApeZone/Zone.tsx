import React from 'react'
import { BaseLayout } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Divider from 'views/Farms/components/Divider'
import BuyCard from './components/BuyCard'
import SellCard from './components/SellCard'
import Iao from './components/IAO/CurrentIao'
import Pools from './components/Pools/Pools'

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin: 32px 0;

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
      <Cards>
        <BuyCard account={account} />
        <SellCard account={account} />
      </Cards>
      <Divider />
      <Iao />
      <Divider />
      <Pools />
    </>
  )
}
export default Zone
