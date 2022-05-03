import React from 'react'
import { ArrowDropUpIcon, Flex, Text } from '@apeswapfinance/uikit'
import StyledInternalLink from './index'

const LiquidityPositionLink = () => {
  return (
    <StyledInternalLink to="/pool">
      <Flex justifyContent="flex-start" margin="0px 30px 0px 26px">
        <ArrowDropUpIcon width="11px" style={{ transform: 'rotate(270deg)', marginRight: '10px' }} />
        <Text fontSize="13px">See your Liquidity Positons</Text>
      </Flex>
    </StyledInternalLink>
  )
}

export default LiquidityPositionLink
