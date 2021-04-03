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
      <a href="https://ape-swap.medium.com/introducing-the-apeswap-buidl-program-%EF%B8%8F-bf1d6c74e145" target="_blank" rel="noreferrer">
        <CardBody>
          <Heading size="lg" mb="24px">
            ⚒️ Introducing the ApeSwap BUIDL Program ⚒️
          </Heading>
          <>
            <Text color="textSubtle">If you are an up and coming project on BSC you can apply to get into the jungle</Text>
            <Text color="textSubtle">
              <StyledLink href="https://ape-swap.medium.com/introducing-the-apeswap-buidl-program-%EF%B8%8F-bf1d6c74e145" target="_blank" rel="noreferrer">Come grow with us 🚀</StyledLink>
            </Text>
          </>
        </CardBody>
      </a>
    </StyledPromoCard>
  )
}

export default PromoCard
