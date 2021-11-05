import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import bananaABI from 'config/abi/banana.json'
import wbnbABI from 'config/abi/weth.json'
import multicall from 'utils/multicall'
import multicallABI from 'config/abi/Multicall.json'
import { getMulticallAddress, getNativeWrappedAddress } from 'utils/addressHelper'
import { getContract } from 'utils/web3'
import { getPoolApr } from 'utils/apr'
import { getBalanceNumber } from 'utils/formatBalance'
import { QuoteToken } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { TokenPrices } from 'state/types'

export const fetchPoolsBlockLimits = async (chainId: number) => {
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[chainId],
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[chainId],
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(multicallContract, sousChefABI, callsStartBlock)
  const ends = await multicall(multicallContract, sousChefABI, callsEndBlock)

  return poolsWithEnd.map((bananaPoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: bananaPoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: bananaPoolConfig.bonusEndBlock || new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStaking = async (chainId: number) => {
  const multicallContractAddress = getMulticallAddress(chainId)
  const nativeWrappedAddress = getNativeWrappedAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const nonBnbPools = poolsConfig.filter((p) => p.stakingToken.symbol !== QuoteToken.BNB)
  const bnbPool = poolsConfig.filter((p) => p.stakingToken.symbol === QuoteToken.BNB)

  const callsNonBnbPools = nonBnbPools.map((poolConfig) => {
    if (poolConfig.reflect || poolConfig.stakingToken.symbol === 'GNANA') {
      return {
        address: poolConfig.contractAddress[chainId],
        name: 'totalStaked',
      }
    }
    return {
      address: poolConfig.stakingToken.address[chainId],
      name: 'balanceOf',
      params: [poolConfig.contractAddress[chainId]],
    }
  })

  const callsBnbPools = bnbPool.map((poolConfig) => {
    return {
      address: nativeWrappedAddress,
      name: 'balanceOf',
      params: [poolConfig.contractAddress[chainId]],
    }
  })

  const nonBnbPoolsTotalStaked = await multicall(multicallContract, bananaABI, callsNonBnbPools)
  const bnbPoolsTotalStaked = await multicall(multicallContract, wbnbABI, callsBnbPools)

  return [
    ...nonBnbPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonBnbPoolsTotalStaked[index]).toJSON(),
    })),
    ...bnbPool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(bnbPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}

export const fetchPoolTokenStatsAndApr = async (tokenPrices: TokenPrices[], totalStakingList, chainId: number) => {
  const mappedValues = poolsConfig.map((pool) => {
    // Get values needed to calculate apr
    const curPool = pool
    const rewardToken = tokenPrices
      ? tokenPrices.find((token) => pool?.rewardToken && token?.address[chainId] === pool?.rewardToken.address[chainId])
      : pool.rewardToken
    const stakingToken = tokenPrices
      ? tokenPrices.find((token) => token?.address[chainId] === pool?.stakingToken.address[chainId])
      : pool.stakingToken
    const totalStaked = totalStakingList.find((totalStake) => totalStake.sousId === pool.sousId)?.totalStaked
    // Calculate apr
    const apr = getPoolApr(
      stakingToken?.price,
      rewardToken?.price,
      getBalanceNumber(totalStaked),
      curPool?.tokenPerBlock,
    )
    return {
      sousId: curPool.sousId,
      stakingToken,
      rewardToken,
      apr,
    }
  })
  return mappedValues
}
