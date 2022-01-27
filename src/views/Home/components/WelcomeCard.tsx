import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text, Flex, Button } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useNetworkChainId } from 'state/hooks'
import { CHAIN_ID } from 'config/constants/chains'

const WalcomeWrapper = styled.div`
  height: 436px;
  width: 100%;
  margin-bottom: 57px;
  @media screen and (max-width: 350px) {
    width: 300px;
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 336px;
    margin-bottom: 20px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0px;
  }
`

const StyledWelcomeCard = styled(Card)`
  text-align: center;
  height: 207px;
  width: 360px;
  overflow: visible;
  @media screen and (max-width: 350px) {
    width: 300px;
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-bottom: 64px;
    width: 336px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    width: 360px;
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
  margin-left: 10px;
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
  font-size: 16px;
  font-style: normal;
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
  const chainId = useNetworkChainId()
  return (
    <WalcomeWrapper>
      <StyledFlex flexDirection="column" alignItems="center">
        <StyledWelcomeCard>
          <CardBody>
            {(chainId === CHAIN_ID.BSC || chainId === CHAIN_ID.BSC_TESTNET) && (
              <StyledImg src="/images/ape-home.svg" alt="banana frenzy" />
            )}
            {(chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) && (
              <StyledImg src="/images/ape-home-polygon.svg" alt="banana frenzy" />
            )}
          </CardBody>
        </StyledWelcomeCard>
        <Heading as="h1" size="lg" mb="6px" color="contrast" fontWeight={800}>
          {TranslateString(576, 'Welcome all Apes!')}
        </Heading>
        <StyledText color="textSubtle">{TranslateString(578, 'Why be a human, when you can be an ape?')}</StyledText>
        <a href="https://apeswap.gitbook.io/apeswap-finance" target="_blank" rel="noopener noreferrer">
          <StyledButton id="Beginner Ape" fullWidth>
            BEGINNER APE? START HERE
          </StyledButton>
        </a>
      </StyledFlex>
    </WalcomeWrapper>
  )
}

export default WelcomeCard
