import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex } from '@apeswapfinance/uikit'
import { LaunchCalendarWrapper } from './styles'

const LaunchCalendar: React.FC = () => {
  const { chainId } = useActiveWeb3React()

  return <LaunchCalendarWrapper />
}

export default LaunchCalendar
