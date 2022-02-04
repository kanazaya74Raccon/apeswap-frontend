import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex } from '@apeswapfinance/uikit'
import { TrendingTokensWrapper } from './styles'

const TrendingTokens: React.FC = () => {
  const { chainId } = useActiveWeb3React()

  return (
    <Flex mt="-40px" mb="10px" alignItems="center" justifyContent="center">
      <TrendingTokensWrapper />
    </Flex>
  )
}

export default TrendingTokens
