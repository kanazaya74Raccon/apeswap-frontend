/** @jsxImportSource theme-ui */
import React from 'react'
import { useWalletModal } from '@apeswapfinance/uikit'
import { Button } from '@ape.swap/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import styles from './styles'

const ConnectButton = () => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <Button onClick={onPresentConnectModal} csx={styles.button}>
      {t('CONNECT WALLET')}
    </Button>
  )
}

export default ConnectButton
