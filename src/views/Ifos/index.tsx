import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Heading } from '@apeswapfinance/uikit'
import Container from 'components/layout/Container'
import ifos, { pastIfos } from 'config/constants/ifo'
import IfoTabButtons from './components/IfoTabButtons'
import HowItWorks from './components/HowItWorks/HowItWorks'
import Ideology from './components/Ideology/Ideology'
import IfoPastProjectSwiper from './components/PastProjectSwiper/IfoPastProjectSwiper'
import { TabOption } from './types'
import IfoProjectCard from './components/IfoCard/ProjectCard/IfoProjectCard'

const apeFloat = keyframes`
  0% { transform: translate(0, 0px); }
  65%  { transform: translate(0, -20px); }
  100%   { transform: translate(0, -0px); }
`

const bananaFloat = keyframes`
  0% { transform: translate(0px, 0px); }
  65%  { transform: translate(20px, 0px); }
  100%   { transform: translate(-0px, 0px); }
`

const Header = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: url(/images/banners/iao-bg.svg);
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 30px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 300px;
  }
`
const HeaderContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  z-index: 999;

  ${({ theme }) => theme.mediaQueries.sm} {
    position: relative;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    width: 90%;
    position: relative;
  }
`
const StyledHeading = styled(Heading)`
  font-size: 36px;
  max-width: 240px !important;
  margin-bottom: 8px;

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
  position: absolute;
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  bottom: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 80%;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 60%;
  }
`

const Ape = styled.img`
  width: 300px;
  margin-top: 15em;
  margin-left: 80px;
  animation: ${apeFloat} 10s ease-in-out infinite;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 400px;
    margin-top: 20em;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 450px;
    margin-top: 22em;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 24em;
  }
`

const WindowDiv = styled.div`
  background-image: url(/images/banners/iao-window.svg);
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
`

const Banana = styled.img`
  width: 100px;
  height: auto;
  position: absolute;
  top: 10px;
  right: 0;
  animation: ${bananaFloat} 10s linear infinite;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 150px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 180px;
    margin-right: 5em;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 180px;
    margin-right: 5em;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 1em;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 2em;
  }
`

const Ifos = () => {
  const { t } = useTranslation()
  const firstPastIfoId = pastIfos(t).length > 0 ? pastIfos(t)[0].id : undefined
  const activeIfoId = ifos(t).find((ifo) => ifo.isActive).id
  const [tabOption, setTabOption] = React.useState<TabOption>('current')
  const [projectId, setProjectId] = React.useState<string | undefined>(activeIfoId)

  const handleTabSelectionChange = (option: TabOption) => {
    setTabOption(option)
    if (option === 'past') setProjectId(firstPastIfoId)
    if (option === 'current') setProjectId(activeIfoId)
  }

  const openCurrentProject = () => {
    if (tabOption === 'past') {
      setTabOption('current')
      setProjectId(activeIfoId)
      return true
    }
    return false
  }

  return (
    <>
      <Header>
        <HeaderContainer>
          <StyledHeading as="h1" style={{ color: 'white' }}>
            {t('Initial Ape Offerings')}
          </StyledHeading>
        </HeaderContainer>

        <RightDiv>
          <Ape src="/images/banners/iao-ape.svg" className="ape" />
          <WindowDiv className="window" />
          <Banana src="/images/banners/iao-banana.svg" className="banana" />
        </RightDiv>
      </Header>

      <Container>
        <IfoProjectCard ifoId={projectId} />
        {tabOption === 'past' && <IfoPastProjectSwiper onSelectProject={setProjectId} />}
        <IfoTabButtons onSelect={handleTabSelectionChange} selectedTab={tabOption} />
        <HowItWorks onParticipate={openCurrentProject} />
        <Ideology />
      </Container>
    </>
  )
}

export default Ifos
