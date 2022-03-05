import React, { useEffect, useState } from 'react'
import { Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'

import { usePriceBananaBusd } from 'state/hooks'
import useAllEarnings from 'hooks/useAllEarnings'
import BigNumber from 'bignumber.js'
import CardValue from '../CardValue'
import { useTranslation } from '../../../../contexts/Localization'

const BananaHarvestUsdBalance = () => {
  const { t } = useTranslation()
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
      <Text color="textDisabled" style={{ lineHeight: '60px', fontWeight: 700 }}>
        {t('Locked')}
      </Text>
    )
  }

  return <CardValue decimals={2} value={pending} prefix="~$" fontSize="12px" color="#38A611" fontWeight={600} />
}

export default BananaHarvestUsdBalance
