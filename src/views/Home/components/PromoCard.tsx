import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Image, Text } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

const StyledPromoCard = styled(Card)`
  text-align: center;
`
const StyledLink = styled.a`
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
          {TranslateString(999, '100 BNB Rewards coming soon!')}{' '}
          <StyledImage src="/images/tokens/BNB.svg" width={32} height={32} alt="BNB" />
        </Heading>
        <>
          <Text color="textSubtle">
            Stake <StyledImage src="/images/tokens/BANANA.svg" width={16} height={16} alt="BANANA" /> $BANANA and earn{' '}
            <StyledImage src="/images/tokens/BNB.svg" width={16} height={16} alt="BNB" /> BNB
            <StyledLink target="_blank" href="https://twitter.com/ape_swap/status/1362889420752494597">
              @ape_swap
            </StyledLink>
          </Text>
        </>
      </CardBody>
    </StyledPromoCard>
  )
}

export default PromoCard
