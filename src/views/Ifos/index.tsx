import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Heading } from '@apeswapfinance/uikit'
import Container from 'components/layout/Container'
import IfoTabButtons from './components/IfoTabButtons'
// import Hero from './components/Hero'
import CurrentIfo from './CurrentIfo'
import PastIfo from './PastIfo'

const Header = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/banners/iao-bg.svg)' : 'url(/images/banners/stats.svg)'};
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 32px;

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

const CircleWindow = styled.img`
  position: absolute;
  display: none;
`

const Banana = styled.img`
  margin-top: -10px;
  margin-right: 140px;
  width: 200px;
  bottom: 0;
  top: 0;
  position: absolute;
  z-index: 1;
  right: 0;
`

const Ape = styled.img`
  position: absolute;
  margin-top: 60px;
  margin-right: 75px;
  right: 0;
  top: 0;
  width: 550px;
`

const Ifos = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1" mb="8px" mt={0} color="white">
            {TranslateString(999, 'Initial Ape Offerings')}
          </StyledHeading>
        </HeadingContainer>
        <CircleWindow src="/images/banners/iao-window.svg" className="window" />
        <Banana src="/images/banners/iao-banana.svg" className="banana" />
        <Ape src="/images/banners/iao-ape.svg" className="ape" />
      </Header>

      {/* <Hero /> */}
      <Container>
        <IfoTabButtons />
        <Route exact path={`${path}`}>
          <CurrentIfo />
        </Route>
        <Route path={`${path}/history`}>
          <PastIfo />
        </Route>
      </Container>
    </>
  )
}

export default Ifos
