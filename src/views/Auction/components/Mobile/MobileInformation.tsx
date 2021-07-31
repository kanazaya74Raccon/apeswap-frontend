import React from 'react'
import styled from 'styled-components'
import { Text, ArrowDropDownIcon, ArrowDropUpIcon } from '@apeswapfinance/uikit'

interface MobileInformationProps {
  expanded: boolean
  onClick?: () => void
}

const DropDownWrapper = styled.div`
  position: absolute;
  width: 150px;
  height: 38px;
  top: 570px;
  left: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MoreInformation = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  letter-spacing: 0.05em;
  padding-right: 10px;
`

const MobileInformation: React.FC<MobileInformationProps> = ({ onClick, expanded }) => {
  return (
    <>
      <DropDownWrapper onClick={() => onClick()}>
        <MoreInformation>Information</MoreInformation>
        {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </DropDownWrapper>
    </>
  )
}

export default MobileInformation
