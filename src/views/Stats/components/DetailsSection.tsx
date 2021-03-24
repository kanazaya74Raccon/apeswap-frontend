import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, LinkExternal } from '@apeswapfinance/uikit'
import { FarmPool } from 'state/types'
import CardValue from 'views/Home/components/CardValue'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  farmStats?: FarmPool
}

const Wrapper = styled.div`
  margin-top: 24px;
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

const DetailsSection: React.FC<ExpandableSectionProps> = ({ farmStats, bscScanAddress }) => {
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <Text fontSize="24px">{TranslateString(23, 'Earnings')}</Text>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(23, 'Daily')}:</Text>
        <CardValue fontSize="14px" decimals={2} value={farmStats.dollarsEarnedPerDay} prefix="$" />
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(23, 'Weekly')}:</Text>
        <CardValue fontSize="14px" decimals={2} value={farmStats.dollarsEarnedPerWeek} prefix="$" />
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(23, 'Monthly')}:</Text>
        <CardValue fontSize="14px" decimals={2} value={farmStats.dollarsEarnedPerMonth} prefix="$" />
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(23, 'Yearly')}:</Text>
        <CardValue fontSize="14px" decimals={2} value={farmStats.dollarsEarnedPerYear} prefix="$" />
      </Flex>
      <Flex justifyContent="center">
        <StyledLinkExternal external href={bscScanAddress} bold={false}>
          {TranslateString(356, 'View on BscScan')}
        </StyledLinkExternal>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
