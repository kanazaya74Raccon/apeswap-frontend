import apePriceGetterABI from 'config/abi/apePriceGetter.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import tokens from 'config/constants/tokens'
import { getBalanceNumber } from 'utils/formatBalance'

const fetchPrices = async (chainId, multicallContract, apePriceGetterAddress) => {
  const tokensToCall = Object.keys(tokens).filter((token) => tokens[token].address[chainId] !== undefined)
  const erc20Calls = tokensToCall.map((token) => {
    return {
      address: tokens[token].address[chainId],
      name: 'decimals',
    }
  })
  const tokenDecimals = await multicall(multicallContract, erc20ABI, erc20Calls)
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
      params: [tokens[token].address[chainId], tokenDecimals[i]],
    }
  })
  const tokenPrices = await multicall(multicallContract, apePriceGetterABI, calls)
  // Banana should always be the first token
  const mappedTokenPrices = tokensToCall.map((token, i) => {
    return {
      symbol: tokens[token].symbol,
      address: tokens[token].address,
      price:
        tokens[token].symbol === 'GNANA'
          ? getBalanceNumber(tokenPrices[0], tokens[token].decimals) * 1.389
          : getBalanceNumber(tokenPrices[i], tokens[token].decimals),
      decimals: tokenDecimals[i][0],
    }
  })
  console.log(mappedTokenPrices)
  return mappedTokenPrices
}

export default fetchPrices
