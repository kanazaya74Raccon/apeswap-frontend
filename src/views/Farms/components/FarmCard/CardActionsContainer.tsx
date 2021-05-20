import React, { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { Flex } from '@apeswapfinance/uikit'
import { Farm } from 'state/types'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import { useApprove } from 'hooks/useApprove'
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

const CardActions: React.FC<FarmCardActionsProps> = ({
  farm,
  ethereum,
  account,
  addLiquidityUrl,
  totalValueFormated,
}) => {
  const { pid, lpAddresses } = useFarmFromSymbol(farm.lpSymbol)
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)
  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const lpName = farm.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpAddress)
  }, [ethereum, lpAddress])

  const { onApprove } = useApprove(lpContract)

  const renderApprovalOrStakeButton = () => {
    return (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={lpName}
        pid={pid}
        addLiquidityUrl={addLiquidityUrl}
        totalValueFormated={totalValueFormated}
        isApproved={isApproved}
        lpSymbol={farm.lpSymbol}
        ethereum={ethereum}
      />
    )
  }

  return <Flex>{account && renderApprovalOrStakeButton()}</Flex>
}

export default CardActions
