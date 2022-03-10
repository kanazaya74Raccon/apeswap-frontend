import React from 'react'
import { FarmsM3Icon } from '@apeswapfinance/uikit'
import ModalContent from '../MarketingModalContent'
import { StyledText, MiniHeaderText, MainHeaderText, MiniButton } from '../styles'

const FarmsBody3: React.FC = () => {
  const openFarmsLink = () => {
    return window.open('https://apeswap.finance/farms', '_blank')
  }

  return (
    <ModalContent Icon={<FarmsM3Icon width={240} height={120} />}>
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
