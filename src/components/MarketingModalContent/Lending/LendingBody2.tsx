import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledText, RightContent, StyledLendingM2Icon } from '../styles'

const LendingBody2: React.FC = () => {
  return (
    <ModalContent Icon={<StyledLendingM2Icon />}>
      <RightContent>
        <StyledText>
          Suppliers earn interest paid by borrowers. <br />
          When a supplied asset is enabled as collateral, suppliers can borrow from any of the available markets. <br />
          The borrow amount is limited to 70% of the value of supplied assets.
        </StyledText>
      </RightContent>
    </ModalContent>
  )
}

export default LendingBody2
