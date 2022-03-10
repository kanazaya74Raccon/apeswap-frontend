import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledText, RightContent, StyledLendingM3Icon } from '../styles'

const LendingBody3: React.FC = () => {
  return (
    <ModalContent Icon={<StyledLendingM3Icon />}>
      <RightContent>
        <StyledText>
          Both suppliers and borrowers can earn BANANA rewards from the Rainmaker, depending on the market. <br />
          BANANA rewards are independent of interest earned/owed.
        </StyledText>
      </RightContent>
    </ModalContent>
  )
}

export default LendingBody3
