import React from 'react'
import { LendingM2Icon } from '@apeswapfinance/uikit'
import ModalContent from '../MarketingModalContent'
import { StyledText } from '../styles'

const LendingBody2: React.FC = () => {
  return (
    <ModalContent Icon={<LendingM2Icon width={240} height={120} />}>
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
