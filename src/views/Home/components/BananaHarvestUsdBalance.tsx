import React, { useEffect } from 'react'
import { Text } from '@apeswapfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import useI18n from 'hooks/useI18n'
import { usePendingUsd } from 'state/hooks'
import { fetchFarmUserDataAsync } from 'state/farms'
import useRefresh from 'hooks/useRefresh'
import CardValue from './CardValue'

const BananaHarvestUsdBalance = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const { pending } = usePendingUsd()
  const { slowRefresh } = useRefresh()
  const dispatch = useDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, slowRefresh])

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '60px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return <CardValue decimals={2} value={pending} prefix="$" />
}

export default BananaHarvestUsdBalance
