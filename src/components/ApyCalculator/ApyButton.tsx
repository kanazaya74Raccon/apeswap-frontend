import React from 'react'
import styled from 'styled-components'
import { CalculateIcon, useModal } from '@apeswapfinance/uikit'
import ApyCalculatorModal from './ApyCalculatorModal'

export interface ApyButtonProps {
  lpLabel?: string
  rewardTokenName?: string
  rewardTokenPrice?: number
  apy?: number
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
    <>
      <StyledCalculateIcon
        onClick={onPresentApyModal}
        color="yellow"
        ml="3px"
        mt=".8px"
        style={{ cursor: 'pointer' }}
      />
    </>
  )
}

export default ApyButton
