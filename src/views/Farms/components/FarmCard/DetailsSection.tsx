import React from 'react'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@apeswapfinance/uikit'
import { FarmPool } from 'state/types'
import Multiplier, { MultiplierProps } from '../FarmTable/Multiplier'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  farmStats?: FarmPool
  multiplier?: string
  pid?: number
}

const Wrapper = styled.div`
  margin-top: 24px;
  margin-left: 2px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
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
  font-weight: 700;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  addLiquidityUrl,
  farmStats,
  multiplier
  // pid
}) => {
  const TranslateString = useI18n()

  const totalValuePersonalFormated = farmStats
    ? `$${Number(farmStats.stakedTvl).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

    // const yo = multiplier;

      /* eslint-disable no-debugger */
  // debugger;
  /* eslint-enable no-debugger */

  return (
    <Wrapper>
      <ValueWrapper>
              <StyledText fontFamily="poppins" fontSize="12px">
                {TranslateString(999, 'Multiplier:')}
              </StyledText>
              <Multiplier multiplier={multiplier} />
            </ValueWrapper>
            {/* <ValueWrapper>
              <StyledText fontFamily="poppins" fontSize="12px">
                {TranslateString(999, 'Stake:')}
              </StyledText>
              <StyledText fontFamily="poppins" fontSize="12px">
                {farm.lpSymbol}
              </StyledText>
            </ValueWrapper> */}
      <Flex justifyContent="space-between">
        <Text>{TranslateString(316, 'Stake')}:</Text>
        <StyledLinkExternal href={addLiquidityUrl}>{lpLabel}</StyledLinkExternal>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(23, 'Staked Value')}:</Text>
        <Text>{totalValuePersonalFormated}</Text>
      </Flex>
      {!removed && (
        <Flex justifyContent="space-between">
          <Text>{TranslateString(23, 'Total Liquidity')}:</Text>
          <Text>{totalValueFormated}</Text>
        </Flex>
      )}
      <Flex justifyContent="flex-start">
        <Link external href={bscScanAddress} bold={false}>
          {TranslateString(356, 'View on BscScan')}
        </Link>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
