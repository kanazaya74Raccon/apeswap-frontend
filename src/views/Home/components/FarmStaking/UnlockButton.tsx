import React from 'react'
import { useWalletModal } from '@apeswapfinance/uikit'
import UnlockButtonSquare from 'components/UnlockButtonSquare'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const UnlockButton = (props) => {
  const { t } = useTranslation()

  const { login, logout } = useAuth()

  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <UnlockButtonSquare onClick={onPresentConnectModal} {...props}>
      {t('UNLOCK WALLET')}
    </UnlockButtonSquare>
  )
}

export default UnlockButton
