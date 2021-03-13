import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@apeswapfinance/uikit'
import Container from 'components/layout/Container'
import useI18n from 'hooks/useI18n'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: #ffffff;
  margin-bottom: 24px;
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 300;
`

const StyledHero = styled.div`
  background-image: linear-gradient(180deg, #009859 0%, #1fc7d4 100%);
  padding-bottom: 40px;
  padding-top: 40px;
  margin-bottom: 32px;
`
const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <Container>
        <Title>{TranslateString(500, 'IAO: Initial Ape Offerings')}</Title>
        <Blurb>{TranslateString(502, 'Buy new tokens by staking APE-LP.')}</Blurb>
      </Container>
    </StyledHero>
  )
}

export default Hero
