import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text, ApeIcon } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useTvl } from 'state/hooks'
import { NavLink } from 'react-router-dom'
import PersonalTvl from './PersonalTvl'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  background: ${({ theme }) => (theme.isDark ? 'black' : '#A16552')};
  max-height: 500px;
`
const StyledNavLink = styled(NavLink)`
  font-weight: 500;
  color: #ffb300;
  margin-left: 16px;
  text-decoration: underline;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()

  // keeping here in case don't want to use api
  const newTvl = useTvl()
  const totalTvl = newTvl.toNumber()

  // const overallStats = useStatsOverall()
  // const totalTvl = overallStats?.statsOverall?.tvl

  return (
    <StyledTotalValueLockedCard>
      <ApeIcon width="400px" style={{opacity: .1, position: 'absolute', right: '-80px', top: '40px'}}/> 
      <CardBody>
        <Heading size="lg" mb="24px" color="white">
          {TranslateString(999, 'Total Value Locked (TVL)')}
        </Heading>
        {totalTvl ? (
          <>
            <CardValue fontSize="40px" decimals={0} value={totalTvl} prefix="$" color="white"/>
            <Text color="white">{TranslateString(999, 'Across all LPs and BananaSplit Pools')}</Text>
          </>
        ) : (
          <>
            <Skeleton height={66} />
          </>
        )}
        <PersonalTvl />
        <Text color="white">
          {TranslateString(999, 'Account TVL')}
          <StyledNavLink to="/stats">{TranslateString(999, 'See Details')}</StyledNavLink>
        </Text>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
