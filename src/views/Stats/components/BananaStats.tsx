import React from 'react'
import { Card, CardBody, Heading, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { Stats } from 'state/types'
import useI18n from 'hooks/useI18n'
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

const BananaStats: React.FC<BananaStatsProps> = ({ stats }) => {
  const TranslateString = useI18n()
  return (
    <StyledBananaStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'Your Ape Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'TVL All Pools')}</Text>
          <CardValue fontSize="14px" decimals={2} value={stats.tvl} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'BANANA Price')}</Text>
          <CardValue fontSize="14px" value={stats.bananaPrice} decimals={2} prefix="$" />
        </Row>
        <Row style={{ alignItems: 'flex-start' }}>
          <Text fontSize="14px">{TranslateString(538, 'Your BANANA earnings ($)')}</Text>
          <Text fontSize="14px" style={{ textAlign: 'end' }}>
            <Divider />
            <CardValue fontSize="14px" value={stats.bananasEarnedPerDay} decimals={2} prefix="Day: " />
            <CardValue fontSize="12px" value={stats.dollarsEarnedPerDay} decimals={2} prefix="($" suffix=")" />
            <Divider />
            <CardValue fontSize="14px" value={stats.bananasEarnedPerWeek} decimals={2} prefix="Week: " />
            <CardValue fontSize="12px" value={stats.dollarsEarnedPerWeek} decimals={2} prefix="($" suffix=")" />
            <Divider />
            <CardValue fontSize="14px" value={stats.bananasEarnedPerYear} decimals={2} prefix="Year: " />
            <CardValue fontSize="12px" value={stats.dollarsEarnedPerYear} decimals={2} prefix="($" suffix=")" />
            <Divider />
          </Text>
        </Row>
        <Row style={{ alignItems: 'flex-start' }}>
          <Text fontSize="14px">{TranslateString(538, 'Your APR (%)')}</Text>
          <Text fontSize="14px" style={{ textAlign: 'end' }}>
            <CardValue fontSize="14px" value={stats.aggregateAprPerDay * 100} decimals={2} prefix="Day" suffix="%" />
            <CardValue fontSize="14px" value={stats.aggregateAprPerWeek * 100} decimals={2} prefix="Week" suffix="%" />
            <CardValue fontSize="14px" value={stats.aggregateApr * 100} decimals={2} prefix="Year" suffix="%" />
          </Text>
        </Row>
      </CardBody>
    </StyledBananaStats>
  )
}

export default BananaStats
