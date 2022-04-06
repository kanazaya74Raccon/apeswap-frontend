import React from 'react'
import { CogIcon, useModal, Button, useMatchBreakpoints } from '@apeswapfinance/uikit'
import SettingsModal from './SettingsModal'

const GlobalSettings = () => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs

  return (
    <Button
      onClick={onPresentSettingsModal}
      size={isMobile ? 'sm' : 'md'}
      style={{ fontSize: '25px', padding: 8, height: isMobile ? '36px ' : '40px' }}
    >
      <CogIcon width="28px" color="white" />
    </Button>
  )
}

export default GlobalSettings
