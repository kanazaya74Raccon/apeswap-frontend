import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Trade } from '@apeswapfinance/sdk'
import { Text } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { formatExecutionPrice, warningSeverity, computeTradePriceBreakdown } from 'utils/prices'
import { AutoColumn } from 'components/layout/Column'
import { AutoRow, RowBetween } from 'components/layout/Row'
import { useTranslation } from 'contexts/Localization'
import { SwapCallbackError } from './styled'
import { LargeStyledButton } from '../styles'

const SwapModalFooterContainer = styled(AutoColumn)`
  margin-top: 24px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.white3};
`

export default function SwapModalFooter({
  trade,
  onConfirm,
  swapErrorMessage,
  realSwapPrice,
}: {
  trade: Trade
  allowedSlippage: number
  onConfirm: () => void
  swapErrorMessage: string | undefined
  realSwapPrice?: string
}) {
  const { chainId } = useActiveWeb3React()
  const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const severity = warningSeverity(priceImpactWithoutFee)
  const { t } = useTranslation()

  return (
    <>
      <SwapModalFooterContainer>
        <RowBetween align="center">
          <Text fontSize="14px">{t('Target Order Price')}</Text>
          <Text
            fontSize="14px"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '10px',
            }}
          >
            {realSwapPrice
              ? `${realSwapPrice} ${trade.outputAmount.currency.getSymbol(
                  chainId,
                )} / ${trade.inputAmount.currency.getSymbol(chainId)}`
              : formatExecutionPrice(chainId, trade)}
          </Text>
        </RowBetween>
      </SwapModalFooterContainer>

      <AutoRow>
        <LargeStyledButton onClick={onConfirm} mt="12px" id="confirm-swap-or-send">
          {severity > 2 ? t('Place Order Anyway') : t('Confirm Order')}
        </LargeStyledButton>

        {swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
      </AutoRow>
    </>
  )
}
