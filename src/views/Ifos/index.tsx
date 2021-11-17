import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
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
    theme.isDark ? 'url(/images/banners/iao-bg.svg)' : 'url(/images/banners/iao-bg.svg)'};
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

const WinCon = styled.div`
  top: 0;
  position: absolute;
  width: 800px;
  right: 0;
  margin: 0px auto;
`

const WinImg = styled.img`
  height: 300px;
  max-width: 955px;
`

const bananaFloat = keyframes`
  0% { transform: translate(0px, 0px); }
  65%  { transform: translate(20px, 0px); }
  100%   { transform: translate(-0px, 0px); }
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
  animation: ${bananaFloat} 10s linear infinite;
`

const apeFloat = keyframes`
  0% { transform: translate(0, 0px); }
  65%  { transform: translate(0, -20px); }
  100%   { transform: translate(0, -0px); }
`

const Ape = styled.img`
  position: absolute;
  margin-top: 60px;
  margin-right: 75px;
  right: 0;
  top: 0;
  width: 550px;
  animation: ${apeFloat} 10s ease-in-out infinite;
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

        <WinCon className="win-con">
          <WinImg src="/images/banners/iao-window.svg" alt="window1" />
        </WinCon>

        {/* <WinCon className="window-con">
          <WinImg className="window" />
        </WinCon> */}

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
