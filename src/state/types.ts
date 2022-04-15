import { ThunkAction } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { Toast } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import {
  Address,
  FarmConfig,
  Nft,
  Nfb,
  PoolConfig,
  NfaStakingPoolConfig,
  Team,
  VaultConfig,
  DualFarmConfig,
  BillsConfig,
} from 'config/constants/types'

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, AnyAction>

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber
  totalInQuoteToken?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: BigNumber
  totalLpStakedUsd?: string
  apr?: string
  apy?: string
  lpApr?: string
  bananaPrice?: number
  lpValueUsd?: number
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}

export interface DualFarm extends DualFarmConfig {
  tokenAmount?: BigNumber
  totalInQuoteToken?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  stakeTokenPrice?: number
  rewardToken0Price?: number
  rewardToken1Price?: number
  poolWeight?: BigNumber
  multiplier?: string
  apr?: number
  totalStaked?: string
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    miniChefEarnings: BigNumber
    rewarderEarnings: BigNumber
  }
}

export interface Pool extends PoolConfig {
  totalStaked?: BigNumber
  startBlock?: number
  endBlock?: number
  apr?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
  lpData?: any
}

export interface UserBillNft {
  image: string
  tokenId: string
  attributes: {
    trait_type: string
    value: string
  }[]
}

export interface UserBill {
  address: string
  id: string
  vesting: string
  payout: string
  truePricePaid: string
  lastBlockTimestamp: string
  pendingRewards: string
  nftData?: UserBillNft
}

export interface Bills extends BillsConfig {
  price?: string
  priceUsd?: string
  vestingTime?: string
  discount?: string
  currentDebt?: string
  currentFee?: string
  debtDecay?: string
  debtRatio?: string
  totalDebt?: string
  totalPayoutGiven?: string
  totalPrincipleBilled?: string
  controlVariable?: string
  minimumPrice?: string
  maxPayout?: string
  maxDebt?: string
  lpPriceUsd?: number
  earnTokenPrice?: number
  billNftAddress?: string
  userData?: {
    allowance: string
    stakingTokenBalance: string
    bills?: UserBill[]
  }
  userOwnedBillsData?: UserBill[]
  userOwnedBillsNftData?: UserBillNft[]
}

export interface JunglePool extends PoolConfig {
  totalStaked?: BigNumber
  startBlock?: number
  endBlock?: number
  apr?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
  lpData?: any
}

export interface Vault extends VaultConfig {
  totalStaked?: string
  totalAllocPoint?: string
  allocPoint?: string
  weight?: number
  stakeTokenPrice?: number
  strategyPairBalance?: string
  strategyPairBalanceFixed?: string
  totalInQuoteToken?: string
  totalInQuoteTokenInMasterChef?: string
  stakeTokenDecimals?: string
  masterChefPairBalance?: string
  apy?: {
    daily?: number
    yearly?: number
  }
  userData?: {
    allowance: string
    tokenBalance: string
    stakedBalance: string
    stakedWantBalance: string
  }
}

export interface NfaStakingPool extends NfaStakingPoolConfig {
  totalStaked?: BigNumber
  startBlock?: number
  apr?: number
  userData?: {
    allowance: boolean
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
    stakedNfas: number[]
  }
}

export interface Profile {
  ownedNfts: Nft[]
  rarestNft: Nft | Nfb
}

export interface Network {
  chainId: number
  chainIdFromUrl?: boolean
}

export interface BlockState {
  currentBlock: number
  initialBlock: number
}

