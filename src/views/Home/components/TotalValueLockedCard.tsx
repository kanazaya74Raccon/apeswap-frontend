import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text, Flex, ArrowForwardIcon } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useTvl } from 'state/hooks'
import { NavLink } from 'react-router-dom'
import PersonalTvl from './PersonalTvl'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
  background: ${({ theme }) => (theme.isDark ? '#27262c' : '#A16552')};
  max-width: 100%;
  width: 100%;
  max-height: 210px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 15px;
  }
`
const StyledNavLink = styled(NavLink)`
  width: 100%;
  height: 100%;
`

const StyledText = styled(Text)`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.05em;
`

const StyledLink = styled(Heading)`
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
      <StyledNavLink to="/stats">
        <img
          width="250px"
          style={{ opacity: 0.1, position: 'absolute', right: '0px', top: '60px' }}
          src="/images/monkey.svg"
          alt="monkey"
        />
        <CardBody>
          <StyledHeading size="sm" mb="6px" color="white">
            {TranslateString(999, 'Total Value Locked (TVL)')}
          </StyledHeading>
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
          <Flex justifyContent="flex-end">
            <StyledLink color="white" size="sm" mt="10px" fontFamily="poppins">
              {TranslateString(999, 'Account TVL')}
            </StyledLink>
            <ArrowForwardIcon mt={10} color="white" />
          </Flex>
        </CardBody>
      </StyledNavLink>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
