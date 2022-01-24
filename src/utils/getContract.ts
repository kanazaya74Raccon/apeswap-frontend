import { ethers } from 'ethers'
import getProvider from './getProvider'

export const getContract = (
  abi: any,
  address: string,
  chainId: number,
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  const provider = getProvider(chainId)
  const signerOrProvider = signer ?? provider
  return new ethers.Contract(address, abi, signerOrProvider)
}
