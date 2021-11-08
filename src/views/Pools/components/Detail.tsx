import React from 'react'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@apeswapfinance/uikit'
import { FarmPool } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import getTimePeriods from 'utils/getTimePeriods'
import { BSC_BLOCK_TIME } from 'config'

interface Time {
    days?: number
    months?: number
    hours?: number
    minutes?: number
}
export interface ExpandableSectionProps {
  bscScanAddress?: string
  blocksUntilStart?: number
  timeUntilStart?: Time
  timeUntilEnd?: Time
  blocksRemaining?: number
  totalStakedFormated?: string
  addLiquidityUrl?: string
  lpLabel?: string
  totalUserStaked?: number
  rawEarningsBalance?: number
  rewardTokenPrice?: number
  projectLink?: string
  type?: string
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

const Detail: React.FC<ExpandableSectionProps> = ({
    blocksUntilStart,
    timeUntilStart,
    blocksRemaining,
    timeUntilEnd,
    totalStakedFormated,
    addLiquidityUrl,
    lpLabel,
    totalUserStaked,
    rawEarningsBalance,
    rewardTokenPrice,
    bscScanAddress,
    projectLink,
    type,
}) => {
  const TranslateString = useI18n()
  const totalStakedTitle = type === 'card' ? 'Total Staked Value' : 'Total Staked'
  return (
    <>
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
          {TranslateString(316, totalStakedTitle)}:
        </StyledText>
        <StyledText fontFamily="poppins" fontSize="12px">
          {totalStakedFormated}
        </StyledText>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontFamily="poppins" fontSize="12px">
          {TranslateString(316, 'Stake')}:
        </StyledText>
        <StyledLinkExternal href={addLiquidityUrl} className="noClick">{lpLabel}</StyledLinkExternal>
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
        <StyledLink external href={bscScanAddress} bold={false} className="noClick">
          {TranslateString(356, 'View on BscScan')}
        </StyledLink>
      </Flex>
      <Flex justifyContent="center">
        <StyledLink external href={projectLink} bold={false} className="noClick">
          {TranslateString(356, 'View Project Site')}
        </StyledLink>
      </Flex>
      <Flex justifyContent="center">
        <StyledLink bold={false} className="noClick">
          {TranslateString(356, 'Add to Metamask')}
        </StyledLink>
      </Flex>
    </>
  )
}

export default Detail
