import { getMasterChefAddress } from 'utils/addressHelper'
import { FarmConfig } from 'config/constants/types'

const fetchFarmCalls = (farm: FarmConfig, chainId: number) => {
  const masterChefAddress = getMasterChefAddress(chainId)
  const lpAdress = farm.lpAddresses[chainId]
  const calls = [
    // Balance of token in the LP contract
    {
      address: farm.tokenAddresses[chainId],
      name: 'balanceOf',
      params: [lpAdress],
    },
    // Balance of quote token on LP contract
    {
      address: farm.quoteTokenAdresses[chainId],
      name: 'balanceOf',
      params: [lpAdress],
    },
    // Balance of LP tokens in the master chef contract
    {
      address: lpAdress,
      name: 'balanceOf',
      params: [masterChefAddress],
    },
    // Total supply of LP tokens
    {
      address: lpAdress,
      name: 'totalSupply',
    },
    // Token decimals
    {
      address: farm.tokenAddresses[chainId],
      name: 'decimals',
    },
    // Quote token decimals
    {
      address: farm.quoteTokenAdresses[chainId],
      name: 'decimals',
    },
    // poolInfo
    {
      address: masterChefAddress,
      name: 'poolInfo',
      params: [farm.pid],
    },
    // totalAllocPoint
    {
      address: masterChefAddress,
      name: 'totalAllocPoint',
    },
  ]
  return calls
}

export default fetchFarmCalls
