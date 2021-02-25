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
        href="https://ape-swap.medium.com/bakeryswap-apeswap-farms-nfts-and-more-caac52e58e84"
        target="_blank"
        rel="noreferrer"
      >
        <CardBody>
          <Heading size="xl" mb="24px">
            🍌 {TranslateString(999, 'ApeSwap and Bake join forces!')} 🍩
          </Heading>
          <>
            <Text color="textSubtle">We are bringing mutual pools, farming and a meme NFT competition!</Text>
            <Text color="textSubtle">
              Over $10,000 in prizes
              <StyledLink
                href="https://ape-swap.medium.com/bakeryswap-apeswap-farms-nfts-and-more-caac52e58e84"
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
