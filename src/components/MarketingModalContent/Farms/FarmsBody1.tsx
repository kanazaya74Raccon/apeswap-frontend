import React from 'react'
import { useWalletModal } from '@apeswapfinance/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import ModalContent from '../MarketingModalContent'
import { StyledText, MiniHeaderText, MainHeaderText, MiniButton, RightContent, StyledFarmsM1Icon } from '../styles'

const FarmsBody1: React.FC = () => {
  const { login, logout } = useAuth()
  const { t } = useTranslation()

  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  const openConnectModal = () => {
    onPresentConnectModal()
  }

  return (
    <ModalContent Icon={<StyledFarmsM1Icon />}>
      <RightContent>
        <MiniHeaderText>{t('Step 1')}</MiniHeaderText>
        <MainHeaderText>{t('Connect Your Wallet')}</MainHeaderText>
        <StyledText>
          <MiniButton onClick={openConnectModal}>{t('Click here')} </MiniButton>{' '}
          {t('to connect your wallet to ApeSwap.')}
        </StyledText>
      </RightContent>
    </ModalContent>
  )
}

export default FarmsBody1
