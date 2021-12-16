import apePriceGetterABI from 'config/abi/apePriceGetter.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import multicallABI from 'config/abi/Multicall.json'
import { getMulticallAddress, getApePriceGetterAddress } from 'utils/addressHelper'
import { getContract } from 'utils/web3'
import lpTokens from 'config/constants/lpTokens'
import { getBalanceNumber } from 'utils/formatBalance'

const fetchLpPrices = async (chainId) => {
    const multicallContractAddress = getMulticallAddress(chainId)
    const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
    const apePriceGetterAddress = getApePriceGetterAddress(chainId)
    const tokensToCall = Object.keys(lpTokens).filter((token) => lpTokens[token].address[chainId] !== undefined)
    const erc20Calls = tokensToCall.map((token) => {
        return {
            address: lpTokens[token].address[chainId],
            name: 'decimals',
        }
    })
    const tokenDecimals = await multicall(multicallContract, erc20ABI, erc20Calls)
    const calls = tokensToCall.map((token, i) => {
        if (lpTokens[token].lpToken) {
            return {
                address: apePriceGetterAddress,
                name: 'getLPPrice',
                params: [lpTokens[token].address[chainId], tokenDecimals[i][0]],
            }
        }
        return {
            address: apePriceGetterAddress,
            name: 'getPrice',
            params: [lpTokens[token].address[chainId], tokenDecimals[i][0]],
        }
    })
    const tokenPrices = await multicall(multicallContract, apePriceGetterABI, calls)
    // Banana should always be the first token
    const mappedTokenPrices = tokensToCall.map((token, i) => {
        return {
            symbol: lpTokens[token].symbol,
            address: lpTokens[token].address,
            price:
                lpTokens[token].symbol === 'GNANA'
                    ? getBalanceNumber(tokenPrices[0], tokenDecimals[i][0]) * 1.389
                    : getBalanceNumber(tokenPrices[i], tokenDecimals[i][0]),
            decimals: tokenDecimals[i][0],
            pid: lpTokens[token].pid,
            lpToken: lpTokens[token].lpToken,
            quoteToken: lpTokens[token].quoteToken,
            baseToken: lpTokens[token].baseToken
        }
    })
    return mappedTokenPrices
}

export default fetchLpPrices
