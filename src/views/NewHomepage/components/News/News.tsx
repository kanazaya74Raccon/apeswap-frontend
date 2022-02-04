import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex } from '@apeswapfinance/uikit'
import { NewsWrapper } from './styles'

const News: React.FC = () => {
  const { chainId } = useActiveWeb3React()

  return <NewsWrapper />
}

export default News
