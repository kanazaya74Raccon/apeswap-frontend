import React from 'react'
import { Price } from '@apeswapfinance/sdk'
import { Text, AutoRenewIcon } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import { StyledBalanceMaxMini } from './styled'

interface TradePriceProps {
  price?: Price
  showInverted: boolean
  setShowInverted: (showInverted: boolean) => void
}

export default function TradePrice({ price, showInverted, setShowInverted }: TradePriceProps) {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const formattedPrice = showInverted ? price?.toSignificant(6) : price?.invert()?.toSignificant(6)

  const show = Boolean(price?.baseCurrency && price?.quoteCurrency)
  const label = showInverted
    ? `${price?.quoteCurrency?.getSymbol(chainId)} ${t('per')} ${price?.baseCurrency?.getSymbol(chainId)}`
    : `${price?.baseCurrency?.getSymbol(chainId)} ${t('per')} ${price?.quoteCurrency?.getSymbol(chainId)}`

  return (
    <Text style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      {show ? (
        <>
          {formattedPrice ?? '-'} {label}
          <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
            <AutoRenewIcon width="14px" />
          </StyledBalanceMaxMini>
        </>
      ) : (
        '-'
      )}
    </Text>
  )
}
