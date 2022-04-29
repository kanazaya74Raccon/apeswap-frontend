import { getMiniChefAddress } from 'utils/addressHelper'
import { Call } from 'utils/multicall'
import { DualFarmConfig } from 'config/constants/types'

const fetchDualFarmCalls = (farm: DualFarmConfig, chainId: number): Call[] => {
  const miniChefAddress = getMiniChefAddress(chainId)
  const lpAddress = farm.stakeTokenAddress
  const tokenAddress = farm.stakeTokens.token0.address[chainId]
  const quoteTokenAddress = farm.stakeTokens.token1.address[chainId]
  const rewarderAddress = farm.rewarderAddress
  const calls = [
    // Balance of token in the LP contract
    {
      address: tokenAddress,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: quoteTokenAddress,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of LP tokens in the master chef contract
    {
      address: lpAddress,
      name: 'balanceOf',
      params: [miniChefAddress],
    },
    // Total supply of LP tokens
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    {
      address: miniChefAddress,
      name: 'poolInfo',
      params: [farm.pid],
    },
    {
      address: miniChefAddress,
      name: 'totalAllocPoint',
    },
    {
      address: miniChefAddress,
      name: 'bananaPerSecond',
    },
    {
      address: rewarderAddress,
      name: 'poolInfo',
      params: [farm.pid],
    },
    {
      address: rewarderAddress,
      name: 'rewardPerSecond',
    },
    {
      // This isn't ideal, but reward address will cause calls to fail with this address, minChef will go through and then can be ignored on cleanup.
      address: rewarderAddress !== '0x1F234B1b83e21Cb5e2b99b4E498fe70Ef2d6e3bf' ? rewarderAddress : miniChefAddress,
      name: 'totalAllocPoint',
    },
  ]
  return calls
}

export default fetchDualFarmCalls
