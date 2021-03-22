import React from 'react'
import { Skeleton, Text } from '@apeswapfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import { useStats } from 'state/hooks'
import CardValue from './CardValue'

const BananaHarvestUsdBalance = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const yourStats = useStats()
  const amountToHarvest = yourStats?.stats?.pendingRewardUsd

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '60px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <>
    {amountToHarvest ? (
        <CardValue decimals={2} value={amountToHarvest} prefix="$"  />
      ) : (
        <>
          <Skeleton height={33} />
        </>
      )}
      
    </>
  )
}

export default BananaHarvestUsdBalance
