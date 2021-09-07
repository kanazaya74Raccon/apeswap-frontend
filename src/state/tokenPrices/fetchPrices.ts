import apePriceGetterABI from 'config/abi/apePriceGetter.json'
import multicall from 'utils/multicall'
import tokens from 'config/constants/tokens'
import { getBalanceNumber } from 'utils/formatBalance'
import { getApePriceGetterAddress } from 'utils/addressHelpers'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const fetchPrices = async () => {
  const apePriceGetter = getApePriceGetterAddress()
  const calls = Object.keys(tokens).map((token, i) => {
    if (tokens[token].lpToken) {
      return {
        address: apePriceGetter,
        name: 'getLPPrice',
        params: [tokens[token].address[CHAIN_ID], tokens[token].decimals],
      }
    }
    return {
      address: apePriceGetter,
      name: 'getPrice',
      params: [tokens[token].address[CHAIN_ID], tokens[token].decimals],
    }
  })
  const tokenPrices = await multicall(apePriceGetterABI, calls)
  // Banana should always be the first token
  const mappedTokenPrices = Object.keys(tokens).map((token, i) => {
    return {
      symbol: tokens[token].symbol,
      address: tokens[token].address[CHAIN_ID],
      price:
        tokens[token].symbol === 'GNANA'
          ? getBalanceNumber(tokenPrices[0], tokens[token].decimals) * 1.389
          : getBalanceNumber(tokenPrices[i], tokens[token].decimals),
      decimals: tokens[token].decimals,
    }
  })
  return mappedTokenPrices
}

export default fetchPrices
