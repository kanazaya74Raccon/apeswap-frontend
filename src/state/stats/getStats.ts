import { apiBaseUrl } from 'hooks/api'
import { Stats, Pool } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'

const getStats = async (address: string): Promise<Stats> => {
  try {
    const response = await fetch(`${apiBaseUrl}/stats/${address}`)
    const statRes = await response.json()
    if (statRes.statusCode === 500) {
      return null
    }
    return statRes
  } catch (error) {
    return null
  }
}

export const fetchPoolStats = (pools: Pool[], curBlock): any[] => {
  const stakedPools = pools.filter((pool) => parseInt(pool?.userData?.stakedBalance?.toString()) > 0)
  const mappedPoolStats = stakedPools.map((pool) => {
    const stakedTvl =
      getBalanceNumber(pool.userData?.stakedBalance, pool.stakingToken.decimals) * pool.stakingToken?.price
    const pendingReward = pool.rewardToken
      ? getBalanceNumber(pool.userData?.pendingReward, pool?.rewardToken.decimals)
      : getBalanceNumber(pool.userData?.pendingReward, pool.tokenDecimals)
    const pendingRewardUsd = pool.rewardToken ? pendingReward * pool?.rewardToken?.price : 0
    const dollarsEarnedPerDay = (stakedTvl * (pool?.apr / 100)) / 365
    const tokensEarnedPerDay = pool.rewardToken ? dollarsEarnedPerDay / pool?.rewardToken?.price : 0
    const finished = curBlock > pool?.endBlock
    return {
      id: pool.sousId,
      address: pool.contractAddress[56],
      name: pool.stakingToken.symbol,
      rewardTokenSymbol: pool.rewardToken ? pool?.rewardToken.symbol : pool.tokenName,
      stakedTvl,
      pendingReward,
      pendingRewardUsd,
      apr: finished ? 0 : pool?.apr / 100,
      dollarsEarnedPerDay,
      dollarsEarnedPerWeek: dollarsEarnedPerDay * 7,
      dollarsEarnedPerMonth: dollarsEarnedPerDay * 30,
      dollarsEarnedPerYear: dollarsEarnedPerDay * 365,
      tokensEarnedPerDay,
      tokensEarnedPerWeek: tokensEarnedPerDay * 7,
      tokensEarnedPerMonth: tokensEarnedPerDay * 30,
      tokensEarnedPerYear: tokensEarnedPerDay * 365,
    }
  })
  return mappedPoolStats
}

export function computeStats(pools, farms, statsOverall, bananasInWallet, curBlock): Stats {
  const farmStats = getStatsForFarms(farms, statsOverall.farms)
  const fetchedPoolStats = fetchPoolStats(pools, curBlock)
  const poolStats = fetchedPoolStats.filter((pool) => pool.id === 0)
  const incentivizedPools = fetchedPoolStats.filter((pool) => pool.id !== 0)
  const stats = {
    tvl: 0,
    bananaPrice: 0,
    aggregateApr: 0,
    aggregateAprPerDay: 0,
    aggregateAprPerWeek: 0,
    aggregateAprPerMonth: 0,
    dollarsEarnedPerDay: 0,
    dollarsEarnedPerWeek: 0,
    dollarsEarnedPerMonth: 0,
    dollarsEarnedPerYear: 0,
    bananasEarnedPerDay: 0,
    bananasEarnedPerWeek: 0,
    bananasEarnedPerMonth: 0,
    bananasEarnedPerYear: 0,
    bananasInWallet: bananasInWallet.toString(),
    pendingRewardUsd: 0,
    pendingRewardBanana: 0,
    pools: poolStats,
    farms: farmStats,
    incentivizedPools,
  }
  let totalApr = 0
  stats.pools.forEach((pool) => {
    stats.pendingRewardUsd += pool.pendingRewardUsd
    stats.pendingRewardBanana += pool.pendingReward
    stats.dollarsEarnedPerDay += pool.dollarsEarnedPerDay
    stats.bananasEarnedPerDay += pool.tokensEarnedPerDay
    stats.tvl += pool.stakedTvl
    totalApr += pool.stakedTvl * pool.apr
  })

  stats.farms.forEach((farm) => {
    stats.pendingRewardUsd += farm.pendingRewardUsd
    stats.pendingRewardBanana += farm.pendingReward
    stats.dollarsEarnedPerDay += farm.dollarsEarnedPerDay
    stats.bananasEarnedPerDay += farm.tokensEarnedPerDay
    stats.tvl += farm.stakedTvl
    totalApr += farm.stakedTvl * farm.apr
  })

  stats.incentivizedPools.forEach((incentivizedPool) => {
    stats.pendingRewardUsd += incentivizedPool.pendingRewardUsd
    stats.dollarsEarnedPerDay += incentivizedPool.dollarsEarnedPerDay
    stats.tvl += incentivizedPool.stakedTvl
    totalApr += incentivizedPool.stakedTvl * incentivizedPool.apr
  })

  stats.aggregateApr = stats.tvl ? totalApr / stats.tvl : 0
  stats.aggregateAprPerDay = stats.aggregateApr / 365
  stats.aggregateAprPerWeek = (stats.aggregateApr * 7) / 365
  stats.aggregateAprPerMonth = (stats.aggregateApr * 30) / 365

  stats.dollarsEarnedPerWeek = stats.dollarsEarnedPerDay * 7
  stats.dollarsEarnedPerMonth = stats.dollarsEarnedPerDay * 30
  stats.dollarsEarnedPerYear = stats.dollarsEarnedPerDay * 365

  stats.bananasEarnedPerWeek = stats.bananasEarnedPerDay * 7
  stats.bananasEarnedPerMonth = stats.bananasEarnedPerDay * 30
  stats.bananasEarnedPerYear = stats.bananasEarnedPerDay * 365
  return stats
}

// Get TVL info for Farms only given a wallet
export function getStatsForFarms(farms, farmsInfo) {
  const allFarms = []
  farms.map(async (farm) => {
    if (!farm.userData) return
    const userInfo = { ...farm.userData, amount: parseInt(farm.userData.stakedBalance, 10) }
    const pendingReward = parseInt(userInfo.earnings, 10) / 10 ** 18
    const farmInfo = farmsInfo.find((v) => v.poolIndex === farm.pid)

    if (farmInfo && (userInfo.amount !== 0 || pendingReward !== 0)) {
      const stakedTvl = (userInfo.amount * farmInfo.price) / 10 ** 18
      const dollarsEarnedPerDay = (stakedTvl * farmInfo.apr) / 365
      const tokensEarnedPerDay = dollarsEarnedPerDay / farmInfo.rewardTokenPrice
      const currFarm = {
        pid: farm.pid,
        address: farmInfo.address,
        name: farmInfo.name,
        stakedTvl,
        pendingReward,
        pendingRewardUsd: pendingReward * farmInfo.rewardTokenPrice,
        apr: farmInfo.apr,
        dollarsEarnedPerDay,
        dollarsEarnedPerWeek: dollarsEarnedPerDay * 7,
        dollarsEarnedPerMonth: dollarsEarnedPerDay * 30,
        dollarsEarnedPerYear: dollarsEarnedPerDay * 365,
        tokensEarnedPerDay,
        tokensEarnedPerWeek: tokensEarnedPerDay * 7,
        tokensEarnedPerMonth: tokensEarnedPerDay * 30,
        tokensEarnedPerYear: tokensEarnedPerDay * 365,
      }

      allFarms.push(currFarm)
    }
  })
  return allFarms
}

export default getStats
