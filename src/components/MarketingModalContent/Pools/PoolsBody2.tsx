import React from 'react'
import { PoolsM2Icon } from '@apeswapfinance/uikit'
import ModalContent from '../MarketingModalContent'
import { StyledText, MiniHeaderText, MainHeaderText, MiniButton } from '../styles'

const PoolsBody2: React.FC = () => {
  const openExchange = () => {
    return window.open('https://apeswap.finance/add', '_blank')
  }

  const openGnana = () => {
    return window.open('https://apeswap.finance/gnana', '_blank')
  }

  return (
    <ModalContent Icon={<PoolsM2Icon width={240} height={120} />}>
      <div>
        <MiniHeaderText>Step 2</MiniHeaderText>
        <MainHeaderText>Get BANANA</MainHeaderText>
        <StyledText>
          If you don&apos;t own BANANA already, go to our <MiniButton onClick={openExchange}>Exchange</MiniButton> to
          acquire some! (or <MiniButton onClick={openGnana}>GNANA</MiniButton>)
        </StyledText>
      </div>
    </ModalContent>
  )
}

export default PoolsBody2
