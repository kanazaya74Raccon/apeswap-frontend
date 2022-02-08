import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex } from '@apeswapfinance/uikit'
import { ColorWrap, LaunchCalendarWrapper, LaunchCard } from './styles'

const LaunchCalendar: React.FC = () => {
  const { chainId } = useActiveWeb3React()

  return (
    <ColorWrap>
      <LaunchCalendarWrapper>
        <LaunchCard />
        <LaunchCard />
        <LaunchCard />
        <LaunchCard />
        <LaunchCard />
        <LaunchCard />
      </LaunchCalendarWrapper>
    </ColorWrap>
  )
}

export default LaunchCalendar
