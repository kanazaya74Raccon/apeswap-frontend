import React from 'react'
import styled from 'styled-components'
import { ArrowDropUpIcon, Flex, Text } from '@apeswapfinance/uikit'
import { Link } from 'react-router-dom'

const LiquidityPositionLink = () => {
  return (
    <Link to="/pool">
      <Flex margin="20px 10px 0px 26px">
        <ArrowDropUpIcon width="11px" style={{ transform: 'rotate(270deg)', marginRight: '10px' }} />
        <Text fontSize="13px">See your Liquidity Positons</Text>
      </Flex>
    </Link>
  )
}

export default LiquidityPositionLink
