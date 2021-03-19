import { Stats } from 'state/types'

export type StatsResponse = {
  aggregateApr: number
  aggregateAprPerDay: number
  aggregateAprPerMonth: number
  aggregateAprPerWeek: number
  bananaPrice: number
  bananasEarnedPerDay: number
  bananasEarnedPerMonth: number
  bananasEarnedPerWeek: number
  bananasEarnedPerYear: number
  bananasInWallet: number
  dollarsEarnedPerDay: number
  dollarsEarnedPerMonth: number
  dollarsEarnedPerWeek: number
  dollarsEarnedPerYear: number
  farms: []
  incentivizedPools: []
  pendingReward: number
  pools: []
  tvl: number
}

export const transformStatsResponse = (statsResponse: StatsResponse): Partial<Stats> => {
  const data = statsResponse
  return {
    aggregateApr: data.aggregateApr,
    aggregateAprPerDay: data.aggregateAprPerDay,
    aggregateAprPerMonth: data.aggregateAprPerMonth,
    aggregateAprPerWeek: data.aggregateAprPerWeek,
    bananaPrice: data.bananaPrice,
    bananasEarnedPerDay: data.bananasEarnedPerDay,
    bananasEarnedPerMonth: data.bananasEarnedPerMonth,
    bananasEarnedPerWeek: data.bananasEarnedPerWeek,
    bananasEarnedPerYear: data.bananasEarnedPerYear,
    bananasInWallet: data.bananasInWallet,
    dollarsEarnedPerDay: data.dollarsEarnedPerDay,
    dollarsEarnedPerMonth: data.dollarsEarnedPerMonth,
    dollarsEarnedPerWeek: data.dollarsEarnedPerWeek,
    dollarsEarnedPerYear: data.dollarsEarnedPerYear,
    farms: data.farms,
    incentivizedPools: data.incentivizedPools,
    pendingReward: data.pendingReward,
    pools: data.pools,
    tvl: data.tvl,
  }
}
