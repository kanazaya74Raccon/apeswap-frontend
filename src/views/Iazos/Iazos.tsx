import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import IconButton from './components/IconButton'
import TextInput from './components/TextInput'
import IazoCard from './components/IazoCard/IazoCard'

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
  background-image: url(/images/auction-banner.svg);
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
  padding-left: 20px;
  padding-right: 20px;
  margin-top: -50px;
  background: #222222;
  display: flex;
  flex-direction: column;
  z-index: 1;
`
const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  margin-top: 60px;
  align-items: center;
  justify-content: center;
`

const SettingsWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  margin-top: 35px;
  align-items: center;
  justify-content: center;
`

const IlosWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 360px;
  margin-top: 35px;
  align-items: center;
  justify-content: center;
`

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  margin-bottom: 30px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`

const StyledHeader = styled(Text)`
  font-family: Titan One;
  font-size: 45px;
  font-style: normal;
  line-height: 52px;
  padding-right: 35px;
  color: #ffffff;
`

const StyledButton = styled.button<{ width?: string }>`
    width: ${(props) => props.width || '141px'}
    height: 46px;
    color: #ffffff;
    background-color: #ffb300;
    border-radius: 10px;
    font-family: Titan One;
    font-size: 15px;
`
const PresaleText = styled(Text)`
  font-family: Poppins;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
`
const Iazos: React.FC = () => {
  return (
    <>
      <Header />
      <PageWrapper>
        <LaunchPadWrapper>
          <HeaderWrapper>
            <StyledHeader>Ape Launchpad</StyledHeader>
            <Link to="/iazos/create">
              <StyledButton> CREATE IAZO</StyledButton>
            </Link>
          </HeaderWrapper>
          <SettingsWrapper>
            <IconButton icon="calander" text="Upcoming" />
            <IconButton icon="graph" text="Live" />
            <IconButton icon="graph" text="Done" />
            <TextInput />
          </SettingsWrapper>
          <IlosWrapper>
            <PresaleText>2 Presales</PresaleText>
            <IazoCard />
            <IazoCard />
          </IlosWrapper>
          <FooterWrapper>
            <Link to="/iazos/create">
              <StyledButton width="195px">CREATE IAZO</StyledButton>
            </Link>
          </FooterWrapper>
        </LaunchPadWrapper>
      </PageWrapper>
    </>
  )
}

export default Iazos
