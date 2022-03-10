import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledText, MiniHeaderText, MainHeaderText, MiniButton, RightContent, StyledPoolsM2Icon } from '../styles'

const PoolsBody2: React.FC = () => {
  const openExchange = () => {
    return window.open('https://apeswap.finance/add', '_blank')
  }

  const openGnana = () => {
    return window.open('https://apeswap.finance/gnana', '_blank')
  }

  return (
    <ModalContent Icon={<StyledPoolsM2Icon />}>
      <RightContent>
        <MiniHeaderText>Step 2</MiniHeaderText>
        <MainHeaderText>Get BANANA</MainHeaderText>
        <StyledText>
          If you don&apos;t own BANANA already, go to our <MiniButton onClick={openExchange}>Exchange</MiniButton> to
          acquire some! (or <MiniButton onClick={openGnana}>GNANA</MiniButton>)
        </StyledText>
      </RightContent>
    </ModalContent>
  )
}

export default PoolsBody2
