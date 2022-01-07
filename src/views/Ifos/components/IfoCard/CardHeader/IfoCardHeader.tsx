import React from 'react'
import { IfoStatus } from 'config/constants/types'
import { Text } from '@apeswapfinance/uikit'

import { StyledIfoCardHeader, Stack, Title } from './styles'

interface IfoCardHeaderProps {
  ifoId: string
  gnana?: boolean
  isLP?: boolean
  isComingSoon: boolean
  isLoading: boolean
  status: IfoStatus
  secondsUntilStart: number
  secondsUntilEnd: number
}

const IfoCardHeader: React.FC<IfoCardHeaderProps> = ({
  ifoId,
  gnana,
  isComingSoon,
  isLoading,
  isLP,
  status,
  secondsUntilStart,
  secondsUntilEnd,
}) => {
  const countdownToUse = status === 'coming_soon' ? secondsUntilStart : secondsUntilEnd

  const getStatus = () => {
    if (isComingSoon) {
      return <Text>Coming Soon!</Text>
    }

    if (isLoading) {
      return <Text>Loading...</Text>
    }

    if (countdownToUse <= 0) {
      return <Text>Finished</Text>
    }

    if (status === 'live') {
      return <Text>LIVE NOW!</Text>
    }
    return null
  }

  return (
    <StyledIfoCardHeader mb="24px" alignItems="center">
      <img src={`/images/ifos/${ifoId}.svg`} alt={ifoId} width="64px" height="64px" />
      <Stack>
        {isLP && <Title as="h2">LP OFFERING</Title>}
        {!isLP && <Title as="h2">{`${gnana ? 'GNANA' : 'BNB'} OFFERING`}</Title>}
        {getStatus()}
      </Stack>
    </StyledIfoCardHeader>
  )
}

export default IfoCardHeader
