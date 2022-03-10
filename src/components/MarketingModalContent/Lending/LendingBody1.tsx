import React from 'react'
import { LendingM1Icon } from '@apeswapfinance/uikit'
import ModalContent from '../MarketingModalContent'
import { StyledText } from '../styles'

const LendingBody1: React.FC = () => {
  return (
    <ModalContent Icon={<LendingM1Icon width={240} height={120} />}>
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
