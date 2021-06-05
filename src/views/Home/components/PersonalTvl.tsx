import React from 'react'
import { Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { usePersonalTvl } from 'state/hooks'
import CardValue from './CardValue'

const PersonalTvl = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const { tvl } = usePersonalTvl()

  if (!account) {
    return (
      <Text color="white" style={{ lineHeight: '30px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return <CardValue fontSize="28px" differentFontSize="24px" decimals={0} value={tvl} prefix="$" color="white" />
}

export default PersonalTvl
