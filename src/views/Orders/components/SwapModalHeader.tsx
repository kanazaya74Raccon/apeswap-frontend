import React, { useMemo } from 'react'
import { Trade } from '@apeswapfinance/sdk'
import { Text, ArrowDownIcon } from '@apeswapfinance/uikit'
import { computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { AutoColumn } from 'components/layout/Column'
import { CurrencyLogo } from 'components/Logo'
import { RowBetween, RowFixed } from 'components/layout/Row'
import truncateHash from 'utils/truncateHash'
import { TruncatedText } from './styled'

export default function SwapModalHeader({
  trade,
  recipient,
  realOutputAmount,
}: {
  trade: Trade
  allowedSlippage: number
  recipient: string | null
  realOutputAmount?: string
}) {
  const { chainId } = useActiveWeb3React()
  const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  const truncatedRecipient = recipient ? truncateHash(recipient) : ''

  const recipientInfoText = `Output will be sent to ${truncatedRecipient}`

  const [recipientSentToText, postSentToText] = recipientInfoText.split(truncatedRecipient)

  return (
    <AutoColumn gap="md">
      <RowBetween align="flex-end">
        <RowFixed gap="0px">
          <CurrencyLogo currency={trade.inputAmount.currency} size="24px" style={{ marginRight: '12px' }} />
          <TruncatedText fontSize="24px" color="text">
            {trade.inputAmount.toSignificant(6)}
          </TruncatedText>
        </RowFixed>
        <RowFixed gap="0px">
          <Text fontSize="24px" ml="10px">
            {trade.inputAmount.currency.getSymbol(chainId)}
          </Text>
        </RowFixed>
      </RowBetween>
      <RowFixed>
        <ArrowDownIcon width="16px" ml="4px" />
      </RowFixed>
      <RowBetween align="flex-end">
        <RowFixed gap="0px">
          <CurrencyLogo currency={trade.outputAmount.currency} size="24px" style={{ marginRight: '12px' }} />
          <TruncatedText fontSize="24px" color={priceImpactSeverity > 2 ? 'error' : 'text'}>
            {realOutputAmount || trade.outputAmount.toSignificant(6)}
          </TruncatedText>
        </RowFixed>
        <RowFixed gap="0px">
          <Text fontSize="24px" ml="10px">
            {trade.outputAmount.currency.getSymbol(chainId)}
          </Text>
        </RowFixed>
      </RowBetween>
      {recipient !== null ? (
        <AutoColumn justify="flex-start" gap="sm" style={{ padding: '12px 0 0 0px' }}>
          <Text>
            {recipientSentToText}
            <b title={recipient}>{truncatedRecipient}</b>
            {postSentToText}
          </Text>
        </AutoColumn>
      ) : null}
    </AutoColumn>
  )
}
