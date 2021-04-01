import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Image, Text, Flex } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { NavLink } from 'react-router-dom'

const StyledPromoCard = styled(Card)`
  text-align: center;
  width: 427px;
  height: 260px;
  margin-bottom: 64px;
  overflow: visible;
  margin-top: 30px;
`

const StyledHeading = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? 'white' : '#af6e5aff')};
`

const StyledFlex = styled(Flex)`
  text-align: center;
`

const StyledText = styled(Text)`
  font-family: Poppins;
  color: ${({ theme }) => (theme.isDark ? 'white' : '#af6e5aff')};
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
            style={{ width: 400, height: '100%', marginTop: '-60px' }}
          />
        </CardBody>
      </StyledPromoCard>
      <StyledHeading as="h1" size="lg" mb="6px" color="secondary">
        {TranslateString(576, 'Welcome all Apes!')}
      </StyledHeading>
      <StyledText>
        {TranslateString(578, 'Why be a human, when you')}
        <br />
        {TranslateString(578, 'can be an ape?')}
      </StyledText>
    </StyledFlex>
  )
}

export default WelcomeCard
