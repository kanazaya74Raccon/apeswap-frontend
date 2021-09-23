import React from 'react'
import { Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import { usePriceBananaBusd } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { getBananaAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import CardValue from '../CardValue'

const BananaHarvestUsdBalance = () => {
  const TranslateString = useI18n()
  const bananaBalance = useTokenBalance(getBananaAddress())
  const { account } = useWeb3React()

  const bananaPriceUsd = usePriceBananaBusd().toNumber() * getBalanceNumber(bananaBalance)

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '36px', fontWeight: 700 }} fontFamily="poppins">
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <CardValue
      decimals={2}
      value={bananaPriceUsd}
      prefix="~$"
      fontSize="12px"
      color="#38A611"
      text="poppins"
      fontWeight={700}
    />
  )
}

export default BananaHarvestUsdBalance
