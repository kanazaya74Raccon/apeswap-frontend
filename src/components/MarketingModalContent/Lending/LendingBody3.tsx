import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledImage, StyledText } from '../styles'

const LendingBody3: React.FC = () => {
  return (
    <ModalContent Icon={<StyledImage src="/images/lending-m3.svg" alt="night-monkey" />}>
      <div>
        <StyledText>
          Both suppliers and borrowers can earn BANANA rewards from the Rainmaker, depending on the market. <br />
          BANANA rewards are independent of interest earned/owed.
        </StyledText>
      </div>
    </ModalContent>
  )
}

export default LendingBody3
