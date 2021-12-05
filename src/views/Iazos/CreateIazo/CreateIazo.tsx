import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text } from '@apeswapfinance/uikit'
import { useFetchIazoSettings, useIazoSettings } from 'state/hooks'
import LuanchpadInfo from './components/LaunchpadInfo/LaunchpadInfo'
import CreateYourPresale from './components/CreateYourPresale/CreateYourPresale'
import Header from '../components/Header'

const PageWrapper = styled.div`
  display: none;
  display: flex;
  padding-bottom: 200px;
  margin-bottom: 100px;
  justify-content: center;
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

const StyledText = styled(Text)`
  font-family: Poppins;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

export default function CreateIazo(): JSX.Element {
  useFetchIazoSettings()
  const settings = useIazoSettings()
  return (
    <>
      <Header />
      <PageWrapper>
        <LaunchPadWrapper>
          <TopNavWrapper>
            <TopNavMonkey />
            <Link to="/ss-iao">
              <BackWrapper>
                <BackArrow src="/images/left-arrow.svg" />
                <StyledText color="white">Back to SS-IAO Launchpad</StyledText>
              </BackWrapper>
            </Link>
          </TopNavWrapper>
          <HeaderWrapper>
            <StyledHeader>Create</StyledHeader>
          </HeaderWrapper>
          <LuanchpadInfo />
          <CreateYourPresale settings={settings} />
        </LaunchPadWrapper>
      </PageWrapper>
    </>
  )
}
