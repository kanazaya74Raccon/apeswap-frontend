import React from 'react'
import BigNumber from 'bignumber.js'
import { CalculateIcon, IconButton, useModal } from '@apeswapfinance/uikit'
import ApyCalculatorModal from './ApyCalculatorModal'

export interface ApyButtonProps {
  lpLabel?: string
  bananaPrice?: BigNumber
  apy?: BigNumber
  addLiquidityUrl?: string
}

const ApyButton: React.FC<ApyButtonProps> = ({ lpLabel, bananaPrice, apy, addLiquidityUrl }) => {
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal lpLabel={lpLabel} bananaPrice={bananaPrice} apy={apy} addLiquidityUrl={addLiquidityUrl} />,
  )

  return (
    <IconButton onClick={onPresentApyModal} variant="text" size="sm" ml="4px">
      <CalculateIcon />
    </IconButton>
  )
}

export default ApyButton
