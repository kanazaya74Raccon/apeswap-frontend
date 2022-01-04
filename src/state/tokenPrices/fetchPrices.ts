import apePriceGetterABI from 'config/abi/apePriceGetter.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import multicallABI from 'config/abi/Multicall.json'
import { getMulticallAddress, getApePriceGetterAddress } from 'utils/addressHelper'
import { getContract } from 'utils/web3'
import { getBalanceNumber } from 'utils/formatBalance'

const fetchPrices = async (chainId, target) => {
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const apePriceGetterAddress = getApePriceGetterAddress(chainId)
  const tokensToCall = Object.keys(target).filter((token) => target[token].address[chainId] !== undefined)
  const erc20Calls = tokensToCall.map((token) => {
    return {
      address: target[token].address[chainId],
      name: 'decimals',
    }
  })
  const tokenDecimals = await multicall(multicallContract, erc20ABI, erc20Calls)
  const calls = tokensToCall.map((token, i) => {
    if (target[token].lpToken) {
      return {
        address: apePriceGetterAddress,
        name: 'getLPPrice',
        params: [target[token].address[chainId], tokenDecimals[i][0]],
      }
    }
    return {
      address: apePriceGetterAddress,
      name: 'getPrice',
      params: [target[token].address[chainId], tokenDecimals[i][0]],
    }
  })
  const tokenPrices = await multicall(multicallContract, apePriceGetterABI, calls)
  // Banana should always be the first token
  const mappedTokenPrices = tokensToCall.map((token, i) => {
    return {
      symbol: target[token].symbol,
      address: target[token].address,
      price:
          target[token].symbol === 'GNANA'
          ? getBalanceNumber(tokenPrices[0], tokenDecimals[i][0]) * 1.389
          : getBalanceNumber(tokenPrices[i], tokenDecimals[i][0]),
      decimals: tokenDecimals[i][0],
      pid: target[token].pid,
      lpToken: target[token].lpToken,
      quoteToken: target[token].quoteToken,
      baseToken: target[token].baseToken
    }
  })
  return mappedTokenPrices
}

export default fetchPrices
