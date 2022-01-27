import React from 'react'
import { CogIcon, useModal, ButtonSquare } from '@apeswapfinance/uikit'
import SettingsModal from './SettingsModal'

const GlobalSettings = () => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <ButtonSquare onClick={onPresentSettingsModal} style={{ fontSize: '25px', padding: 8 }}>
      <CogIcon width="28px" color="white" />
    </ButtonSquare>
  )
}

export default GlobalSettings
