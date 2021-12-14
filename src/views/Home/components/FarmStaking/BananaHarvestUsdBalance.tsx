import React, { useEffect, useState } from 'react'
import { Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { usePriceBananaBusd } from 'state/hooks'
import useAllEarnings from 'hooks/useAllEarnings'
import BigNumber from 'bignumber.js'
import CardValue from '../CardValue'

const BananaHarvestUsdBalance = () => {
  const TranslateString = useI18n()
  const [pending, setPending] = useState(0)
  const { account } = useWeb3React()
  const allEarnings = useAllEarnings()
  const bananaPrice = usePriceBananaBusd().toNumber()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)

  useEffect(() => {
    setPending(earningsSum * bananaPrice)
  }, [earningsSum, bananaPrice])

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '60px', fontWeight: 700 }} fontFamily="poppins">
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return <CardValue decimals={2} value={pending} prefix="~$" fontSize="12px" color="#38A611" fontWeight={700} />
}

export default BananaHarvestUsdBalance
