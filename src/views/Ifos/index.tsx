import React from 'react'
import Banner from 'components/Banner'
import { useTranslation } from 'contexts/Localization'
import Container from 'components/layout/Container'
import ifos, { pastIfos } from 'config/constants/ifo'
import IfoTabButtons from './components/IfoTabButtons'
import HowItWorks from './components/HowItWorks/HowItWorks'
import Ideology from './components/Ideology/Ideology'
import IfoPastProjectSwiper from './components/PastProjectSwiper/IfoPastProjectSwiper'
import { TabOption } from './types'
import IfoProjectCard from './components/IfoCard/ProjectCard/IfoProjectCard'

const Ifos = () => {
  const { t } = useTranslation()
  const firstPastIfoId = pastIfos.length > 0 ? pastIfos(t)[0].id : undefined
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
      <Container>
        <Banner
          banner="iao"
          link="https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/initial-ape-offerings-iaos"
          title={t('Official Initial Ape Offerings')}
          maxWidth={992}
          margin="30px 0px 20px 0px"
        />
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
