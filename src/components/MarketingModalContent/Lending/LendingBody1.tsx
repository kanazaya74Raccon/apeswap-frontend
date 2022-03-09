import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledImage, StyledText } from '../styles'

const LendingBody1: React.FC = () => {
  return (
    <ModalContent Icon={<StyledImage src="/images/lending-m1.svg" alt="night-monkey" />}>
      <div>
        <StyledText>
          Our network uses an &quot;overcollateral&quot; model. <br />
          Users can borrow any type of asset listed, as long as they supply some of their own assets as collateral
          first.
        </StyledText>
      </div>
    </ModalContent>
  )
}

export default LendingBody1
