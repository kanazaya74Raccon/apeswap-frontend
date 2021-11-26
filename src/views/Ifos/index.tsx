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
    width: 80%;
    margin: 0px auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    /* width: 800px; */
  }

  /* do for screen size 768px */
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
    right: 20px;
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
  animation: ${bananaFloat} 10s linear infinite;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 150px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 180px;
  }
`

const Hd = styled.div`
  display: flex;
  width: 100%;
  background-image: url(/images/banners/iao-bg.svg);
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 32px;
`
const Hc = styled.div`
  position: absolute;
  z-index: 999;
  padding-top: 36px;
  padding-left: 10px;
  height: inherit;
`
const Sh = styled(Heading)`
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
const Rd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: inherit;
  max-width: 800px;
  overflow-y: hidden;
`
const Ap = styled.img`
  width: 300px;
  margin-top: 80%;
  margin-left: 20%;
  animation: ${apeFloat} 10s ease-in-out infinite;
`
const WiDiv = styled.div`
  background-color: red;
  position: absolute;
  background-image: url(/images/banners/iao-window.svg);
  background-size: cover;
  background-repeat: no-repeat;
  height: inherit;
  background-position: inherit;
  width: 100%;
`
// const Wi = styled.img`
//   width: 100%;
//   height: auto;
// `

const Ifos = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <>
      {/* <Header>
        <HeadingContainer>
          <StyledHeading as="h1" mb="8px" mt={0} color="white">
            {TranslateString(999, 'Initial Ape Offerings')}
          </StyledHeading>
        </HeadingContainer>

        <RightDiv>
          <WindowImage className="window">
            <Ape src="/images/banners/iao-ape.svg" className="ape" />
          </WindowImage>
          <Banana src="/images/banners/iao-banana.svg" className="banana" />
        </RightDiv>
      </Header> */}

      <Hd>
        <Hc>
          <Sh as="h1" mb="8px" mt={0} color="white">
            {TranslateString(999, 'Initial Ape Offerings')}
          </Sh>
        </Hc>

        <Rd>
          <Ap src="/images/banners/iao-ape.svg" className="ape" />
          <WiDiv className="window">{/* <Wi src="/images/banners/iao-window.svg" className="ape" /> */}</WiDiv>
          <Banana src="/images/banners/iao-banana.svg" className="banana" />
        </Rd>
      </Hd>

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
