import React from 'react'
import { Card, CardBody, Heading, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { Stats } from 'state/types'
import useI18n from 'hooks/useI18n'
import { usePriceBananaBusd } from 'state/hooks'
import CardValue from './CardValue'
import Divider from './Divider'

export interface BananaStatsProps {
  stats?: Stats
}

const StyledBananaStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const StyledHeading = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? 'white' : '#af6e5aff')};
`

const StyledText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'white' : '#af6e5aff')};
`

const StyledCardValue = styled(CardValue)`
  color: ${({ theme }) => (theme.isDark ? 'white' : '#af6e5aff')};
`

const BananaStats: React.FC<BananaStatsProps> = ({ stats }) => {
  const TranslateString = useI18n()
  const price = usePriceBananaBusd()
  return (
    <StyledBananaStats>
      <CardBody>
        <StyledHeading size="xl" mb="24px">
          {TranslateString(534, 'Your Ape Stats')}
        </StyledHeading>
        <Row>
          <StyledText fontSize="14px">{TranslateString(536, 'TVL All Pools')}</StyledText>
          <StyledCardValue fontSize="14px" decimals={2} value={stats.tvl} prefix="$" />
        </Row>
        <Row>
          <StyledText fontSize="14px">{TranslateString(536, 'BANANA Price')}</StyledText>
          <StyledCardValue fontSize="14px" value={price.toNumber()} decimals={2} prefix="$" />
        </Row>
        <Row style={{ alignItems: 'flex-start' }}>
          <StyledText fontSize="14px">{TranslateString(538, 'Your BANANA earnings ($)')}</StyledText>
          <StyledText fontSize="14px" style={{ textAlign: 'end' }}>
            <Divider />
            <StyledCardValue fontSize="14px" value={stats.bananasEarnedPerDay} decimals={2} prefix="Daily: " />
            <StyledCardValue fontSize="12px" value={stats.dollarsEarnedPerDay} decimals={2} prefix="($" suffix=")" />
            <Divider />
            <StyledCardValue fontSize="14px" value={stats.bananasEarnedPerWeek} decimals={2} prefix="Weekly: " />
            <StyledCardValue fontSize="12px" value={stats.dollarsEarnedPerWeek} decimals={2} prefix="($" suffix=")" />
            <Divider />
            <StyledCardValue fontSize="14px" value={stats.bananasEarnedPerMonth} decimals={2} prefix="Monthly: " />
            <StyledCardValue fontSize="12px" value={stats.dollarsEarnedPerMonth} decimals={2} prefix="($" suffix=")" />
            <Divider />
            <StyledCardValue fontSize="14px" value={stats.bananasEarnedPerYear} decimals={2} prefix="Yearly: " />
            <StyledCardValue fontSize="12px" value={stats.dollarsEarnedPerYear} decimals={2} prefix="($" suffix=")" />
            <Divider />
          </StyledText>
        </Row>
        <Row style={{ alignItems: 'flex-start' }}>
          <StyledText fontSize="14px">{TranslateString(538, 'Your APR (%)')}</StyledText>
          <StyledText fontSize="14px" style={{ textAlign: 'end' }}>
            <StyledCardValue
              fontSize="14px"
              value={stats.aggregateAprPerDay * 100}
              decimals={2}
              prefix="Daily"
              suffix="%"
            />
            <StyledCardValue
              fontSize="14px"
              value={stats.aggregateAprPerWeek * 100}
              decimals={2}
              prefix="Weekly"
              suffix="%"
            />
            <StyledCardValue
              fontSize="14px"
              value={stats.aggregateAprPerMonth * 100}
              decimals={2}
              prefix="Monthly"
              suffix="%"
            />
            <StyledCardValue fontSize="14px" value={stats.aggregateApr * 100} decimals={2} prefix="Yearly" suffix="%" />
          </StyledText>
        </Row>
      </CardBody>
    </StyledBananaStats>
  )
}

export default BananaStats
