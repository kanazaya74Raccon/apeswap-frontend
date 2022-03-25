import React from 'react'
import { Button, useWalletModal } from '@apeswapfinance/uikit'
import useAuth from 'hooks/useAuth'
import useI18n from 'hooks/useI18n'

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button onClick={onPresentConnectModal} variant="primary" {...props}>
      {TranslateString(292, 'UNLOCK WALLET')}
    </Button>
  )
}

export default UnlockButton
