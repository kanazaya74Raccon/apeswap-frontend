import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledText, MiniHeaderText, MainHeaderText, RightContent, StyledPoolsM4Icon } from '../styles'

const PoolsBody4: React.FC = () => {
  return (
    <ModalContent Icon={<StyledPoolsM4Icon />}>
      <RightContent>
        <MiniHeaderText>Step 4</MiniHeaderText>
        <MainHeaderText>Collect</MainHeaderText>
        <StyledText>
          Don&apos;t forget to Harvest your earnings periodically. You can reinvest them or cash out at any time!
        </StyledText>
      </RightContent>
    </ModalContent>
  )
}

export default PoolsBody4
