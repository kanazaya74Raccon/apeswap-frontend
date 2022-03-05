import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, Flex, Link } from '@apeswapfinance/uikit'
import { getBalanceNumber } from 'utils/formatBalance'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  multiplier?: string
  totalStaked?: number
  personalValueStaked?: number
  blocksRemaining?: number
  isFinished?: boolean
  blocksUntilStart?: number
  stakedTokenPrice?: number
  rewardTokenPrice?: number
  pendingReward?: BigNumber
  projectSite?: string
  tokenDecimals?: number
}

const Wrapper = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
`

const StyledText = styled(Text)`
  font-weight: 600;
`

const StyledTextGreen = styled(Text)`
  font-weight: 600;
  color: #38a611;
`

const StyledLink = styled(Link)`
  font-size: 12px;
  text-decoration-line: underline;
  margin-bottom: 14px;
  font-weight: 800;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  totalStaked,
  rewardTokenPrice,
  pendingReward,
  tokenDecimals,
}) => {
  const { t } = useTranslation()

  const earnings = new BigNumber(pendingReward || 0)
  const rawEarningsBalance = getBalanceNumber(earnings, tokenDecimals)

  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{t('Staked Amount')}:</StyledText>
        <StyledTextGreen fontSize="12px">{totalStaked}</StyledTextGreen>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{t('Earned Value')}:</StyledText>
        <StyledTextGreen fontSize="12px">${(rawEarningsBalance * rewardTokenPrice).toFixed(2)}</StyledTextGreen>
      </Flex>
      <Flex justifyContent="center">
        <StyledLink external href={bscScanAddress} bold={false}>
          {t('View on BscScan')}
        </StyledLink>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
