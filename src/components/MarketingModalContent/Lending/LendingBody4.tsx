import React from 'react'
import { LendingM4Icon } from '@apeswapfinance/uikit'
import ModalContent from '../MarketingModalContent'
import { StyledText } from '../styles'

const LendingBody4: React.FC = () => {
  return (
    <ModalContent Icon={<LendingM4Icon width={240} height={120} />}>
      <div>
        <StyledText>
          Be sure to always keep an eye on your liquidation limit! <br />
          If the amount borrowed exceeds 75% of the amount supplied, your position will be liquidated. <br />
          Consider keeping a margin to account for volatility.
        </StyledText>
      </div>
    </ModalContent>
  )
}

export default LendingBody4
