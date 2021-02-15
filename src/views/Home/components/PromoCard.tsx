import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

const StyledPromoCard = styled(Card)`
  text-align: center;
`
const StyledLink = styled.a`
  font-weight: 500;
  color: #FFB300;
`

const PromoCard = () => {
  const TranslateString = useI18n()
  return (
    <StyledPromoCard>
      <CardBody>
        <Heading size="xl" mb="24px">
        🍌 {TranslateString(999, '$BANANA meme sharing fiesta!')} 🍌
        </Heading>
          <>
            <Text color="textSubtle">Tweet <StyledLink target="_blank" href="https://twitter.com/ape_swap/status/1361077873860366341">@ape_swap</StyledLink> and mention $BANANA for a chance to win up to 50 BANANA!</Text>
          </>
      </CardBody>
    </StyledPromoCard>
  )
}

export default PromoCard
