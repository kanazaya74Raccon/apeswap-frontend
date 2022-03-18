import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledText, MiniHeaderText, MainHeaderText, MiniButton, RightContent, StyledFarmsM2Icon } from '../styles'

const FarmsBody2: React.FC = () => {
  const openLiquidityLink = () => {
    return window.open('https://apeswap.finance/add', '_blank')
  }

  return (
    <ModalContent Icon={<StyledFarmsM2Icon />}>
      <RightContent>
        <MiniHeaderText>Step 2</MiniHeaderText>
        <MainHeaderText>Add Liquidity</MainHeaderText>
        <StyledText>
          Go to Trade &gt; <MiniButton onClick={openLiquidityLink}>Liquidity</MiniButton> and obtain the LP(s) you want
          to Stake.
        </StyledText>
      </RightContent>
    </ModalContent>
  )
}

export default FarmsBody2
