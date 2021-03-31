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

const StyledFlex = styled(Flex)`
  text-align: center;
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
      <Heading as="h1" size="lg" mb="24px" color="secondary">
        {TranslateString(576, 'Welcome all Apes!')}
      </Heading>
      <Text>{TranslateString(578, 'Why be a human, when you can be an ape?')}</Text>
    </StyledFlex>
  )
}

export default WelcomeCard
