import React from 'react'
import { CogIcon, useModal, Button } from '@apeswapfinance/uikit'
import SettingsModal from './SettingsModal'
import useIsMobile from '../../../hooks/useIsMobile'

const GlobalSettings = () => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)
  const isMobile = useIsMobile()

  return (
    <Button
      onClick={onPresentSettingsModal}
      size={isMobile ? 'sm' : 'md'}
      style={{ fontSize: '25px', padding: 8, height: isMobile ? '36px' : '40px' }}
    >
      <CogIcon width="28px" color="white" />
    </Button>
  )
}

export default GlobalSettings
