import React from 'react'
import BigNumber from 'bignumber.js'
import { CalculateIcon, IconButton, useModal } from '@apeswapfinance/uikit'
import ApyCalculatorModal from './ApyCalculatorModal'

export interface ApyButtonProps {
  lpLabel?: string
  rewardTokenName?: string
  rewardTokenPrice?: BigNumber
  apy?: BigNumber
  addLiquidityUrl?: string
}

const ApyButton: React.FC<ApyButtonProps> = ({ lpLabel, rewardTokenPrice, apy, addLiquidityUrl, rewardTokenName }) => {
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      lpLabel={lpLabel}
      rewardTokenName={rewardTokenName}
      rewardTokenPrice={rewardTokenPrice}
      apy={apy}
      addLiquidityUrl={addLiquidityUrl}
    />,
  )

  return (
    <IconButton onClick={onPresentApyModal} variant="text" size="sm" ml="4px" mr="4px">
      <CalculateIcon />
    </IconButton>
  )
}

export default ApyButton
