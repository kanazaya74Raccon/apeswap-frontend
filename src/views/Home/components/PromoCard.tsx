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
      <a
        href="https://ape-swap.medium.com/the-zoo-is-growing-beefy-apeswap-c721a962b19c"
        target="_blank"
        rel="noreferrer"
      >
        <CardBody>
          <Heading size="lg" mb="24px">
            🍌 {TranslateString(999, 'The Zoo is Growing: ApeSwap + Beefy')} 🐄
          </Heading>
          <>
            <Text color="textSubtle">We are bringing banana vaults to support auto compound in farms</Text>
            <Text color="textSubtle">
              <StyledLink
                href="https://ape-swap.medium.com/the-zoo-is-growing-beefy-apeswap-c721a962b19c"
                target="_blank"
              >
                {' '}
                Check it out!
              </StyledLink>
            </Text>
          </>
        </CardBody>
      </a>
    </StyledPromoCard>
  )
}

export default PromoCard
