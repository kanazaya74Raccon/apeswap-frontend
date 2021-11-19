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
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  background-image: url(/images/banners/iao-bg.svg);
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
  position: relative;
  padding-left: 10px;
  z-index: 999;
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

const RightDiv = styled.div`
  width: 100%;
  height: 100%;
  max-width: 800px;
  position: absolute;
  top: 0;
  right: 0;
  /* background-color: red; */

  ${({ theme }) => theme.mediaQueries.md} {
    right: 0px;
    width: 700px;
    margin: 0px auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 800px;
  }
`

const apeFloat = keyframes`
  0% { transform: translate(0, 0px); }
  65%  { transform: translate(0, -20px); }
  100%   { transform: translate(0, -0px); }
`

const Ape = styled.img`
  /* background-color: yellow; */
  width: 300px;
  margin-top: 100px;
  position: absolute;
  right: -30px;
  animation: ${apeFloat} 10s ease-in-out infinite;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 400px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 500px;
  }
`

const WindowImage = styled.div`
  /* background-color: green; */
  background-image: url(/images/banners/iao-window.svg);
  background-size: cover;
  background-repeat: no-repeat;
  height: inherit;
  background-position: inherit;
  width: 100%;
  position: absolute;
  top: 0;
`

const bananaFloat = keyframes`
  0% { transform: translate(0px, 0px); }
  65%  { transform: translate(20px, 0px); }
  100%   { transform: translate(-0px, 0px); }
`

const Banana = styled.img`
  /* background-color: blue; */
  width: 100px;
  height: auto;
  position: absolute;
  top: 10px;
  right: 0;
  -webkit-animation: ${bananaFloat} 10s linear infinite;
  animation: ${bananaFloat} 10s linear infinite;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 150px;
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
          <WindowImage className="window" />
          <Banana src="/images/banners/iao-banana.svg" className="banana" />
          {/* <Ape src="/images/banners/iao-ape.svg" /> */}
          {/* <WinImg /> */}
          {/* <Banana src="/images/banners/iao-banana.svg" /> */}
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
