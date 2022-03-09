import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledImage, StyledText, MiniHeaderText, MainHeaderText, MiniButton } from '../styles'

const FarmsBody2: React.FC = () => {
  const openLiquidityLink = () => {
    return window.open('https://apeswap.finance/add', '_blank')
  }

  return (
    <ModalContent Icon={<StyledImage src="/images/farms-m2.svg" alt="night-monkey" />}>
      <div>
        <MiniHeaderText>Step 2</MiniHeaderText>
        <MainHeaderText>Add Liquidity</MainHeaderText>
        <StyledText>
          Go to Trade &gt; <MiniButton onClick={openLiquidityLink}>Liquidity</MiniButton> and obtain the LP(s) you want
          to Stake.
        </StyledText>
      </div>
    </ModalContent>
  )
}

export default FarmsBody2
