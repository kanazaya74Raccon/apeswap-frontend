import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@apeswapfinance/uikit'
import { registerToken } from 'utils/wallet'

interface RewardToken {
  address?: any
  decimals?: number
  symbol?: string
}
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
  rewardToken?: RewardToken
  imageToken?: string
}

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
  rewardToken,
  imageToken,
}) => {
  const TranslateString = useI18n()
  const totalStakedTitle = type === 'card' ? 'Total Staked Value' : 'Total Staked'
  const chainId = process.env.REACT_APP_CHAIN_ID
  const URLactual = window.location

  return (
    <>
      {blocksUntilStart > 0 && (
        <>
          <StyledText fontSize="12px">{TranslateString(410, 'Start')}</StyledText>
          <StyledText
            fontFamily="poppins"
            fontSize="12px"
          >{`${timeUntilStart.days}d, ${timeUntilStart.hours}h, ${timeUntilStart.minutes}m`}</StyledText>
        </>
      )}
      {blocksUntilStart === 0 && blocksRemaining > 0 && (
        <>
          <Flex justifyContent="space-between">
            <StyledText fontSize="12px">{TranslateString(410, 'End')}</StyledText>
            <StyledText fontSize="12px">{rewardToken.symbol === 'BANANA' ? 'Never' : `${timeUntilEnd.days + timeUntilEnd.months * 30}d, ${timeUntilEnd.hours}h, ${
              timeUntilEnd.minutes
            }m`}</StyledText>
          </Flex>
        </>
      )}
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{TranslateString(316, totalStakedTitle)}:</StyledText>
        <StyledText fontSize="12px">{totalStakedFormated}</StyledText>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{TranslateString(316, 'Stake')}:</StyledText>
        <StyledLinkExternal href={addLiquidityUrl} className="noClick">
          {lpLabel}
        </StyledLinkExternal>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{TranslateString(23, 'Staked Value')}:</StyledText>
        <StyledTextGreen fontSize="12px">${totalUserStaked}</StyledTextGreen>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{TranslateString(23, 'Earned Value')}:</StyledText>
        <StyledTextGreen fontSize="12px">${(rawEarningsBalance * rewardTokenPrice).toFixed(2)}</StyledTextGreen>
      </Flex>
      <Flex justifyContent="center">
        <StyledLink external href={bscScanAddress} bold={false} className="noClick" fontFamily="Titan One">
          {TranslateString(356, 'View on BscScan')}
        </StyledLink>
      </Flex>
      <Flex justifyContent="center">
        <StyledLink external href={projectLink} bold={false} className="noClick" fontFamily="Titan One">
          {TranslateString(356, 'View Project Site')}
        </StyledLink>
      </Flex>
      <Flex justifyContent="center">
        <StyledLink
          bold={false}
          className="noClick"
          onClick={() =>
            registerToken(
              rewardToken?.address[chainId],
              rewardToken?.symbol,
              rewardToken?.decimals,
              `${URLactual.origin}/images/tokens/${imageToken || `${rewardToken?.symbol}.svg`}`,
            )
          }
          fontFamily="Titan One"
        >
          Add to Metamask
        </StyledLink>
      </Flex>
    </>
  )
}

export default Detail
