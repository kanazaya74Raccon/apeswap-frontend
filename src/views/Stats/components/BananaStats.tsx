import React, { useMemo } from 'react'
import { Card, CardBody, Heading, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { Stats } from 'state/types'
import useI18n from 'hooks/useI18n'
import { usePriceBananaBusd } from 'state/hooks'
import useTokenBalance from 'hooks/useTokenBalance'
import { getGoldenBananaAddress } from 'utils/addressHelpers'
import { getFullDisplayBalance } from 'utils/formatBalance'
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
  const price = usePriceBananaBusd()
  const goldenBananaBalance = useTokenBalance(getGoldenBananaAddress())

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(goldenBananaBalance)
  }, [goldenBananaBalance])

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
          <Text fontSize="14px">{TranslateString(536, 'GNANA Holdings')}</Text>
          <CardValue fontSize="14px" value={parseFloat(fullBalance)} decimals={2} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'BANANA Price')}</Text>
          <CardValue fontSize="14px" value={price.toNumber()} decimals={2} prefix="$" />
        </Row>
        <Row style={{ alignItems: 'flex-start' }}>
          <Text fontSize="14px">{TranslateString(538, 'Your BANANA earnings ($)')}</Text>
          <Text fontSize="14px" style={{ textAlign: 'end' }}>
            <Divider />
            <CardValue fontSize="14px" value={stats.bananasEarnedPerDay} decimals={2} prefix="Daily: " />
            <CardValue fontSize="12px" value={stats.dollarsEarnedPerDay} decimals={2} prefix="($" suffix=")" />
            <Divider />
            <CardValue fontSize="14px" value={stats.bananasEarnedPerWeek} decimals={2} prefix="Weekly: " />
            <CardValue fontSize="12px" value={stats.dollarsEarnedPerWeek} decimals={2} prefix="($" suffix=")" />
            <Divider />
            <CardValue fontSize="14px" value={stats.bananasEarnedPerMonth} decimals={2} prefix="Monthly: " />
            <CardValue fontSize="12px" value={stats.dollarsEarnedPerMonth} decimals={2} prefix="($" suffix=")" />
            <Divider />
            <CardValue fontSize="14px" value={stats.bananasEarnedPerYear} decimals={2} prefix="Yearly: " />
            <CardValue fontSize="12px" value={stats.dollarsEarnedPerYear} decimals={2} prefix="($" suffix=")" />
            <Divider />
          </Text>
        </Row>
        <Row style={{ alignItems: 'flex-start' }}>
          <Text fontSize="14px">{TranslateString(538, 'Your APR (%)')}</Text>
          <Text fontSize="14px" style={{ textAlign: 'end' }}>
            <CardValue fontSize="14px" value={stats.aggregateAprPerDay * 100} decimals={2} prefix="Daily" suffix="%" />
            <CardValue
              fontSize="14px"
              value={stats.aggregateAprPerWeek * 100}
              decimals={2}
              prefix="Weekly"
              suffix="%"
            />
            <CardValue
              fontSize="14px"
              value={stats.aggregateAprPerMonth * 100}
              decimals={2}
              prefix="Monthly"
              suffix="%"
            />
            <CardValue fontSize="14px" value={stats.aggregateApr * 100} decimals={2} prefix="Yearly" suffix="%" />
          </Text>
        </Row>
      </CardBody>
    </StyledBananaStats>
  )
}

export default BananaStats
