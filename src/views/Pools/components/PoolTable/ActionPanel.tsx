import React from 'react'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@apeswapfinance/uikit'
import { FarmPool } from 'state/types'
import { useFarmUser, usePriceBananaBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import getTimePeriods from 'utils/getTimePeriods'
import { BSC_BLOCK_TIME } from 'config'


export interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  farmStats?: FarmPool
  multiplier?: string
  totalStaked?: number
  personalValueStaked?: number
  pid?: number
  blocksRemaining?: number
  isFinished?: boolean
  blocksUntilStart?: number
  stakedTokenPrice?: number
  rewardTokenPrice?: number
  pendingReward?: BigNumber
  projectLink?: string
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 340px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 401px;
  }
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

const StyledTextGreen = styled(Text)`
  font-weight: bold;
  color: #38a611;
`

const StyledLink = styled(Link)`
  font-size: 12px;
  text-decoration-line: underline;
  margin-bottom: 14px;
`

const StyledText = styled(Text)`
  font-weight: 700;
`


const InfoContainer = styled.div`
  width: 285px;
`


const ActionPanel: React.FC<ExpandableSectionProps> = ({
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
  projectLink

}) => {
  const TranslateString = useI18n()

  const totalStakedFormated = totalStaked
    ? `${Number(totalStaked).toLocaleString(undefined, { maximumFractionDigits: 3 })}`
    : '-'

    const earnings = new BigNumber(pendingReward || 0)
    const rawEarningsBalance = getBalanceNumber(earnings)
    const totalUserStaked = personalValueStaked > 0 ? (personalValueStaked * stakedTokenPrice).toFixed(2) : 0

  const timeUntilStart = getTimePeriods(blocksUntilStart * BSC_BLOCK_TIME)
  const timeUntilEnd = getTimePeriods(blocksRemaining * BSC_BLOCK_TIME)

  return (
    <Wrapper>
      <Flex>
        <InfoContainer>
          {blocksUntilStart > 0 && (
            <>
              <StyledText fontFamily="poppins" fontSize="12px">
                {TranslateString(410, 'Start')}
              </StyledText>
              <StyledText
                fontFamily="poppins"
                fontSize="12px"
              >{`${timeUntilStart.days}d, ${timeUntilStart.hours}h, ${timeUntilStart.minutes}m`}</StyledText>
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
              {TranslateString(316, 'Total Staked')}:
            </StyledText>
            <StyledText fontFamily="poppins" fontSize="12px">
              {totalStakedFormated}
            </StyledText>
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
            ${(rawEarningsBalance*rewardTokenPrice).toFixed(2)}
            </StyledTextGreen>
          </Flex>
          <Flex justifyContent="center">
            <StyledLink external href={bscScanAddress} bold={false}>
              {TranslateString(356, 'View on BscScan')}
            </StyledLink>
          </Flex>
          <Flex justifyContent="center">
            <StyledLink external href={projectLink} bold={false}>
              {TranslateString(356, 'View Project Site')}
            </StyledLink>
          </Flex>
        </InfoContainer>
      </Flex>
    </Wrapper>
  )
}

export default ActionPanel
