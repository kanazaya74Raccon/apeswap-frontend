import React from 'react'
import styled from 'styled-components'
import { Text, Skeleton } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'

export interface LiquidityProps {
  liquidity: BigNumber
}

const LiquidityWrapper = styled.div`
  font-weight: 600;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 190px;

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
  font-family: 'Titan One', sans-serif;
`

const Liquidity: React.FunctionComponent<LiquidityProps> = ({ liquidity }) => {
  const displayLiquidity = liquidity ? (
    `$${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  ) : (
    <Skeleton marginLeft="20px" width={110} />
  )

  return (
    <Container>
      <LiquidityWrapper>
        <StyledText>{displayLiquidity}</StyledText>
      </LiquidityWrapper>
    </Container>
  )
}

export default Liquidity
