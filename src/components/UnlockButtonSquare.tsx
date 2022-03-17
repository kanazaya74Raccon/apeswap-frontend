import React from 'react'
import { ButtonSquare, useWalletModal } from '@apeswapfinance/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const UnlockButtonSquare = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <ButtonSquare onClick={onPresentConnectModal} variant="primary" {...props}>
      {t('UNLOCK WALLET')}
    </ButtonSquare>
  )
}

export default UnlockButtonSquare
