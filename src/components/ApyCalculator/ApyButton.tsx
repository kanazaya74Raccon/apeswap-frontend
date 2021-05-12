import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { CalculateIcon, IconButton, useModal } from '@apeswapfinance/uikit'
import ApyCalculatorModal from './ApyCalculatorModal'

export interface ApyButtonProps {
  lpLabel?: string
  rewardTokenName?: string
  rewardTokenPrice?: BigNumber
  apy?: BigNumber
  addLiquidityUrl?: string
}

const StyledCalculateIcon = styled(CalculateIcon)`
  width: 12px;
  height: 12px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 14px;
    height: 14px;
  }
`

const StyledIconButton = styled(IconButton)`
  display: flex;
  justify-content: flex-start;
`

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
    <StyledIconButton onClick={onPresentApyModal} variant="text" size="sm" ml="4px" mr="4px">
      <StyledCalculateIcon color="yellow" />
    </StyledIconButton>
  )
}

export default ApyButton
