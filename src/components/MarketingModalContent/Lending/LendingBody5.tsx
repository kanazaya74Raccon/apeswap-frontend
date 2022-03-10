import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledText, MiddleHeaderText, MiddleText, MiddleButton, RightContent, StyledLendingM5Icon } from '../styles'

const LendingBody5: React.FC = () => {
  const learnMore = () => {
    return window.open('https://lending.apeswap.finance/markets', '_blank')
  }

  return (
    <ModalContent Icon={<StyledLendingM5Icon />}>
      <RightContent>
        <StyledText>
          Users can pay back their borrowed assets and <br />
          withdraw their supplied assets at any time.
        </StyledText>
        <MiddleHeaderText>Happy Lending!</MiddleHeaderText>
        <MiddleText>
          You can learn more about Lending <MiddleButton onClick={learnMore}>here.</MiddleButton>
        </MiddleText>
      </RightContent>
    </ModalContent>
  )
}

export default LendingBody5
