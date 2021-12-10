import React, { useState } from 'react'
import { Iazo } from 'state/types'
import InfoTab from './InfoTab'
import About from './About'
import { SaleInfoWrapper, Tab } from './styles'

interface SaleInfoProps {
  iazo: Iazo
}

const SaleInfo: React.FC<SaleInfoProps> = ({ iazo }) => {
  const { socialInfo } = iazo
  const [currentTabIndex, setCurrentTabIndex] = useState(0)
  const renderTabComponent = () => {
    if (currentTabIndex === 0) {
      return <InfoTab iazo={iazo} />
    }
    return <About description={socialInfo.description} />
  }
  return (
    <>
      <SaleInfoWrapper>
        <Tab onClick={() => setCurrentTabIndex(0)} active={currentTabIndex === 0} borderRadius="10px 0px 0px 0px">
          Info
        </Tab>
        <Tab onClick={() => setCurrentTabIndex(1)} active={currentTabIndex === 1} borderRadius="0px 10px 0px 0px">
          About
        </Tab>
      </SaleInfoWrapper>
      {renderTabComponent()}
    </>
  )
}

export default SaleInfo
