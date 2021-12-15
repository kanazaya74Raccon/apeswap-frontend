import { Currency, ETHER, Token } from '@apeswapfinance/sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'BNB'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
