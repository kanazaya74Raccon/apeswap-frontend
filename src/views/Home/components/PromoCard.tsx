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
      <NavLink to="/iao">
        <CardBody>
          <Heading size="lg" mb="24px">
            🚀 {TranslateString(999, 'May the IAO be with you')} 🚀
          </Heading>
          <>
            <Text color="textSubtle">🌑 This time we are taking you to a galaxy far far away with YediYield 🌑</Text>
            <Text color="textSubtle">Launching Apr. 2,03:00 UTC </Text>
            <Text color="textSubtle">
              <StyledNavLink to="/iao"> Check it out!</StyledNavLink>
            </Text>
          </>
        </CardBody>
      </NavLink>
    </StyledPromoCard>
  )
}

export default PromoCard
