import React from 'react'
import styled from 'styled-components'
import { Button, useWalletModal } from '@apeswapfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  const StyledButton = styled(Button)`
    width: 220px;
    height: 50px;
    background: #ffb300;
    border-radius: 10px;
    border: 0px;
  `

  return (
    <StyledButton onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')}
    </StyledButton>
  )
}

export default UnlockButton
