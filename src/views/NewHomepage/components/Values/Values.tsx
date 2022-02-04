import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex } from '@apeswapfinance/uikit'
import { ValuesWrapper } from './styles'

const Values: React.FC = () => {
  const { chainId } = useActiveWeb3React()

  return <ValuesWrapper />
}

export default Values
