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
        href="https://treasureland.market/#/nft-market/apeswap?sellingType=0&priceType=0&title=0&sortValue=1&page=1&project=21"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardBody>
          <Heading size="lg" mb="24px">
            🐵 Non Fungible Ape Sales Going Live! 🐵
          </Heading>
          <>
            <Text color="textSubtle">
              The first batch of 100 NFAs will be sold on Treasureland starting on April 8th 23:00 UTC
            </Text>
            <Text color="textSubtle">
              <StyledLink
                href="https://treasureland.market/#/nft-market/apeswap?sellingType=0&priceType=0&title=0&sortValue=1&page=1&project=21"
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
