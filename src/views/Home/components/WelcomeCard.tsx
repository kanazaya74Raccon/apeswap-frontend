import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text, Flex } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

const StyledPromoCard = styled(Card)`
  text-align: center;
  width: 427px;
  height: 200px;
  margin-bottom: 64px;
  overflow: visible;
  margin-top: 30px;
`

const StyledFlex = styled(Flex)`
  text-align: center;
`

const StyledText = styled(Text)`
  font-weight: 400;
`

const WelcomeCard = () => {
  const TranslateString = useI18n()
  return (
    <StyledFlex flexDirection="column" alignItems="center">
      <StyledPromoCard>
        <CardBody>
          <img
            src="/images/ape-banana-frenzy.svg"
            alt="banana frenzy"
            style={{ width: 300, height: '100%', marginTop: '-60px' }}
          />
        </CardBody>
      </StyledPromoCard>
      <Heading as="h1" size="lg" mb="6px" color="secondary">
        {TranslateString(576, 'Welcome all Apes!')}
      </Heading>
      <StyledText fontFamily="poppins">
        {TranslateString(578, 'Why be a human, when you')}
        <br />
        {TranslateString(578, 'can be an ape?')}
      </StyledText>
    </StyledFlex>
  )
}

export default WelcomeCard
