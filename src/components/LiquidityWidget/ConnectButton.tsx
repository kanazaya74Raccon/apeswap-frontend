import React from 'react'
import { useWalletModal } from '@apeswapfinance/uikit'
import { Button } from '@ape.swap/uikit'
import useAuth from 'hooks/useAuth'
import useI18n from 'hooks/useI18n'
import styles from './styles'

const ConnectButton = () => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button onClick={onPresentConnectModal} csx={styles.button}>
      {TranslateString(292, 'CONNECT WALLET')}
    </Button>
  )
}

export default ConnectButton
