import React from 'react'
import styled from 'styled-components'
import { Button, useWalletModal } from '@apeswapfinance/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const UnlockButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  const { large } = props

  return large ? (
    <LargeButton onClick={onPresentConnectModal}>{t('UNLOCK WALLET')}</LargeButton>
  ) : (
    <Button onClick={onPresentConnectModal} {...props}>
      {t('UNLOCK WALLET')}
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
