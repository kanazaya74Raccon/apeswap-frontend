import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useTvl } from 'state/hooks'
import { NavLink } from 'react-router-dom'
import PersonalTvl from './PersonalTvl'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
  background: ${({ theme }) => (theme.isDark ? '#3D3D3D' : '#A16552')};
  max-width: 427px;
  max-height: 150px;
  text-align: center;
`
const StyledNavLink = styled(NavLink)`
  font-weight: 500;
  color: #ffb300;
  margin-left: 16px;
  text-decoration: underline;
`
const StyledText = styled(Text)`
font-family: Poppins;
font-size: 12px;
line-height: 18px;
letter-spacing: 0.05em;
`

const StyledHeading = styled(Heading)`
text-align: center;
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
      <img width="250px" style={{ opacity: 0.1, position: 'absolute', right: '-80px', top: '0px' }} src="/images/monkey.svg" alt="monkey" />
      <CardBody>
        <Heading size="sm" mb="12px" color="white">
          {TranslateString(999, 'Total Value Locked (TVL)')}
        </Heading>
        {totalTvl ? (
          <>
            <CardValue fontSize="21px" decimals={0} value={totalTvl} prefix="$" color="white" />
            <StyledText color="white">{TranslateString(999, 'Across all LPs and BananaSplit Pools')}</StyledText>
          </>
        ) : (
          <>
            <Skeleton height={33} />
          </>
        )}
        <PersonalTvl />
        <StyledText color="white">
          {TranslateString(999, 'Account TVL')}
          <StyledNavLink to="/stats">{TranslateString(999, 'See Details')}</StyledNavLink>
        </StyledText>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
