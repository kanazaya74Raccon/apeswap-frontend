import React from 'react'
import { Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'

import useAllEarnings from 'hooks/useAllEarnings'
import { useTranslation } from 'contexts/Localization'
import CardValue from '../CardValue'

const BananaHarvestBalance = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '60px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return <CardValue value={earningsSum} fontSize="57px" fontWeight={800} />
}

export default BananaHarvestBalance
