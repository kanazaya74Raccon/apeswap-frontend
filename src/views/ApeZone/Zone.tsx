import React from 'react'
import { BaseLayout, Card, Heading, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { TranslateString } from 'utils/translateTextHelpers'

import Page from 'components/layout/Page'

import Divider from './components/Divider'
import BuyCard from './components/BuyCard'
import SellCard from './components/SellCard'
import Iao from './components/IAO/CurrentIao'
import Description from './components/Description/Description'
import GnanaUtility from './components/GnanaUtility/GnanaUtility'
import GnanaDisclaimers from './components/GnanaDisclaimers/GnanaDisclaimers'

const StyledHeroSection = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`

const MarginContainer = styled.div`
  margin: 53px 30px;
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin: 32px 0px;
  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`
const PaddedCard = styled(Card)`
  padding: 26px;
`

const Header = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/banners/stats-night.svg)' : 'url(/images/banners/stats.svg)'};
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 300px;
    padding-left: 24px;
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    height: 300px;
    padding-left: 10px;
    padding-right: 10px;
  }
`
const HeadingContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`
const StyledHeading = styled(Heading)`
  font-size: 32px;
  max-width: 176px !important;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 36px;
    max-width: 240px !important;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 44px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
  }
`

const Zone = () => {
  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1" mb="8px" mt={0} color="white" fontFamily="Titan One">
            {TranslateString(999, 'Gnana Banana ?')}
          </StyledHeading>
        </HeadingContainer>
      </Header>

      <Page>
        <PaddedCard>
          <Heading size="lg" fontFamily="poppins" color="warning">
            WARNING
          </Heading>
          <Text fontFamily="poppins">
            Buying GNANA involves paying a 28% burn fee and a 2% reflect fee for a total cost of 30%.
          </Text>
          <Text fontFamily="poppins">This means that for every 1 BANANA you trade in, you will receive 0.7 GNANA</Text>
        </PaddedCard>

        <Cards>
          <BuyCard />
          <SellCard />
        </Cards>
        <GnanaUtility />
        <GnanaDisclaimers />
        <Iao />
        <Divider />
      </Page>

      {/* 
      <StyledHeroSection>
        <MarginContainer>
      <Description />
          <Heading size="xl" mb="26px" color="primary" fontFamily="Titan One">
            {TranslateString(999, 'Buy Golden Banana')}
          </Heading>

        </MarginContainer>
      </StyledHeroSection> */}
    </>
  )
}
export default React.memo(Zone)
