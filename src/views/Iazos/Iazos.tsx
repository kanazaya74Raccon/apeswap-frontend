import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useFetchIazos, useIazos } from 'state/hooks'
import useCurrentTime from 'hooks/useTimer'
import TextInput from 'components/TextInput'
import useTheme from 'hooks/useTheme'
import { Text, Spinner, useMatchBreakpoints } from '@apeswapfinance/uikit'
import IconButton from './components/IconButton'
import IazoCard from './components/IazoCard/IazoCard'
import Header from './components/Header'

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
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 60px;
    margin-top: 40px;
  }
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
  width: 320px;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  z-index: 0;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 856px;
  }
`

const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-size: 30px;
  font-style: normal;
  line-height: 52px;
  text-align: center;
  width: 100%;
  font-weight: 700;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 45px;
  }
`

const StyledButton = styled.button`
  width: 195px;
  height: 46px;
  color: #ffffff;
  background-color: #ffb300;
  border-radius: 10px;
  font-size: 18px;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  font-family: Poppins;
  font-weight: 700;
`
const PresaleText = styled(Text)`
  font-family: Poppins;
  font-size: 20px;
  line-height: 30px;
`

const SpinnerHolder = styled.div`
  margin-top: 90px;
  margin-left: 50px;
`

const Iazos: React.FC = () => {
  useFetchIazos()
  const { iazos, isInitialized } = useIazos()
  const { isDark } = useTheme()
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs
  const registeredIazos = iazos?.filter((iazo) => iazo.isRegistered)
  const currentTime = useCurrentTime() / 1000
  const [sort, setSort] = useState(null)
  const [searchQuery, setSearchQuery] = useState(null)
  const currentIazos = registeredIazos?.filter(
    (iazo) =>
      parseInt(iazo.timeInfo.startTime) < currentTime &&
      currentTime < parseInt(iazo.timeInfo.startTime) + parseInt(iazo.timeInfo.activeTime) &&
      iazo.iazoState !== 'HARD_CAP_MET' &&
      iazo.iazoState !== 'FAILED',
  )
  const upcomingIazos = registeredIazos?.filter((iazo) => parseInt(iazo.timeInfo.startTime) > currentTime)
  const pastIAzos = registeredIazos?.filter(
    (iazo) =>
      currentTime > parseInt(iazo.timeInfo.startTime) + parseInt(iazo.timeInfo.activeTime) ||
      iazo.iazoState === 'HARD_CAP_MET' ||
      iazo.iazoState === 'FAILED',
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const renderIazos = () => {
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      const filteredIazos = registeredIazos?.filter(
        (iazo) =>
          iazo.iazoToken.name.toLowerCase().includes(lowercaseQuery) || iazo.iazoToken.address.includes(searchQuery),
      )
      return filteredIazos
    }
    switch (sort) {
      case 'upcoming':
        return upcomingIazos
      case 'live':
        return currentIazos
      case 'done':
        return pastIAzos
      default:
        return [...currentIazos, ...upcomingIazos]
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
            <Link to="/ss-iao/create">
              <StyledButton> CREATE </StyledButton>
            </Link>
          </HeaderWrapper>
          <SettingsWrapper>
            <IconButton
              icon="calendar"
              text="Upcoming"
              active={sort === 'upcoming'}
              onClick={() => setSort('upcoming')}
            />
            <IconButton icon="graph" text="Live" active={sort === 'live'} onClick={() => setSort('live')} />
            <IconButton icon="check" text="Done" active={sort === 'done'} onClick={() => setSort('done')} />
            <TextInput
              placeholderText="Search token name or address...."
              backgroundColor={isDark ? '#333333' : 'rgba(240, 240, 240, 1)'}
              onChange={handleChangeQuery}
              size={isMobile ? 'sm' : 'md'}
              margin={isMobile ? '30px 0px 0px 0px;' : ''}
            />
          </SettingsWrapper>
          <IlosWrapper>
            <PresaleText>{(isInitialized || iazos) && `${renderIazos()?.length} Presales`}</PresaleText>
            {isInitialized || iazos ? (
              renderIazos()?.map((iazo) => {
                return (
                  <Link to={`/ss-iao/${iazo.iazoContractAddress}`} key={iazo.iazoContractAddress}>
                    <IazoCard iazo={iazo} key={iazo.iazoContractAddress} />
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
