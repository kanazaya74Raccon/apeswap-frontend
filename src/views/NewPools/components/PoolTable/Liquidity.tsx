import React from 'react'
import styled from 'styled-components'
import { Text, Skeleton } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'

export interface LiquidityProps {
  staked: number
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
`

const Staked: React.FunctionComponent<LiquidityProps> = ({ staked }) => {
  const displayStaked = staked ? (
    `${Number(staked).toLocaleString(undefined, { maximumFractionDigits: 3 })}`
  ) : (
    <Skeleton width={60} />
  )

  return (
    <Container>
      <LiquidityWrapper>
        <StyledText>{displayStaked}</StyledText>
      </LiquidityWrapper>
    </Container>
  )
}

export default Staked
