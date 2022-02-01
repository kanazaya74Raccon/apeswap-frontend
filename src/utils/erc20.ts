import Web3 from 'web3'
import { provider as ProviderType } from 'web3-core'
import { Web3Provider } from '@ethersproject/providers'
import { BigNumber, Contract } from 'ethers'
import { AbiItem } from 'web3-utils'
import erc20 from 'config/abi/erc20.json'
import { ZERO_ADDRESS } from 'config'

export const getContract = (provider: ProviderType, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(erc20 as unknown as AbiItem, address)
  return contract
}

export const getAllowance = async (
  lpContract: Contract,
  masterChefContract: Contract,
  account: string,
): Promise<string> => {
  try {
    const allowance: string = await lpContract.allowance(account, masterChefContract.address)
    return allowance
  } catch (e) {
    return '0'
  }
}

export const getTokenBalance = async (
  provider: Web3Provider,
  tokenAddress: string,
  userAddress: string,
  tokenContract?: Contract,
): Promise<string> => {
  if (tokenAddress === ZERO_ADDRESS) {
    try {
      const balance: BigNumber = await provider.getBalance(userAddress)
      return balance?.toString()
    } catch (e) {
      return '0'
    }
  }
  try {
    const balance: string = await tokenContract.balanceOf(userAddress)
    return balance?.toString()
  } catch (e) {
    return '0'
  }
}
