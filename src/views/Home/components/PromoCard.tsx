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
        href="https://ape-swap.medium.com/apeswap-design-contest-500-banana-prize-273da4126f5b"
        target="_blank"
        rel="noreferrer"
      >
        <CardBody>
          <Heading size="xl" mb="24px">
            🍌 {TranslateString(999, 'Calling all ape designers!')} 🍌
          </Heading>
          <>
            <Text color="textSubtle">We are running a design contest to enhance ApeSwaps overall look and feel!</Text>
            <Text color="textSubtle">
              Over 1000 <StyledImage src="/images/tokens/BANANA.svg" width={16} height={16} alt="BANANA" /> $BANANA in
              prizes
              <StyledLink
                href="https://ape-swap.medium.com/apeswap-design-contest-500-banana-prize-273da4126f5b"
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
