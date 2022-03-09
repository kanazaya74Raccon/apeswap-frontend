import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledImage, StyledText, MiniHeaderText, MainHeaderText } from '../styles'

const FarmsBody4: React.FC = () => {
  return (
    <ModalContent Icon={<StyledImage src="/images/farms-m4.svg" alt="night-monkey" />}>
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
