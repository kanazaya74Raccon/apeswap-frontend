import React from 'react'
import { ButtonSquare, useWalletModal } from '@apeswapfinance/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const UnlockButton = (props) => {
  const { t } = useTranslation()

  const { login, logout } = useAuth()

  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <ButtonSquare onClick={onPresentConnectModal} {...props}>
      {t('UNLOCK WALLET')}
    </ButtonSquare>
  )
}

export default UnlockButton
