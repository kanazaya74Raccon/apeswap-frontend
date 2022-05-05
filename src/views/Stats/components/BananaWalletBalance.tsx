import React from 'react'
import { Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { useBananaAddress } from 'hooks/useAddress'
import CardValue from './CardValue'

const BananaWalletBalance = () => {
  const { t } = useTranslation()
  const bananaBalance = useTokenBalance(useBananaAddress())
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '36px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return <CardValue value={getBalanceNumber(bananaBalance)} fontSize="24px" />
}

export default BananaWalletBalance
