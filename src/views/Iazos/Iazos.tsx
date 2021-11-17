import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useFetchIazos, useIazos } from 'state/hooks'
import useCurrentTime from 'hooks/useTimer'
import { Text, Spinner } from '@apeswapfinance/uikit'
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
  margin-top: -50px;
  background: ${(props) => (props.theme.isDark ? '#222222' : 'rgba(255, 255, 255, 1)')};
  display: flex;
  flex-direction: column;
  z-index: 1;
`
const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 60px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const SettingsWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
`

const IlosWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 360px;
  margin-top: 35px;
  margin-bottom: 35px;
  align-items: center;
  justify-content: center;
`

const TopNavWrapper = styled.div`
  position: relative;
  height: 0px;
  width: 856px;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  z-index: 0;
`

const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-size: 45px;
  font-style: normal;
  line-height: 52px;
  padding-right: 35px;
  font-weight: 700;
`

const StyledButton = styled.button`
  width: 195px;
  height: 46px;
  color: #ffffff;
  background-color: #ffb300;
  border-radius: 10px;
  font-size: 15px;
  margin-top: 20px;
  border: none;
  cursor: pointer;
`
const PresaleText = styled(Text)`
  font-family: Poppins;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
`

const SpinnerHolder = styled.div`
  margin-top: 90px;
  margin-left: 50px;
`

const Iazos: React.FC = () => {
  useFetchIazos()
  const { iazos, isInitialized } = useIazos()
  const currentTime = useCurrentTime() / 1000
  const [sort, setSort] = useState(null)
  const currentIazos = iazos?.iazos?.filter(
    (iazo) =>
      parseInt(iazo.timeInfo.startTime) < currentTime &&
      currentTime < parseInt(iazo.timeInfo.startTime) + parseInt(iazo.timeInfo.activeTime),
  )
  const upcomingIazos = iazos?.iazos?.filter((iazo) => parseInt(iazo.timeInfo.startTime) > currentTime)
  const pastIAzos = iazos?.iazos?.filter(
    (iazo) => currentTime > parseInt(iazo.timeInfo.startTime) + parseInt(iazo.timeInfo.activeTime),
  )

  const renderIazos = () => {
    switch (sort) {
      case 'upcoming':
        return upcomingIazos
      case 'live':
        return currentIazos
      case 'done':
        return pastIAzos
      default:
        return iazos?.iazos
    }
  }

  return (
    <>
      <Header />
      <PageWrapper>
        <LaunchPadWrapper>
          <TopNavWrapper />
          <HeaderWrapper>
            <StyledHeader>Self-Serve Launchpad</StyledHeader>
            <Link to="/iazos/create">
              <StyledButton> CREATE </StyledButton>
            </Link>
          </HeaderWrapper>
          <SettingsWrapper>
            <IconButton icon="calander" text="Upcoming" onClick={() => setSort('upcoming')} />
            <IconButton icon="graph" text="Live" onClick={() => setSort('live')} />
            <IconButton icon="graph" text="Done" onClick={() => setSort('done')} />
            <TextInput placeholderText="Search token name or address...." icon="magnifiglass.svg" />
          </SettingsWrapper>
          <IlosWrapper>
            <PresaleText>{(isInitialized || iazos) && `${renderIazos()?.length} Presales`}</PresaleText>
            {isInitialized || iazos ? (
              renderIazos()?.map((iazo) => {
                return (
                  <Link to={`/iazos/${iazo.iazoId}`} key={iazo.iazoId}>
                    <IazoCard iazo={iazo} key={iazo.iazoId} />
                  </Link>
                )
              })
            ) : (
              <SpinnerHolder>
                <Spinner />
              </SpinnerHolder>
            )}
          </IlosWrapper>
        </LaunchPadWrapper>
      </PageWrapper>
    </>
  )
}

export default Iazos
