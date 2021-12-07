import React, { useState } from 'react'
import styled from 'styled-components'
import { Iazo } from 'state/types'
import InfoTab from './InfoTab'
import About from './About'

interface SaleInfoProps {
  iazo: Iazo
}

const SaleInfoWrapper = styled.div`
  display: flex;
  height: 60px;
  width: 300px;
  margin-top: 25px;
  background: ${(props) => (props.theme.isDark ? ' rgba(51, 51, 51, 1)' : 'rgba(240, 240, 240, 1)')};
  border-radius: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

const Tab = styled.div<{ active: boolean; borderRadius?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  font-family: Poppins;
  height: 60px;
  font-size: 20px;
  color: white;
  cursor: pointer;
  border-bottom: ${(props) => props.active && '2.5px solid rgba(255, 179, 0, 1)'};
  background-color: ${(props) => (props.theme.isDark ? 'rgba(65, 65, 65, 1)' : 'rgba(161, 101, 82, 1)')};
  border-radius: ${(props) => props.borderRadius};
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 24px;
  }
`

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
