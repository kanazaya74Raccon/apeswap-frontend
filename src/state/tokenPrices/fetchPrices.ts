import apePriceGetterABI from 'config/abi/apePriceGetter.json'
import multicall from 'utils/multicall'
import tokens from 'config/constants/tokens'
import { getBalanceNumber } from 'utils/formatBalance'

const fetchPrices = async (chainId, multicallAddress, apePriceGetterAddress) => {
  const tokensToCall = Object.keys(tokens).filter((token, i) => tokens[token].address[chainId] !== undefined)
  const calls = tokensToCall.map((token) => {
    if (tokens[token].lpToken) {
      return {
        address: apePriceGetterAddress,
        name: 'getLPPrice',
        params: [tokens[token].address[chainId], tokens[token].decimals],
      }
    }
    return {
      address: apePriceGetterAddress,
      name: 'getPrice',
      params: [tokens[token].address[chainId], tokens[token].decimals],
    }
  })
  const tokenPrices = await multicall(multicallAddress, apePriceGetterABI, calls)
  // Banana should always be the first token
  const mappedTokenPrices = Object.keys(tokens).map((token, i) => {
    return {
      symbol: tokens[token].symbol,
      address: tokens[token].address,
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
