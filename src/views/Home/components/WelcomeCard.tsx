import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text, Flex } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

const StyledWelcomeCard = styled(Card)`
  text-align: center;
  height: 170px;
  width: 100%;
  margin-bottom: 38px;
  overflow: visible;
  margin-top: 30px;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-bottom: 64px;
  }
`

const StyledFlex = styled(Flex)`
  text-align: center;
`

const StyledText = styled(Text)`
  font-weight: 400;
`

const StyledImg = styled.img`
  margin-top: -60px;
  width: 300px;
  height: 100%;
  max-height: 220px;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: -75px;
    max-height: 240px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: -75px;
    max-height: 250px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: -85px;
    max-height: 260px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-top: -85px;
    max-height: 260px;
  }
`

const WelcomeCard = () => {
  const TranslateString = useI18n()
  return (
    <StyledFlex flexDirection="column" alignItems="center">
      <StyledWelcomeCard>
        <CardBody>
          <StyledImg src="/images/ape-banana-frenzy-summer.svg" alt="banana frenzy" />
        </CardBody>
      </StyledWelcomeCard>
      <Heading as="h1" size="lg" mb="6px" color="contrast">
        {TranslateString(576, 'Welcome all Apes!')}
      </Heading>
      <StyledText color="textSubtle" fontFamily="poppins">
        {TranslateString(578, 'Why be a human, when you can be an ape?')}
      </StyledText>
    </StyledFlex>
  )
}

export default WelcomeCard
