import React from 'react'
import { PoolsM3Icon } from '@apeswapfinance/uikit'
import ModalContent from '../MarketingModalContent'
import { StyledText, MiniHeaderText, MainHeaderText, MiniButton } from '../styles'

const PoolsBody3: React.FC = () => {
  const openPools = () => {
    return window.open('https://apeswap.finance/pools', '_blank')
  }

  return (
    <ModalContent Icon={<PoolsM3Icon width={240} height={120} />}>
      <div>
        <MiniHeaderText>Step 3</MiniHeaderText>
        <MainHeaderText>Stake</MainHeaderText>
        <StyledText>
          Head over to <MiniButton onClick={openPools}>Pools</MiniButton>, Enable your favorites and start Staking.
        </StyledText>
      </div>
    </ModalContent>
  )
}

export default PoolsBody3
