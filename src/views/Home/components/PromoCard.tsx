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
        href="https://ape-swap.medium.com/increasing-rewards-for-core-banana-farms-ec2c9a451561"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardBody>
          <Heading size="lg" mb="24px">
            🐵 Non Fungible Ape Sales Going Live! 🐵
          </Heading>
          <>
            <Text color="textSubtle">
              The second batch of 100 NFAs will be sold on Lootex starting on April 17th 16:00 UTC
            </Text>
            <Text color="textSubtle">
              <StyledLink
                href="https://dex.lootex.io/stores/non-fungible-apes"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check it out here! 🚀
              </StyledLink>
            </Text>
          </>
        </CardBody>
      </a>
    </StyledPromoCard>
  )
}

export default PromoCard
