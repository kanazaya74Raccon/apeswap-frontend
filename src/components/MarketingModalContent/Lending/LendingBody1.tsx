import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledText, RightContent, StyledLendingM1Icon } from '../styles'

const LendingBody1: React.FC = () => {
  return (
    <ModalContent Icon={<StyledLendingM1Icon />}>
      <RightContent>
        <StyledText>
          Our network uses an &quot;overcollateral&quot; model. <br />
          Users can borrow any type of asset listed, as long as they supply some of their own assets as collateral
          first.
        </StyledText>
      </RightContent>
    </ModalContent>
  )
}

export default LendingBody1
