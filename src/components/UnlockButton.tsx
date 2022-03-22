import React from 'react'
import styled from 'styled-components'
import { Button, useWalletModal } from '@apeswapfinance/uikit'
import useAuth from 'hooks/useAuth'
import useI18n from 'hooks/useI18n'

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  const { large } = props

  return large ? (
    <LargeButton onClick={onPresentConnectModal}>{TranslateString(292, 'UNLOCK WALLET')}</LargeButton>
  ) : (
    <Button onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'UNLOCK WALLET')}
    </Button>
  )
}

const LargeButton = styled(Button)`
  font-weight: 700;
  font-size: 20px;
  width: 100%;
  height: 60px;
  border-radius: 20px;
  margin-top: 10px;
`

export default UnlockButton
