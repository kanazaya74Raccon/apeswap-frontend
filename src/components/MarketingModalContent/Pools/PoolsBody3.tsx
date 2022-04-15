import React from 'react'
import ModalContent from '../MarketingModalContent'
import { StyledText, MiniHeaderText, MainHeaderText, MiniButton, RightContent, StyledPoolsM3Icon } from '../styles'

const PoolsBody3: React.FC = () => {
  const openPools = () => {
    return window.open('https://apeswap.finance/pools', '_blank')
  }

  return (
    <ModalContent Icon={<StyledPoolsM3Icon />}>
      <RightContent>
        <MiniHeaderText>Step 3</MiniHeaderText>
        <MainHeaderText>Stake</MainHeaderText>
        <StyledText>
          Head over to <MiniButton onClick={openPools}>Pools</MiniButton>, Enable your favorites and start Staking.
        </StyledText>
      </RightContent>
    </ModalContent>
  )
}

export default PoolsBody3
