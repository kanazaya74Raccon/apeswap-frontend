import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex } from '@apeswapfinance/uikit'
import { ServiceWrapper } from './styles'

const Services: React.FC = () => {
  const { chainId } = useActiveWeb3React()

  return <ServiceWrapper />
}

export default Services
