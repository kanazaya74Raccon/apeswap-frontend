import React from 'react'
import styled from 'styled-components'
import { Flex, Text } from '@apeswapfinance/uikit'
import Banner from 'components/Banner'
import { useFetchIazoSettings, useIazoSettings } from 'state/hooks'
import LuanchpadInfo from './components/LaunchpadInfo/LaunchpadInfo'
import CreateYourPresale from './components/CreateYourPresale/CreateYourPresale'
import TopNav from '../TopNav'

const PageWrapper = styled.div`
  display: none;
  display: flex;
  padding-bottom: 200px;
  margin-bottom: 100px;
  padding: 0px 10px;
  justify-content: center;
`

const LaunchPadWrapper = styled.div`
  border-radius: 20px;
  margin-top: 20px;
  background: ${({ theme }) => theme.colors.navbar};
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
      <PageWrapper>
        <Flex flexDirection="column">
          <Banner
            banner="ssiao"
            link="https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/self-serve-iao-ss-iao"
            title="Self-Serve Iao"
            maxWidth={856}
            listViewBreak
            margin="30px 0 0 0"
          />
          <LaunchPadWrapper>
            <TopNav />
            <HeaderWrapper>
              <StyledHeader>Create</StyledHeader>
            </HeaderWrapper>
            <LuanchpadInfo />
            <CreateYourPresale settings={settings} />
          </LaunchPadWrapper>
        </Flex>
      </PageWrapper>
    </>
  )
}
