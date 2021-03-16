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
      <NavLink to="/pools">
        <CardBody>
          <Heading size="lg" mb="24px">
            🚀 {TranslateString(999, 'NAUT Pool Open')} 🍌
          </Heading>
          <>
            <Text color="textSubtle">We are proud to open a NAUT rewards pool</Text>
            <Text color="textSubtle">🚀 After a successful IAO with over 1000% subscription rate 🚀</Text>
            <Text color="textSubtle">
              <StyledNavLink to="/pools"> Check it out!</StyledNavLink>
            </Text>
          </>
        </CardBody>
      </NavLink>
    </StyledPromoCard>
  )
}

export default PromoCard
