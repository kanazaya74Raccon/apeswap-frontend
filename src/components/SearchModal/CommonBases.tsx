import React from 'react'
import { ChainId, Currency, currencyEquals, ETHER, Token } from '@apeswapfinance/sdk'
import { Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { SUGGESTED_BASES } from '../../config/constants'
import { AutoColumn } from '../layout/Column'
import { AutoRow } from '../layout/Row'
import { CurrencyLogo } from '../Logo'

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.colors.background)};
  border-radius: 10px;
  display: flex;
  padding: 6px;
  margin: 5px 5px 2px 5px;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.colors.background};
  }

  background-color: ${({ theme, disable }) => disable && theme.colors.background};
  opacity: ${({ disable }) => disable && '0.4'};
`

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
}: {
  chainId?: ChainId
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  return (
    <AutoColumn gap="md">
      <AutoRow>
        <Text margin="20px 0px 0px 20px" fontSize="16px">
          Common bases
        </Text>
      </AutoRow>
      <AutoRow style={{ padding: '0px 10px 0px 10px' }}>
        <BaseWrapper
          onClick={() => {
            if (!selectedCurrency || !currencyEquals(selectedCurrency, ETHER)) {
              onSelect(ETHER)
            }
          }}
          disable={selectedCurrency === ETHER}
        >
          <CurrencyLogo currency={ETHER} style={{ marginRight: 8 }} />
          <Text> {Currency.getNativeCurrencySymbol(chainId)}</Text>
        </BaseWrapper>
        {(chainId ? SUGGESTED_BASES[chainId] : []).map((token: Token) => {
          const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address
          return (
            <BaseWrapper onClick={() => !selected && onSelect(token)} disable={selected} key={token.address}>
              <CurrencyLogo currency={token} style={{ marginRight: 8 }} />
              <Text>{token.symbol}</Text>
            </BaseWrapper>
          )
        })}
      </AutoRow>
    </AutoColumn>
  )
}
