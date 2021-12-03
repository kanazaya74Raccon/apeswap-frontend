// Set of helper functions to facilitate wallet setup
import { AbiItem } from 'web3-utils'
import erc20 from 'config/abi/erc20.json'
import { CHAIN_PARAMS } from 'config/constants/chains'
import { getWeb3 } from './web3'

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (chainId: number) => {
  const provider = (window as WindowChain).ethereum
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [CHAIN_PARAMS[chainId]],
      })
      return true
    } catch (error) {
      console.warn(error)
      return false
    }
  } else {
    console.warn("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string,
) => {
  const tokenAdded = await (window as WindowChain).ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  })

  return tokenAdded
}

export const getTokenInfo = async (tokenAddress: string, chainId: number) => {
  const web3 = getWeb3(chainId)
  const token = new web3.eth.Contract(erc20 as unknown as AbiItem, tokenAddress)
  return {
    symbolToken: await token.methods.symbol().call(),
    nameToken: await token.methods.name().call(),
    decimalsToken: await token.methods.decimals().call(),
  }
}
