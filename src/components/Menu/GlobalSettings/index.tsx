import React from 'react'
import { Flex, IconButton, CogIcon, useModal, ButtonSquare } from '@apeswapfinance/uikit'
import SettingsModal from './SettingsModal'

type Props = {
  color?: string
  mr?: string
}

const GlobalSettings = ({ color, mr = '8px' }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <ButtonSquare onClick={onPresentSettingsModal} style={{ fontSize: '25px', padding: 8 }}>
      <CogIcon width="28px" color="white" />
    </ButtonSquare>
  )
}

export default GlobalSettings
