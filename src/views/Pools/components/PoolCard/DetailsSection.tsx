import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, Flex, Link, LinkExternal } from '@apeswapfinance/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import getTimePeriods from 'utils/getTimePeriods'
import { BSC_BLOCK_TIME } from 'config'

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
}

const Wrapper = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: bold;
  font-family: 'Poppins';
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const StyledText = styled(Text)`
  font-weight: bold;
`

const StyledTextGreen = styled(Text)`
  font-weight: bold;
  color: #38a611;
`

const StyledLink = styled(Link)`
  font-size: 12px;
  text-decoration-line: underline;
  margin-bottom: 14px;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  lpLabel,
  addLiquidityUrl,
  personalValueStaked,
  totalStaked,
  blocksRemaining,
  blocksUntilStart,
  stakedTokenPrice,
  rewardTokenPrice,
  pendingReward,
  projectSite,
}) => {
  const TranslateString = useI18n()

  const totalDollarAmountStaked = totalStaked * stakedTokenPrice

  const totalDollarAmountStakedFormated = totalDollarAmountStaked
    ? `${Number(totalDollarAmountStaked).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : '-'

  const earnings = new BigNumber(pendingReward || 0)
  const rawEarningsBalance = getBalanceNumber(earnings)
  const totalUserStaked = personalValueStaked > 0 ? (personalValueStaked * stakedTokenPrice).toFixed(2) : 0

  const timeUntilStart = getTimePeriods(blocksUntilStart * BSC_BLOCK_TIME)
  const timeUntilEnd = getTimePeriods(blocksRemaining * BSC_BLOCK_TIME)

  return (
    <Wrapper>
      {blocksUntilStart > 0 && (
        <>
          <Flex justifyContent="space-between">
            <StyledText fontFamily="poppins" fontSize="12px">
              {TranslateString(410, 'Start')}
            </StyledText>
            <StyledText
              fontFamily="poppins"
              fontSize="12px"
            >{`${timeUntilStart.days}d, ${timeUntilStart.hours}h, ${timeUntilStart.minutes}m`}</StyledText>
          </Flex>
        </>
      )}
      {blocksUntilStart === 0 && blocksRemaining > 0 && (
        <>
          <Flex justifyContent="space-between">
            <StyledText fontFamily="poppins" fontSize="12px">
              {TranslateString(410, 'End')}
            </StyledText>
            <StyledText fontFamily="poppins" fontSize="12px">{`${timeUntilEnd.days + timeUntilEnd.months * 30}d, ${
              timeUntilEnd.hours
            }h, ${timeUntilEnd.minutes}m`}</StyledText>
          </Flex>
        </>
      )}
      <Flex justifyContent="space-between">
        <StyledText fontFamily="poppins" fontSize="12px">
          {TranslateString(316, 'Total Staked Value')}:
        </StyledText>
        <StyledTextGreen fontFamily="poppins" fontSize="12px">
          ${totalDollarAmountStakedFormated}
        </StyledTextGreen>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontFamily="poppins" fontSize="12px">
          {TranslateString(316, 'Stake')}:
        </StyledText>
        <StyledLinkExternal href={addLiquidityUrl}>{lpLabel}</StyledLinkExternal>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontFamily="poppins" fontSize="12px">
          {TranslateString(23, 'Staked Value')}:
        </StyledText>
        <StyledTextGreen fontFamily="poppins" fontSize="12px">
          ${totalUserStaked}
        </StyledTextGreen>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontFamily="poppins" fontSize="12px">
          {TranslateString(23, 'Earned Value')}:
        </StyledText>
        <StyledTextGreen fontFamily="poppins" fontSize="12px">
          ${(rawEarningsBalance * rewardTokenPrice).toFixed(2)}
        </StyledTextGreen>
      </Flex>
      <Flex justifyContent="center">
        <StyledLink external href={bscScanAddress} bold={false}>
          {TranslateString(356, 'View on BscScan')}
        </StyledLink>
      </Flex>
      <Flex justifyContent="center">
        <StyledLink external href={projectSite} bold={false}>
          {TranslateString(356, 'View Project Site')}
        </StyledLink>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
