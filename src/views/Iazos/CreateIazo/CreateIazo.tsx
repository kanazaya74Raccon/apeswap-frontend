import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import LuanchpadInfo from './components/LaunchpadInfo/LaunchpadInfo'
import CreateYourPresale from './components/CreateYourPresale/CreateYourPresale'

const PageWrapper = styled.div`
  display: none;
  display: flex;
  padding-bottom: 200px;
  margin-bottom: 100px;
  justify-content: center;
`

const Header = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  height: 251px;
  width: 100%;
  padding-top: 36px;
  background-image: ${(props) =>
    props.theme.isDark ? 'url(/images/iazo-banner-dark.svg)' : 'url(/images/iazo-banner-light.svg)'};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 300px;
  }
`

const LaunchPadWrapper = styled.div`
  border-radius: 20px;
  margin-top: 50px;
  background: ${(props) => (props.theme.isDark ? '#222222' : 'white')};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`

const TopNavWrapper = styled.div`
  position: relative;
  height: 60px;
  width: 320px;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  background: ${(props) => (props.theme.isDark ? '#333333' : 'rgba(161, 101, 82, 1)')};
  z-index: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 856px;
  }
`

const TopNavMonkey = styled.div`
  position: absolute;
  height: 60px;
  width: 100px;
  right: 20px;
  overflow: hidden;
  background: url(/images/header-ape.svg) no-repeat 0px 10px;
  opacity: 0.2;
  z-index: 0;
`

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`

const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 45px;
  font-style: normal;
  line-height: 52px;
`

const BackWrapper = styled.div`
  z-index: 1;
  display: flex;
`

const BackArrow = styled.img`
  cursor: pointer;
  margin-right: 20px;
`

export default function CreateIazo(): JSX.Element {
  return (
    <>
      <Header />
      <PageWrapper>
        <LaunchPadWrapper>
          <TopNavWrapper>
            <TopNavMonkey />
            <Link to="/iazos">
              <BackWrapper>
                <BackArrow src="/images/left-arrow.svg" />
                <Text color="white" fontFamily="poppins">
                  Back to Ape Launchpad
                </Text>
              </BackWrapper>
            </Link>
          </TopNavWrapper>
          <HeaderWrapper>
            <StyledHeader>Create</StyledHeader>
          </HeaderWrapper>
          <LuanchpadInfo />
          <CreateYourPresale />
        </LaunchPadWrapper>
      </PageWrapper>
    </>
  )
}
