import React from 'react'
import { ButtonSquare, useWalletModal } from '@apeswapfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <ButtonSquare onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'UNLOCK WALLET')}
    </ButtonSquare>
  )
}

export default UnlockButton
