import React, { useMemo } from 'react'
import styled from 'styled-components'
import { HelpIcon, Text, Skeleton } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { usePriceBnbBusd, usePriceBananaBusd, usePriceEthBusd } from 'state/hooks'
import { QuoteToken } from 'config/constants/types'
import BigNumber from 'bignumber.js'

import Tooltip from '../Tooltip/Tooltip'

export interface LiquidityProps {
  liquidity: BigNumber
}

const LiquidityWrapper = styled.div`
  min-width: 110px;
  font-weight: 600;
  text-align: right;
  margin-right: 2px;
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

const StyledText = styled(Text)`
  font-size: 20px;
`

const Liquidity: React.FunctionComponent<LiquidityProps> = ({ liquidity }) => {
  const displayLiquidity = liquidity ? (
    `$${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  ) : (
    <Skeleton width={60} />
  )

  const TranslateString = useI18n()

  return (
    <Container>
      <LiquidityWrapper>
        <StyledText>{displayLiquidity}</StyledText>
      </LiquidityWrapper>
    </Container>
  )
}

export default Liquidity
