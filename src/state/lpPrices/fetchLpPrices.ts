import apePriceGetterABI from 'config/abi/apePriceGetter.json'
import multicall from 'utils/multicall'
import { getApePriceGetterAddress } from 'utils/addressHelper'
import { getBalanceNumber } from 'utils/formatBalance'
import { farmsConfig } from '../../config/constants'

const fetchLpPrices = async (chainId) => {
  const apePriceGetterAddress = getApePriceGetterAddress(chainId)
  const tokensToCall = Object.keys(farmsConfig).filter((token) => farmsConfig[token].lpAddresses[chainId] !== undefined)
  const calls = tokensToCall.map((token) => {
    return {
      address: apePriceGetterAddress,
      name: 'getLPPrice',
      params: [farmsConfig[token].lpAddresses[chainId], 18],
    }
  })
  const tokenPrices = await multicall(chainId, apePriceGetterABI, calls)
  // Banana should always be the first token
  const mappedTokenPrices = tokensToCall.map((token, i) => {
    return {
      symbol: farmsConfig[token].lpSymbol,
      address: farmsConfig[token].lpAddresses,
      price: getBalanceNumber(tokenPrices[i], 18),
      decimals: 18,
      pid: farmsConfig[token].pid,
    }
  })
  return mappedTokenPrices
}

export default fetchLpPrices
