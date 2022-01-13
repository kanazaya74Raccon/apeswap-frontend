import React, { useState } from 'react'
import { BaseLayout, Card, Heading, Text, WarningIcon, CardBody, Button } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { TranslateString } from 'utils/translateTextHelpers'

import Page from 'components/layout/Page'
import Divider from './components/Divider'
import Iao from './components/IAO/CurrentIao'
import GnanaUtility from './components/GnanaUtility/GnanaUtility'
import GnanaDisclaimers from './components/GnanaDisclaimers/GnanaDisclaimers'
import ConvertCard from './components/ConvertCard'
import ReturnCard from './components/ReturnCard'

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
const Header = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/banners/gnana-dark-bg.svg)' : 'url(/images/banners/gnana-light-bg.svg)'};
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 30px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 300px;
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
  font-size: 36px;
  max-width: 240px !important;
  text-transform: uppercase;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 44px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
  }
`
const WindowDiv = styled.div`
  background-image: url(/images/banners/gnana-light-banana.svg);
`
const PaddedCard = styled(Card)`
  display: flex;
  align-items: center;
  flex-direction: column;
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
`
const TopCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const Content = styled(CardBody)`
  padding: 10px 20px;
`
const ContentText = styled(Text)`
  letter-spacing: 5%;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
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
          <StyledHeading as="h1" mb="8px" mt={0} color="white" fontFamily="Titan One">
            {TranslateString(999, 'Golden Banana ?')}
          </StyledHeading>
          <StyledHeading as="h1" mb="8px" mt={0} color="white" fontFamily="Titan One">
            {TranslateString(999, '?')}
          </StyledHeading>
        </HeaderContainer>

        <WindowDiv className="window" />
      </Header>

      <Page>
        <PaddedCard>
          <TopCard>
            <Warning />
            <WarningHeader>WARNING</WarningHeader>
            <Warning />
          </TopCard>
          {!readingMore && <ReadMore onClick={toggleReadMore}>Read More</ReadMore>}
          {readingMore && (
            <Content>
              <ContentText>
                Buying GNANA involves paying a 28% burn fee and a 2% reflect fee for a total cost of 30%. This means
                that for every 1 BANANA you trade in, you will receive 0.7 GNANA
              </ContentText>
            </Content>
          )}
        </PaddedCard>

        <Cards>
          <ConvertCard fromToken="BANANA" toToken="GNANA" />
          <ReturnCard fromToken="GNANA" toToken="BANANA" />
        </Cards>
        <GnanaUtility />
        <GnanaDisclaimers />
      </Page>

      <Iao />
      <Divider />
    </>
  )
}
export default React.memo(Zone)
