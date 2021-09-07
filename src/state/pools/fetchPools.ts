import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import bananaABI from 'config/abi/banana.json'
import wbnbABI from 'config/abi/weth.json'
import { BLOCKS_PER_YEAR } from 'config'
import { getPoolApr } from 'utils/apr'
import { getBalanceNumber } from 'utils/formatBalance'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getWbnbAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import { TokenPrices } from 'state/types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[CHAIN_ID],
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[CHAIN_ID],
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)

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

export const fetchPoolsTotalStatking = async () => {
  const nonBnbPools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.BNB)
  const bnbPool = poolsConfig.filter((p) => p.stakingTokenName === QuoteToken.BNB)

  const callsNonBnbPools = nonBnbPools.map((poolConfig) => {
    if (poolConfig.reflect || poolConfig.stakingTokenName === 'GNANA') {
      return {
        address: poolConfig.contractAddress[CHAIN_ID],
        name: 'totalStaked',
      }
    }
    return {
      address: poolConfig.stakingTokenAddress[CHAIN_ID],
      name: 'balanceOf',
      params: [poolConfig.contractAddress[CHAIN_ID]],
    }
  })

  const callsBnbPools = bnbPool.map((poolConfig) => {
    return {
      address: getWbnbAddress(),
      name: 'balanceOf',
      params: [poolConfig.contractAddress[CHAIN_ID]],
    }
  })

  const nonBnbPoolsTotalStaked = await multicall(bananaABI, callsNonBnbPools)
  const bnbPoolsTotalStaked = await multicall(wbnbABI, callsBnbPools)

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

export const fetchPoolTokenStatsAndApr = async (tokenPrices: TokenPrices[], totalStakingList) => {
  const activePools = poolsConfig.filter((pool) => !pool.isFinished)
  const mappedValues = []
  for (let i = 0; i < activePools.length; i++) {
    // Get values needed to calculate apr
    const curPool = activePools[i]
    const stakeTokenPrice = tokenPrices?.find(
      (token) => curPool?.stakingTokenAddress && token?.address === curPool?.stakingTokenAddress[CHAIN_ID],
    )?.price
    const rewardToken = curPool?.rewardToken
      ? tokenPrices?.find((token) => curPool?.rewardToken && token?.address === curPool?.rewardToken.address[CHAIN_ID])
      : null
    const totalStaked = totalStakingList.find((totalStake) => totalStake.sousId === curPool.sousId)?.totalStaked
    // Calculate apr
    const apr = getPoolApr(stakeTokenPrice, rewardToken?.price, getBalanceNumber(totalStaked), curPool?.tokenPerBlock)
    mappedValues.push({
      sousId: curPool.sousId,
      stakeTokenPrice,
      rewardToken,
      apr,
    })
  }
  return mappedValues
}
