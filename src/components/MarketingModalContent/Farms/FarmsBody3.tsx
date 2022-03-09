import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledImage, StyledText, MiniHeaderText, MainHeaderText, MiniButton } from '../styles'

const FarmsBody3: React.FC = () => {
  const openFarmsLink = () => {
    return window.open('https://apeswap.finance/farms', '_blank')
  }

  return (
    <ModalContent Icon={<StyledImage src="/images/farms-m3.svg" alt="night-monkey" />}>
      <div>
        <MiniHeaderText>Step 3</MiniHeaderText>
        <MainHeaderText>Stake</MainHeaderText>
        <StyledText>
          Head over to <MiniButton onClick={openFarmsLink}>Farms</MiniButton>, Enable your favorites and start Staking.
        </StyledText>
      </div>
    </ModalContent>
  )
}

export default FarmsBody3
