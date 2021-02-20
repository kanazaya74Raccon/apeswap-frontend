import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Image, Text } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { NavLink } from 'react-router-dom'

const StyledPromoCard = styled(Card)`
  text-align: center;
`
const StyledLink = styled.a`
  font-weight: 500;
  color: #ffb300;
  display: block;
`

const StyledNavLink = styled(NavLink)`
  font-weight: 500;
  color: #ffb300;
  display: block;
`
const StyledImage = styled(Image)`
  display: inline-block;
`

const PromoCard = () => {
  const TranslateString = useI18n()
  return (
    <StyledPromoCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          <StyledImage src="/images/tokens/BNB.svg" width={32} height={32} alt="BNB" />{' '}
          {TranslateString(999, '100 BNB Rewards are live!')}{' '}
          <StyledImage src="/images/tokens/BNB.svg" width={32} height={32} alt="BNB" />
        </Heading>
        <>
          <Text color="textSubtle">
            Stake <StyledImage src="/images/tokens/BANANA.svg" width={16} height={16} alt="BANANA" /> $BANANA and earn{' '}
            <StyledImage src="/images/tokens/BNB.svg" width={16} height={16} alt="BNB" /> BNB
            <StyledNavLink to="/pools"> Check it out!</StyledNavLink>
          </Text>
        </>
      </CardBody>
    </StyledPromoCard>
  )
}

export default PromoCard
