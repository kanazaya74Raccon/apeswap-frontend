import React from 'react'
import styled from 'styled-components'
import { Text, ArrowDropDownIcon, ArrowDropUpIcon } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'

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
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.05em;
  padding-right: 10px;
`

const MobileInformation: React.FC<MobileInformationProps> = ({ onClick, expanded }) => {
  const { t } = useTranslation()
  return (
    <>
      <DropDownWrapper onClick={() => onClick()}>
        <MoreInformation>{t('Information')}</MoreInformation>
        {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </DropDownWrapper>
    </>
  )
}

export default MobileInformation
