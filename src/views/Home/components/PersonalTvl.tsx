import React from 'react'
import { Skeleton, Text } from '@apeswapfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import { useStats } from 'state/hooks'
import CardValue from './CardValue'

const PersonalTvl = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const yourStats = useStats()
  const personalTvl = yourStats?.stats?.tvl

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '60px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <>
    {personalTvl ? (
        <CardValue fontSize="28px" decimals={0} value={personalTvl} prefix="$" />
      ) : (
        <>
          <Skeleton height={33} />
        </>
      )}
      
    </>
  )
}

export default PersonalTvl
