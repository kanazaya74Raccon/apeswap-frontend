import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Heading } from '@apeswapfinance/uikit'
import Container from 'components/layout/Container'
import IfoTabButtons from './components/IfoTabButtons'
import CurrentIfo from './CurrentIfo'
import PastIfo from './PastIfo'

const Header = styled.div`
  display: flex;
  width: 100%;
  background-image: url(/images/banners/iao-bg.svg);
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 32px;
  overflow: hidden;

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
  position: absolute;
  z-index: 999;
  padding-top: 36px;
  padding-left: 10px;
  height: inherit;

  ${({ theme }) => theme.mediaQueries.md} {
    position: static;
  }
`
const StyledHeading = styled(Heading)`
  font-size: 32px;
  max-width: 176px !important;

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: inherit;
  max-width: 800px;
  overflow: hidden;
`

const apeFloat = keyframes`
  0% { transform: translate(0, 0px); }
  65%  { transform: translate(0, -20px); }
  100%   { transform: translate(0, -0px); }
`

const Ape = styled.img`
  width: 300px;
  margin-top: 250px;
  margin-left: 20%;
  animation: ${apeFloat} 10s ease-in-out infinite;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 450px;
    margin-top: 350px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 450px;
  }
`
const WindowDiv = styled.div`
  position: absolute;
  background-image: url(/images/banners/iao-window.svg);
  background-size: cover;
  background-repeat: no-repeat;
  height: inherit;
  background-position: inherit;
  width: 100%;
`

const bananaFloat = keyframes`
  0% { transform: translate(0px, 0px); }
  65%  { transform: translate(20px, 0px); }
  100%   { transform: translate(-0px, 0px); }
`

const Banana = styled.img`
  width: 100px;
  height: auto;
  position: absolute;
  top: 10px;
  right: 0;
  animation: ${bananaFloat} 10s linear infinite;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 100px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 150px;
    top: 0;
    margin-right: 60px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 180px;
  }
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
      </Container>
    </>
  )
}

export default Ifos
