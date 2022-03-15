import React from 'react'
import { useWalletModal } from '@apeswapfinance/uikit'
import useAuth from 'hooks/useAuth'
import ModalContent from '../MarketingModalContent'
import { StyledText, MiniHeaderText, MainHeaderText, MiniButton, RightContent, StyledPoolsM1Icon } from '../styles'

const PoolsBody1: React.FC = () => {
  const { login, logout } = useAuth()

  const { onPresentConnectModal } = useWalletModal(login, logout)

  const openConnectModal = () => {
    onPresentConnectModal()
  }

  return (
    <ModalContent Icon={<StyledPoolsM1Icon />}>
      <RightContent>
        <MiniHeaderText>Step 1</MiniHeaderText>
        <MainHeaderText>Connect Your Wallet</MainHeaderText>
        <StyledText>
          <MiniButton onClick={openConnectModal}>Click here </MiniButton> to connect your wallet to ApeSwap.
        </StyledText>
      </RightContent>
    </ModalContent>
  )
}

export default PoolsBody1
