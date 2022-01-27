import apePriceGetterABI from 'config/abi/apePriceGetter.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getApePriceGetterAddress } from 'utils/addressHelper'
import tokens from 'config/constants/tokens'
import { getBalanceNumber } from 'utils/formatBalance'

const fetchPrices = async (chainId) => {
  const apePriceGetterAddress = getApePriceGetterAddress(chainId)
  const tokensToCall = Object.keys(tokens).filter((token) => tokens[token].address[chainId] !== undefined)
  const erc20Calls = tokensToCall.map((token) => {
    return {
      address: tokens[token].address[chainId],
      name: 'decimals',
    }
  })
  const tokenDecimals = await multicall(chainId, erc20ABI, erc20Calls)
  const calls = tokensToCall.map((token, i) => {
    if (tokens[token].lpToken) {
      return {
        address: apePriceGetterAddress,
        name: 'getLPPrice',
        params: [tokens[token].address[chainId], tokenDecimals[i][0]],
      }
    }
    return {
      address: apePriceGetterAddress,
      name: 'getPrice',
      params: [tokens[token].address[chainId], tokenDecimals[i][0]],
    }
  })
  const tokenPrices = await multicall(chainId, apePriceGetterABI, calls)

  // Banana should always be the first token
  const mappedTokenPrices = tokensToCall.map((token, i) => {
    return {
      symbol: tokens[token].symbol,
      address: tokens[token].address,
      price:
        tokens[token].symbol === 'GNANA'
          ? getBalanceNumber(tokenPrices[0], tokenDecimals[i][0]) * 1.389
          : getBalanceNumber(tokenPrices[i], tokenDecimals[i][0]),
      decimals: tokenDecimals[i][0],
    }
  })
  return mappedTokenPrices
}

export default fetchPrices
