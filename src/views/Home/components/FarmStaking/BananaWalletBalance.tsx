import React from 'react'
import { Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { useBananaAddress } from 'hooks/useAddress'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from '../CardValue'

const BananaWalletBalance = () => {
  const TranslateString = useI18n()
  const bananaBalance = useTokenBalance(useBananaAddress())
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '36px' }} fontFamily="poppins">
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return <CardValue value={getBalanceNumber(bananaBalance)} fontSize="40px" fontFamily="Titan One" />
}

export default BananaWalletBalance