export interface Tag {
  pid: number
  text: string
  color: string
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

export interface Auction {
  auctionId: number
  nfa?: Nft
  seller: string
  highestBidder: string
  highestBid: string
  timeExtension: BigNumber
  timeLength: BigNumber
  minToExtend: BigNumber
  startTime: number
  endTime: number
}

export interface FarmPool {
  address: string
  id: number
  rewardTokenSymbol: string
  apr: number
  pid: number
  name: string
  pendingReward: number
  pendingRewardUsd: number
  stakedTvl: number
  dollarsEarnedPerDay: number
  dollarsEarnedPerWeek: number
  dollarsEarnedPerMonth: number
  dollarsEarnedPerYear: number
}

export interface AuctionsOverall {
  activeAuctionId: number
  auctionFeePercent: number
  minIncrementAmount: number
  minIncrementPercentage: number
  pushedAuctions: number
  auctionsRemovedCount: number
  auctions: Auction[]
}

export interface StatsOverall {
  bananaPrice: number
  tvl: number
  totalLiquidity: number
  circulatingSupply: number
  totalVolume: number
  burntAmount: number
  totalSupply: number
  marketCap: number
  pools: FarmOverall[]
  farms: FarmOverall[]
  incentivizedPools: FarmOverall[]
}

export interface HomepageData {
  tvl: number
  marketCap: number
  circulatingSupply: number
  gnanaCirculatingSupply: number
  burntAmount: number
  totalVolume: number
  partnerCount?: number
}

export interface HomepageTokenStats {
  tokenTicker: string
  tokenPrice: number
  percentChange: number
  contractAddress: string
  logoUrl: string
}

export interface NewsCardType {
  id: number
  cardPosition: number
  cardImageUrl: any
  CardLink: string
  StartTime: string
  EndTime: string
}

export interface FarmLpAprsType {
  chainId: number
  lpAprs: {
    pid: number
    lpApr: number
  }[]
}

export interface LaunchCalendarCard {
  image1: any
  image2?: any
  textLine1: string
  textLine2?: string
  textLine3?: string
  launchTime: string
}

export type Nfa = Nft

export interface PoolOverall {
  address: string
  lpSymbol: string
  poolIndex: number
  name: string
  price: number
  tvl: number
  stakedTvl: number
  staked: number
  apr?: number
  decimals: string
  stakeTokenPrice?: number
  rewardTokenSymbol: string
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
  id: number
  q1: number
  price: number
  totalSupply: number
  tvl: number
  stakedTvl: number
  apr: number
  decimals: string
  rewardTokenPrice: number
  rewardTokenSymbol: string
}

// Start IAZO

export interface IazoDefaultSettings {
  adminAddress: string
  feeAddress: string
  burnAddress: string
  baseFee: string
  maxBaseFee: string
  iazoTokenFee: string
  maxIazoTokenFee: string
  nativeCreationFee: string
  minIazoLength: string
  maxIazoLength: string
  minLockPeriod: string
}

export interface IazoTokenInfo {
  address: string
  name: string
  symbol: string
  decimals: string
  totalSupply?: string
}

export interface IazoFeeInfo {
  feeAddress: string
  baseFee: string
  iazoTokenFee: string
}

export interface IazoTimeInfo {
  startTime: string
  activeTime: string
  lockPeriod: string
}

export interface IazoStatus {
  lpGenerationComplete: boolean
  forceFailed: boolean
  totalBaseCollected: string
  totalTokensSold: string
  totalTokensWithdraw: string
  totalBaseWithdraw: string
  numBuyers: string
}

export interface ServiceData {
  id: number
  apr?: number
  apy?: number
  link: string
  marketName?: string
  marketAddress?: string
  stakeToken?: {
    name: string
    address: string
  }
  rewardToken?: {
    name: string
    address: string
  }
  token?: {
    name: string
    address: string
  }
}

export interface IazoSocialInfo {
  telegram: string
  twitter: string
  website: string
  whitepaper: string
  tokenImage: string
  medium: string
  description: string
}

export interface TagLink {
  link: string
  position: number
  title: string
}

export interface IazoTags {
  tagLinks: TagLink[]
  tagName: string
  tagIcon: string
}

export type IazoState = 'QUEUED' | 'ACTIVE' | 'SUCCESS' | 'HARD_CAP_MET' | 'FAILED'

export interface Iazo {
  iazoContractAddress: string
  iazoOwnerAddress: string
  iazoSaleInNative?: boolean
  tokenPrice: string
  amount: string
  hardcap: string
  softcap: string
  maxSpendPerBuyer: string
  liquidityPercent: string
  listingPrice: string
  iazoState: IazoState
  burnRemain: boolean
  feeInfo: IazoFeeInfo
  timeInfo: IazoTimeInfo
  status: IazoStatus
  baseToken: IazoTokenInfo
  iazoToken: IazoTokenInfo
  isRegistered?: boolean
  socialInfo?: IazoSocialInfo
  iazoTags?: IazoTags[]
}

export interface TokenPrices {
  symbol: string
  address: Address
  price: number
  decimals: number
}

export interface LpTokenPrices {
  symbol: string
  pid: number
  address: Address
  price: number
  decimals: number
}

// Slices states

export interface ToastsState {
  data: Toast[]
}

export interface FarmsState {
  data: Farm[]
  tags: Tag[]
}

export interface PoolsState {
  data: Pool[]
}

export interface NfaState {
  isInitialized: boolean
  isLoading: boolean
  data: Nfa[]
}

export interface JunglePoolsState {
  data: JunglePool[]
}

export interface DualFarmsState {
  data: DualFarm[]
}

export interface BillsState {
  data: Bills[]
}

export interface NetworkState {
  isInitialized: boolean
  isLoading: boolean
  data: Network
}

export interface VaultsState {
  loadVaultData: boolean
  userDataLoaded: boolean
  data: Vault[]
}

export interface NfaStakingPoolsState {
  data: NfaStakingPool[]
}

export interface ProfileState {
  isInitialized: boolean
  isLoading: boolean
  data: Profile
}

export interface StatsState {
  isInitialized: boolean
  isLoading: boolean
  HomepageData: HomepageData
  HomepageTokenStats: HomepageTokenStats[]
  HomepageNews: NewsCardType[]
  HomepageLaunchCalendar: LaunchCalendarCard[]
  HomepageServiceStats: ServiceData[]
  FarmLpAprs: FarmLpAprsType
  data: Stats
}

export interface AuctionsState {
  isInitialized: boolean
  isLoading: boolean
  data: AuctionsOverall
}

export interface TokenPricesState {
  isInitialized: boolean
  isLoading: boolean
  data: TokenPrices[]
}
export interface LpTokenPricesState {
  isInitialized: boolean
  isLoading: boolean
  data: LpTokenPrices[]
}

export interface StatsOverallState {
  isInitialized: boolean
  isLoading: boolean
  data: StatsOverall
}

export interface IazosState {
  isInitialized: boolean
  isLoading: boolean
  iazoData: Iazo[]
  iazoDefaultSettings: IazoDefaultSettings
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
  block: BlockState
  toasts: ToastsState
  pools: PoolsState
  junglePools: JunglePoolsState
  profile: ProfileState
  stats: StatsState
  statsOverall: StatsOverallState
  teams: TeamsState
  auctions: AuctionsState
  vaults: VaultsState
  tokenPrices: TokenPricesState
  lpTokenPrices: LpTokenPricesState
  iazos: IazosState
  network: NetworkState
  nfaStakingPools: NfaStakingPoolsState
  dualFarms: DualFarmsState
  bills: BillsState
  nfas: NfaState
}
