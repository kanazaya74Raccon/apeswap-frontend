import React from 'react'
import styled from 'styled-components'
import { IfoStatus } from 'config/constants/types'
import { Text } from '@apeswapfinance/uikit'

import { useTranslation } from 'contexts/Localization'
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

const StyledText = styled(Text)`
  font-weight: 300;
`

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
  const { t } = useTranslation()

  const getStatus = () => {
    if (isComingSoon) {
      return <Text>{t('Coming Soon!')}</Text>
    }

    if (isLoading) {
      return <Text>{t('Loading')}...</Text>
    }

    if (countdownToUse <= 0) {
      return <StyledText>{t('Finished')}</StyledText>
    }

    if (status === 'live') {
      return <Text>{t('LIVE NOW!')}</Text>
    }
    return null
  }

  return (
    <StyledIfoCardHeader mb="24px" alignItems="top">
      <img src={`/images/ifos/${ifoId}.svg`} alt={ifoId} width="64px" height="64px" />
      <Stack>
        {isLP && <Title as="h2">{t('LP OFFERING')}</Title>}
        {!isLP && <Title as="h2">{`${gnana ? 'GNANA' : 'BNB'} ${t('OFFERING')}`}</Title>}
        {getStatus()}
      </Stack>
    </StyledIfoCardHeader>
  )
}

export default IfoCardHeader
