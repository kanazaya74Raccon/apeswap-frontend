import React from 'react'
import styled from 'styled-components'
import { IfoStatus } from 'config/constants/types'
import { Text, Flex, Heading } from '@apeswapfinance/uikit'

interface IfoCardHeaderProps {
  ifoId: string
  gnana?: boolean
  isComingSoon: boolean
  isLoading: boolean
  status: IfoStatus
  secondsUntilStart: number
  secondsUntilEnd: number
}

const StyledIfoCardHeader = styled(Flex)`
  & > div {
    flex: 1;
  }
`

const Stack = styled(Flex)`
  flex-direction: column;
  margin-left: 20px;
`

const IfoCardHeader: React.FC<IfoCardHeaderProps> = ({
  ifoId,
  gnana,
  isComingSoon,
  isLoading,
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
      return <Text>Finished!</Text>
    }
    return null
  }

  return (
    <StyledIfoCardHeader mb="24px" alignItems="center">
      <img src={`/images/ifos/${ifoId}.svg`} alt={ifoId} width="64px" height="64px" />
      <Stack>
        <Heading>{`${gnana ? 'GNANA' : 'BNB'} OFFERING`}</Heading>
        {getStatus()}
      </Stack>
    </StyledIfoCardHeader>
  )
}

export default IfoCardHeader
