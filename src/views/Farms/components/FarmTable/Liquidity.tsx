import React, { useMemo } from 'react'
import styled from 'styled-components'
import { HelpIcon, Text } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { usePriceBnbBusd, usePriceBananaBusd, usePriceEthBusd } from 'state/hooks'
import { QuoteToken } from 'config/constants/types'

import Tooltip from '../Tooltip/Tooltip'

export interface LiquidityProps {
  farm: any
}

const LiquidityWrapper = styled.div`
  min-width: 110px;
  font-weight: 600;
  text-align: right;

  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: left;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 14px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 0;
    }
  }
`

const Liquidity: React.FunctionComponent<LiquidityProps> = ({ farm }) => {
  const bananaPrice = usePriceBananaBusd()
  const bnbPrice = usePriceBnbBusd()
  const ethPrice = usePriceEthBusd()

  const totalValue = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.BANANA) {
      return bananaPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.ETH) {
      return ethPrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, bananaPrice, ethPrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const TranslateString = useI18n()

  return (
    <Container>
      <LiquidityWrapper>
        <Text>{totalValueFormated}</Text>
      </LiquidityWrapper>
      <Tooltip content={TranslateString(999, 'The total value of the funds in this farm’s liquidity pool')}>
        <HelpIcon color="textSubtle" />
      </Tooltip>
    </Container>
  )
}

export default Liquidity
