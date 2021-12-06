import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { useFetchIazoSettings, useIazoSettings } from 'state/hooks'
import LuanchpadInfo from './components/LaunchpadInfo/LaunchpadInfo'
import CreateYourPresale from './components/CreateYourPresale/CreateYourPresale'
import Header from '../Header'
import TopNav from '../TopNav'

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

export default function CreateIazo(): JSX.Element {
  useFetchIazoSettings()
  const settings = useIazoSettings()
  return (
    <>
      <Header />
      <PageWrapper>
        <LaunchPadWrapper>
          <TopNav />
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
