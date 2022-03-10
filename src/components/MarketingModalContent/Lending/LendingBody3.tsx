import React from 'react'
import { LendingM3Icon } from '@apeswapfinance/uikit'
import ModalContent from '../MarketingModalContent'
import { StyledText } from '../styles'

const LendingBody3: React.FC = () => {
  return (
    <ModalContent Icon={<LendingM3Icon width={240} height={120} />}>
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
