import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Heading } from '@apeswapfinance/uikit'
import Container from 'components/layout/Container'
import IfoTabButtons from './components/IfoTabButtons'
import CurrentIfo from './CurrentIfo'
import PastIfo from './PastIfo'
import HowItWorks from './components/HowItWorks'
import Ideology from './components/Ideology'

const apeFloat = keyframes`
  0% { transform: translate(0, 0px); }
  65%  { transform: translate(0, -20px); }
  100%   { transform: translate(0, -0px); }
`

const bananaFloat = keyframes`
  0% { transform: translate(0px, 0px); }
  65%  { transform: translate(20px, 0px); }
  100%   { transform: translate(-0px, 0px); }
`

const Header = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: url(/images/banners/iao-bg.svg);
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

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 44px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
  }
`

const RightDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  bottom: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 80%;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 60%;
  }
`

const Ape = styled.img`
  width: 300px;
  margin-top: 15em;
  margin-left: 80px;
  animation: ${apeFloat} 10s ease-in-out infinite;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 400px;
    margin-top: 20em;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 450px;
    margin-top: 22em;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 24em;
  }
`

const WindowDiv = styled.div`
  background-image: url(/images/banners/iao-window.svg);
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
`

const Banana = styled.img`
  width: 100px;
  height: auto;
  position: absolute;
  top: 10px;
  right: 0;
  animation: ${bananaFloat} 10s linear infinite;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 150px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 180px;
    margin-right: 5em;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 180px;
    margin-right: 5em;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 1em;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 2em;
  }
`

const Ifos = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <>
      <Header>
        <HeaderContainer>
          <StyledHeading as="h1" mb="8px" mt={0} color="white" fontFamily="Titan One">
            {TranslateString(999, 'Initial Ape Offerings')}
          </StyledHeading>
        </HeaderContainer>

        <RightDiv>
          <Ape src="/images/banners/iao-ape.svg" className="ape" />
          <WindowDiv className="window" />
          <Banana src="/images/banners/iao-banana.svg" className="banana" />
        </RightDiv>
      </Header>

      <Container>
        <IfoTabButtons />
        <Route exact path={`${path}`}>
          <CurrentIfo />
        </Route>
        <Route path={`${path}/history`}>
          <PastIfo />
        </Route>
        <HowItWorks />
        <Ideology />
      </Container>
    </>
  )
}

export default Ifos
