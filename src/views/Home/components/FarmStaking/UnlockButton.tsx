import React from 'react'
import { useWalletModal } from '@apeswapfinance/uikit'
import UnlockButtonSquare from 'components/UnlockButtonSquare'
import useAuth from 'hooks/useAuth'
import useI18n from 'hooks/useI18n'

const UnlockButton = (props) => {
  const TranslateString = useI18n()

  const { login, logout } = useAuth()

  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <UnlockButtonSquare onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'UNLOCK WALLET')}
    </UnlockButtonSquare>
  )
}

export default UnlockButton
