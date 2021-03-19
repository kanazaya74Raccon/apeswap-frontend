import { StatsOverall } from 'state/types'

export type StatsOverallResponse = {
  bananaPrice: number
  tvl: number
  totalVolume: number
  burntAmount: number
  totalSupply: number
  marketCap: number
  pools: []
  farms: []
  incentivizedPools: []
}

export const transformStatsResponse = (statsOverallResponse: StatsOverallResponse): Partial<StatsOverall> => {
  const data = statsOverallResponse
  return {
    bananaPrice: data.bananaPrice,
    burntAmount: data.burntAmount,
    totalSupply: data.totalSupply,
    marketCap: data.marketCap,
    pools: data.pools,
    farms: data.farms,
    incentivizedPools: data.incentivizedPools,
  }
}
