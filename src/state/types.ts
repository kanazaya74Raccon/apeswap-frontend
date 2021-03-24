import { Toast } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { FarmConfig, Nft, PoolConfig, Team } from 'config/constants/types'

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber
  totalInQuoteToken?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: BigNumber
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}

export interface Pool extends PoolConfig {
  totalStaked?: BigNumber
  startBlock?: number
  endBlock?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
  lpData?: any
}

export interface Profile {
  userId: number
  points: number
  teamId: number
  nftAddress: string
  tokenId: number
  isActive: boolean
  username: string
  nft: Nft
  team: Team
}

export interface Stats {
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
  farms: FarmPool[]
  incentivizedPools: FarmPool[]
  pendingRewardUsd: number
  pendingRewardBanana: number
  pools: FarmPool[]
  tvl: number
}

export interface FarmPool {
  address: string
  rewardTokenSymbol: string
  apr: number
  name: string
  pendingReward: number
  stakedTvl: number
  dollarsEarnedPerDay: number
  dollarsEarnedPerWeek: number
  dollarsEarnedPerMonth: number
  dollarsEarnedPerYear: number
}

export interface StatsOverall {
  bananaPrice: number
  tvl: number
  totalVolume: number
  burntAmount: number
  totalSupply: number
  marketCap: number
  pools: PoolOverall[]
  farms: FarmOverall[]
  incentivizedPools: FarmOverall[]
}

export interface PoolOverall {
  address: string
  lpSymbol: string
  poolIndex: number
  name: string
  price: number
  tvl: number
  stakedTvl: number
  staked: number
  apr: number
  decimals: string
}

export interface FarmOverall {
  address: string
  lpSymbol: string
  poolIndex: number
  t0Address: string
  t0Symbol: string
  t0Decimals: string
  p0: number
  q0: number
  t1Address: string
  t1Symbol: string
  t1Decimals: string
  p1: number
  q1: number
  price: number
  totalSupply: number
  tvl: number
  stakedTvl: number
  apr: number
  decimals: string
}

// Slices states

export interface ToastsState {
  data: Toast[]
}

export interface FarmsState {
  data: Farm[]
}

export interface PoolsState {
  data: Pool[]
}

export interface ProfileState {
  isInitialized: boolean
  isLoading: boolean
  data: Profile
}

export interface StatsState {
  isInitialized: boolean
  isLoading: boolean
  data: Stats
}

export interface StatsOverallState {
  isInitialized: boolean
  isLoading: boolean
  data: StatsOverall
}

export type TeamResponse = {
  0: string
  1: string
  2: string
  3: string
  4: boolean
}

export type TeamsById = {
  [key: string]: Team
}

export interface TeamsState {
  isInitialized: boolean
  isLoading: boolean
  data: TeamsById
}

// Global state

export interface State {
  farms: FarmsState
  toasts: ToastsState
  pools: PoolsState
  profile: ProfileState
  stats: StatsState
  statsOverall: StatsOverallState
  teams: TeamsState
}
