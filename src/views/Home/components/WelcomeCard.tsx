import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text, Flex, Button } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

const WalcomeWrapper = styled.div`
  height: 436px;
  width: 336px;
  margin-bottom: 57px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0px;
  }
`

const StyledWelcomeCard = styled(Card)`
  text-align: center;
  height: 207px;
  width: 336px;
  overflow: visible;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-bottom: 64px;
  }
`

const StyledFlex = styled(Flex)`
  text-align: center;
`

const StyledText = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text};
`

const StyledImg = styled.img`
  margin-top: -75px;
  width: 300px;
  margin-left: 5px;
  height: 100%;
  max-height: 220px;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: -55px;
    max-height: 240px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: -65px;
    max-height: 250px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: -75px;
    max-height: 285px;
  }
`

const StyledButton = styled(Button)`
  background: #ffb300;
  height: 44px;
  width: 290px;
  border: 0px;
  outline: none !important;
  box-shadow: none !important;
  border-radius: 10px;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 25px;
  focus: none;
  :focus {
    outline: none !important;
    box-shadow: none !important;
    background: #ffb300;
  }
`

const WelcomeCard = () => {
  const TranslateString = useI18n()
  return (
    <WalcomeWrapper>
      <StyledFlex flexDirection="column" alignItems="center">
        <StyledWelcomeCard>
          <CardBody>
            <StyledImg src="/images/ape-home.svg" alt="banana frenzy" />
          </CardBody>
        </StyledWelcomeCard>
        <Heading as="h1" size="lg" mb="6px" color="contrast">
          {TranslateString(576, 'Welcome all Apes!')}
        </Heading>
        <StyledText color="textSubtle" fontFamily="poppins">
          {TranslateString(578, 'Why be a human, when you can be an ape?')}
        </StyledText>
        <StyledButton id="Beginner Ape" fullWidth>
          BEGINNER APE? START HERE
        </StyledButton>
      </StyledFlex>
    </WalcomeWrapper>
  )
}

export default WelcomeCard
