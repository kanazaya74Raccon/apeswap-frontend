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

// import Multiplier from '../FarmTable/Multiplier'

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

const ValueContainer = styled.div`
  display: block;
`

const StyledLink = styled(Link)`
  font-size: 12px;
  text-decoration-line: underline;
  margin-bottom: 14px;
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const StyledText = styled(Text)`
  font-weight: 700;
`

const StakedText = styled(Text)`
  font-weight: 700;
  margin-left 60px;
  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left 85px;
  }
`

const InfoContainer = styled.div`
  width: 285px;
`

const StakedValueText = styled(Text)`
  margin-left 60px;
  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left 85px;
  }
`

const MultiplierWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: 36px;
  text-align: right;
  margin-right: 2px;
  font-weight: 700;
  font-family: Poppins;
  font-size: 12px;
`

const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 14px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 0;
    }
  }
`

const ActionPanel: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  lpLabel,
  addLiquidityUrl,
  farmStats,
  multiplier,
  personalValueStaked,
  pid,
  totalStaked,
  blocksRemaining,
  isFinished,
  blocksUntilStart,
}) => {
  const TranslateString = useI18n()

  const totalPersonalStakedFormated = personalValueStaked
    ? `${Number(personalValueStaked).toLocaleString(undefined, { maximumFractionDigits: 3 })}`
    : '-'

  const totalStakedFormated = totalStaked
    ? `${Number(totalStaked).toLocaleString(undefined, { maximumFractionDigits: 3 })}`
    : '-'

  const { earnings } = useFarmUser(pid)
  const bananaPrice = usePriceBananaBusd()
  let earningsToReport = null
  let earningsBusd = 0
  let displayHarvestBalance = '?'

  const timeUntilStart = getTimePeriods(blocksUntilStart * BSC_BLOCK_TIME)
  const timeUntilEnd = getTimePeriods(blocksRemaining * BSC_BLOCK_TIME)

  if (earnings) {
    earningsToReport = getBalanceNumber(earnings)
    earningsBusd = earningsToReport * bananaPrice.toNumber()
    displayHarvestBalance = `$${earningsBusd.toLocaleString()}`
  }
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
              {totalPersonalStakedFormated}
            </StyledTextGreen>
          </Flex>
          <Flex justifyContent="space-between">
            <StyledText fontFamily="poppins" fontSize="12px">
              {TranslateString(23, 'Earned Value')}:
            </StyledText>
            <StyledTextGreen fontFamily="poppins" fontSize="12px">
              {displayHarvestBalance}
            </StyledTextGreen>
          </Flex>
          <Flex justifyContent="center">
            <StyledLink external href={bscScanAddress} bold={false}>
              {TranslateString(356, 'View on BscScan')}
            </StyledLink>
          </Flex>
        </InfoContainer>
      </Flex>
    </Wrapper>
  )
}

export default ActionPanel
