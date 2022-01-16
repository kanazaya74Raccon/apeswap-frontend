import React, { useState } from 'react'
import { Card, Heading, Text, WarningIcon, CardBody, Button } from '@apeswapfinance/uikit'
import styled from 'styled-components'

import { TranslateString } from 'utils/translateTextHelpers'
import Page from 'components/layout/Page'
import GnanaUtility from './components/GnanaUtility/GnanaUtility'
import GnanaDisclaimers from './components/GnanaDisclaimers/GnanaDisclaimers'
import ConvertCard from './components/ConvertCard'
import ReturnCard from './components/ReturnCard'

interface ContentProps {
  readingMore: boolean
}

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
  }
`
const Header = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/banners/gnana-mobile-dark.svg)' : 'url(/images/banners/gnana-mobile-light.svg)'};
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 30px;

  ${({ theme }) => theme.mediaQueries.sm} {
    background-image: ${({ theme }) =>
      theme.isDark ? 'url(/images/banners/gnana-dark-968.svg)' : 'url(/images/banners/gnana-light-968.svg)'};
    height: 300px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    background-image: ${({ theme }) =>
      theme.isDark ? 'url(/images/banners/gnana-dark-bg.svg)' : 'url(/images/banners/gnana-light-bg.svg)'};
  }
`
const HeaderContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  z-index: 999;

  ${({ theme }) => theme.mediaQueries.sm} {
    position: relative;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    width: 90%;
    position: relative;
  }
`
const StyledHeading = styled(Heading)`
  font-size: 42px;
  font-weight: 400;
  max-width: 240px !important;
  text-transform: uppercase;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 60px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
  }
`
const PaddedCard = styled(Card)`
  display: flex;
  align-items: center;
  background: ${({ theme }) => (theme.isDark ? 'rgba(255, 179, 0, 0.15)' : 'rgba(255, 179, 0, 0.7)')};
  padding: 10px;
  border-radius: 20px;
`
const WarningHeader = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? theme.colors.yellow : theme.colors.white)};
  font-size: 30px;
  font-weight: 700;
`
const Warning = styled(WarningIcon)`
  fill: #fff;
  width: 52px;
`
const ReadMore = styled(Button)`
  background: none;
  padding: 0;
  margin: 0;
  text-decoration-line: underline;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0;
  box-shadow: unset;
  height: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`
const CenterCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const Content = styled(CardBody)<ContentProps>`
  padding: 10px 10px;
  display: ${({ readingMore }) => (readingMore ? 'unset' : 'none')};

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
    display: unset;
  }
`
const ContentText = styled(Text)`
  letter-spacing: 5%;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
  }
`

const Zone = () => {
  const [readingMore, setReadingMore] = useState(false)

  const toggleReadMore = () => {
    setReadingMore(!readingMore)
  }

  return (
    <>
      <Header>
        <HeaderContainer>
          <StyledHeading as="h1" mt={0} color="white" fontFamily="Titan One">
            {TranslateString(999, 'Golden')}
          </StyledHeading>
          <StyledHeading as="h1" mb="8px" mt={1} color="white" fontFamily="Titan One">
            {TranslateString(999, 'Banana')}
          </StyledHeading>
        </HeaderContainer>
      </Header>

      <Page>
        <PaddedCard>
          <Warning />
          <CenterCard>
            <WarningHeader>WARNING</WarningHeader>
            {!readingMore && <ReadMore onClick={toggleReadMore}>Read More</ReadMore>}

            <Content readingMore={readingMore}>
              <ContentText>
                Buying GNANA involves paying a 28% burn fee and a 2% reflect fee for a total cost of 30%. This means
                that for every 1 BANANA you trade in, you will receive 0.7 GNANA
              </ContentText>
            </Content>
          </CenterCard>
          <Warning />
        </PaddedCard>

        <Cards id="convert">
          <ConvertCard fromToken="BANANA" toToken="GNANA" />
          <ReturnCard fromToken="GNANA" toToken="BANANA" />
        </Cards>
        <GnanaUtility />
        <GnanaDisclaimers />
      </Page>
    </>
  )
}
export default React.memo(Zone)
