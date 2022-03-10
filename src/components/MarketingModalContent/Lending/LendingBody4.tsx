import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledText, RightContent, StyledLendingM4Icon } from '../styles'

const LendingBody4: React.FC = () => {
  return (
    <ModalContent Icon={<StyledLendingM4Icon />}>
      <RightContent>
        <StyledText>
          Be sure to always keep an eye on your liquidation limit! <br />
          If the amount borrowed exceeds 75% of the amount supplied, your position will be liquidated. <br />
          Consider keeping a margin to account for volatility.
        </StyledText>
      </RightContent>
    </ModalContent>
  )
}

export default LendingBody4
