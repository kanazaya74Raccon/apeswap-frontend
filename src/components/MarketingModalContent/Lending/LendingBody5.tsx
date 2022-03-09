import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledImage, StyledText, MiddleHeaderText, MiddleText, MiddleButton } from '../styles'

const LendingBody5: React.FC = () => {
  const learnMore = () => {
    return window.open('https://lending.apeswap.finance/markets', '_blank')
  }

  return (
    <ModalContent Icon={<StyledImage src="/images/lending-m5.svg" alt="night-monkey" />}>
      <div>
        <StyledText>
          Users can pay back their borrowed assets and <br />
          withdraw their supplied assets at any time.
        </StyledText>
        <MiddleHeaderText>Happy Lending!</MiddleHeaderText>
        <MiddleText>
          You can learn more about Lending <MiddleButton onClick={learnMore}>here.</MiddleButton>
        </MiddleText>
      </div>
    </ModalContent>
  )
}

export default LendingBody5
