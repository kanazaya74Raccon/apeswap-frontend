import React from 'react'
import BigNumber from 'bignumber.js'
import { Flex } from '@apeswapfinance/uikit'
import { DualFarm, Farm } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import StakeAction from './StakeAction'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
  liquidity?: BigNumber
  addLiquidityUrl?: string
}

interface FarmCardActionsProps {
  farm: DualFarm
  account?: string
  addLiquidityUrl?: string
  totalValueFormated?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, addLiquidityUrl }) => {
  const lpLabel = `${farm?.stakeTokens?.token0?.symbol}-${farm?.stakeTokens?.token1?.symbol}`
  const lpName = lpLabel.toUpperCase()
  const userData = farm?.userData
  const stakedBalance = userData?.stakedBalance
  const tokenBalance = userData?.tokenBalance
  const isApproved = account && userData?.allowance && new BigNumber(userData?.allowance).isGreaterThan(0)
  const rawStakedBalance = getBalanceNumber(farm?.userData?.stakedBalance)
  const totalStakedValue = farm?.stakeTokenPrice * rawStakedBalance

  const renderApprovalOrStakeButton = () => {
    return (
      <StakeAction
        stakedBalance={stakedBalance}
        stakedBalanceUsd={totalStakedValue}
        tokenBalance={tokenBalance}
        tokenName={lpName}
        pid={farm?.pid}
        addLiquidityUrl={addLiquidityUrl}
        isApproved={isApproved}
        lpSymbol={lpLabel}
      />
    )
  }

  return <Flex>{account && renderApprovalOrStakeButton()}</Flex>
}

export default CardActions
