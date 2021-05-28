import React from 'react'
import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import { Flex } from '@apeswapfinance/uikit'
import { Farm } from 'state/types'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import StakeAction from './StakeAction'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
  liquidity?: BigNumber
  addLiquidityUrl?: string
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  ethereum?: provider
  account?: string
  addLiquidityUrl?: string
  totalValueFormated?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, ethereum, account, addLiquidityUrl }) => {
  const { pid } = useFarmFromSymbol(farm.lpSymbol)
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)
  const lpName = farm.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const renderApprovalOrStakeButton = () => {
    return (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={lpName}
        pid={pid}
        addLiquidityUrl={addLiquidityUrl}
        isApproved={isApproved}
        lpSymbol={farm.lpSymbol}
        ethereum={ethereum}
      />
    )
  }

  return <Flex>{account && renderApprovalOrStakeButton()}</Flex>
}

export default CardActions
