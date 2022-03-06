// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text } from '@apeswapfinance/uikit'

import Page from 'components/layout/Page'
import Container from 'components/layout/Container'
import { useTranslation } from 'contexts/Localization'
import HowItWorks from './components/HowItWorks'
import NftPreview from './components/NftPreview'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  padding-bottom: 32px;
  padding-top: 32px;
  margin-bottom: 24px;
`

const Cta = styled.div`
  align-items: center;
  display: flex;

  & > a + a {
    margin-left: 16px;
  }
`

const RegisterToWinPage = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <Container>
        <StyledHero>
          <Heading as="h1" size="xxl" color="secondary" mb="24px">
            NFTs
          </Heading>
          <Heading as="h2" size="lg" color="secondary" mb="16px">
            {t('Trade in for BANANA, or keep for your collection!')}
          </Heading>
          <Text mb="24px">{t('Register your interest in winning an NFT below.')}</Text>
          <Cta>
            <Button
              as="a"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfToBNlovtMvTZFSwOhk0TBiDPMGasLxqG0RB-kJN85HR_avA/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Register for a chance to win')}
            </Button>
            <Button as="a" href="#how-it-works" variant="secondary">
              {t('Learn more')}
            </Button>
          </Cta>
        </StyledHero>
      </Container>
      <NftPreview />
      <HowItWorks />
    </Page>
  )
}

export default RegisterToWinPage
