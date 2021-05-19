import React from 'react'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@apeswapfinance/uikit'
import { FarmPool } from 'state/types'
import { useFarmUser, usePriceBananaBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import Multiplier from '../FarmTable/Multiplier'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  farmStats?: FarmPool
  multiplier?: string
  liquidity?: BigNumber
  pid?: number
}

const Wrapper = styled.div`
  margin-top: 24px;
  margin-left: 2px;
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

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
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
  farmStats,
  multiplier,
  pid,
  liquidity,
}) => {
  const TranslateString = useI18n()

  const totalValuePersonalFormated = farmStats
    ? `$${Number(farmStats.stakedTvl).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const totalValueFormated = liquidity
    ? `$${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const { earnings } = useFarmUser(pid)
  const bananaPrice = usePriceBananaBusd()
  let earningsToReport = null
  let earningsBusd = 0
  let displayHarvestBalance = '?'

  if (earnings) {
    earningsToReport = getBalanceNumber(earnings)
    earningsBusd = earningsToReport * bananaPrice.toNumber()
    displayHarvestBalance = `$${earningsBusd.toLocaleString()}`
  }

  return (
    <Wrapper>
      <ValueWrapper>
        <StyledText fontFamily="poppins" fontSize="12px">
          {TranslateString(999, 'Multiplier:')}
        </StyledText>
        <Multiplier multiplier={multiplier} />
      </ValueWrapper>
      <Flex justifyContent="space-between">
        <StyledText fontFamily="poppins" fontSize="12px">
          {TranslateString(316, 'Liquidity')}:
        </StyledText>
        <StyledText fontFamily="poppins" fontSize="12px">
          {totalValueFormated}
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
          {totalValuePersonalFormated}
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
    </Wrapper>
  )
}

export default DetailsSection
