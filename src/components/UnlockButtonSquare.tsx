import React from 'react'
import { ButtonSquare, useWalletModal } from '@apeswapfinance/uikit'
import useAuth from 'hooks/useAuth'
import useI18n from 'hooks/useI18n'

const UnlockButtonSquare = (props) => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <ButtonSquare onClick={onPresentConnectModal} variant="primary" {...props}>
      {TranslateString(292, 'UNLOCK WALLET')}
    </ButtonSquare>
  )
}

export default UnlockButtonSquare
