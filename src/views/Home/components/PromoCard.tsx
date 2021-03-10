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
        href="https://ape-swap.medium.com/apeswap-burn-plan-step-1-97d8095e68c3"
        target="_blank"
        rel="noreferrer"
      >
        <CardBody>
          <Heading size="lg" mb="24px">
            🔥  {TranslateString(999, 'Do you love burning bananas?')} 🔥
          </Heading>
          <>
            <Text color="textSubtle">DEX fee buy backs, gamified burning, compound vaults, and more!</Text>
            <Text color="textSubtle">
              <StyledLink
                href="https://ape-swap.medium.com/apeswap-burn-plan-step-1-97d8095e68c3"
                target="_blank"
              >
                {' '}
                Read all the details on the ApeSwap Medium!
              </StyledLink>
            </Text>
          </>
        </CardBody>
      </a>
    </StyledPromoCard>
  )
}

export default PromoCard
