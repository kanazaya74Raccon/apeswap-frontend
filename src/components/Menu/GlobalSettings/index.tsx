import React from 'react'
import { CogIcon, useModal, Button } from '@apeswapfinance/uikit'
import SettingsModal from './SettingsModal'

const GlobalSettings = () => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Button onClick={onPresentSettingsModal} style={{ fontSize: '25px', padding: 8, height: 44 }}>
      <CogIcon width="28px" color="white" />
    </Button>
  )
}

export default GlobalSettings
