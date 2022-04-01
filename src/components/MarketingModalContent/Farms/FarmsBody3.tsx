import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledText, MiniHeaderText, MainHeaderText, MiniButton, RightContent, StyledFarmsM3Icon } from '../styles'

const FarmsBody3: React.FC = () => {
  const openFarmsLink = () => {
    return window.open('https://apeswap.finance/farms', '_blank')
  }

  return (
    <ModalContent Icon={<StyledFarmsM3Icon />}>
      <RightContent>
        <MiniHeaderText>Step 3</MiniHeaderText>
        <MainHeaderText>Stake</MainHeaderText>
        <StyledText>
          Head over to <MiniButton onClick={openFarmsLink}>Farms</MiniButton>, Enable your favorites and start Staking.
        </StyledText>
      </RightContent>
    </ModalContent>
  )
}

export default FarmsBody3
