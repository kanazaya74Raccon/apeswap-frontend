import React from 'react'
import { FarmsM4Icon } from '@apeswapfinance/uikit'
import ModalContent from '../MarketingModalContent'
import { StyledText, MiniHeaderText, MainHeaderText } from '../styles'

const FarmsBody4: React.FC = () => {
  return (
    <ModalContent Icon={<FarmsM4Icon width={240} height={120} />}>
      <div>
        <MiniHeaderText>Step 4</MiniHeaderText>
        <MainHeaderText>Collect</MainHeaderText>
        <StyledText>
          Don&apos;t forget to Harvest your earnings periodically. You can reinvest them or cash out at any time!
        </StyledText>
      </div>
    </ModalContent>
  )
}

export default FarmsBody4
