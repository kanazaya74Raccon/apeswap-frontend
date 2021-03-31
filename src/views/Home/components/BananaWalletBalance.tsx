import React from 'react'
import { Text } from '@apeswapfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getBananaAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from './CardValue'

const BananaWalletBalance = () => {
  const TranslateString = useI18n()
  const bananaBalance = useTokenBalance(getBananaAddress())
  const { account } = useWallet()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '36px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return <CardValue value={getBalanceNumber(bananaBalance)} fontSize="40px" />
}

export default BananaWalletBalance
