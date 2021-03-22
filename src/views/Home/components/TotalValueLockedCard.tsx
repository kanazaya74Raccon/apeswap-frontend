import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import {
  // useTvl,
  useStats,
  useStatsOverall,
} from 'state/hooks'
import PersonalTvl from './PersonalTvl'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()

  // keeping here in case don't want to use api
  // const newTvl = useTvl()
  // const totalTvl = newTvl.toNumber()

  const overallStats = useStatsOverall()
  const totalTvl = overallStats?.statsOverall?.tvl

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {TranslateString(999, 'Total Value Locked (TVL)')}
        </Heading>
        {totalTvl ? (
          <>
            <CardValue fontSize="40px" decimals={0} value={totalTvl} prefix="$" />
            <Text color="textSubtle">{TranslateString(999, 'Across all LPs and BananaSplit Pools')}</Text>
          </>
        ) : (
          <>
            <Skeleton height={66} />
          </>
        )}
        <PersonalTvl />
        <Text color="textSubtle">{TranslateString(999, 'Account TVL')}</Text>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
