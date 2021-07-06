import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Flex, Text } from '@apeswapfinance/uikit'
import { PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import ApprovalAction from './ApprovalAction'
import StakeActions from './StakeActions'
import HarvestActions from './HarvestActions'

const InlineText = styled(Text)`
  display: inline;
`

interface CardActionsProps {
  pool: Pool
}

const CardActions: React.FC<CardActionsProps> = ({ pool }) => {
  const {
    sousId,
    harvest,
    poolCategory,
    userData,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    tokenDecimals,
  } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)
  const needsApproval = !allowance.gt(0) && !isBnbPool
  const isStaked = stakedBalance.gt(0)
  const isLoading = !userData

  return (
    <>
        {(harvest && !needsApproval) && (
          <HarvestActions
            earnings={earnings}
            sousId={sousId}
            isBnbPool={isBnbPool}
            isLoading={isLoading}
            tokenDecimals={tokenDecimals}
          />
        )}
        {needsApproval ? (
          <ApprovalAction stakingContractAddress={stakingTokenAddress[56]} sousId={sousId} isLoading={isLoading} />
        ) : (
          <StakeActions
            isLoading={isLoading}
            pool={pool}
            stakingTokenBalance={stakingTokenBalance}
            stakedBalance={stakedBalance}
            isBnbPool={isBnbPool}
            isStaked={isStaked}
          />
        )}
    </>
  )
}

export default CardActions
