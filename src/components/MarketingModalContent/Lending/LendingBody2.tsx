import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledImage, StyledText } from '../styles'

const LendingBody2: React.FC = () => {
  return (
    <ModalContent Icon={<StyledImage src="/images/lending-m2.svg" alt="night-monkey" />}>
      <div>
        <StyledText>
          Suppliers earn interest paid by borrowers. <br />
          When a supplied asset is enabled as collateral, suppliers can borrow from any of the available markets. <br />
          The borrow amount is limited to 70% of the value of supplied assets.
        </StyledText>
      </div>
    </ModalContent>
  )
}

export default LendingBody2
