export type IfoStatus = 'coming_soon' | 'live' | 'finished'

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  subTitle?: string
  description?: string
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  bananaToBurn?: string
  projectSiteUrl: string
  currency: string
  currencyAddress: string
  tokenDecimals: number
  releaseBlockNumber: number
  startBlock?: number
  burnedTxUrl?: string
}

export enum QuoteToken {
  'BNB' = 'BNB',
  'CAKE' = 'CAKE',
  'BANANA' = 'BANANA',
  'SYRUP' = 'SYRUP',
  'BUSD' = 'BUSD',
  'TWT' = 'TWT',
  'UST' = 'UST',
  'ETH' = 'ETH',
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'APEZONE' = 'ApeZone',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
}

export interface Address {
  97?: string
  56: string
}

export interface FarmStyles {
  deprecated: any
  warning: any
  featured: any
  inactive: any
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  tokenSymbol: string
  style?: keyof FarmStyles
  disableApr?: boolean
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAdresses: Address
  multiplier?: string
  isCommunity?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface PoolStyles {
  deprecated: any
  warning: any
  featured: any
  inactive: any
}

export interface PoolConfig {
  sousId: number
  image?: string
  tokenName: string
  stakingTokenName: string
  stakingLimit?: number
  bonusEndBlock?: number
  stakingTokenAddress?: Address
  contractAddress: Address
  poolCategory: PoolCategory
  projectLink: string
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  reflect?: boolean
  isFinished?: boolean
  tokenDecimals: number
  displayDecimals?: number
  lpStaking?: boolean
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type Attributes = {
  faceColor: string
  baseColor: string
  frames: string
  mouths: string
  eyes: string
  hats: string
  rarityScore: string
  rarityTierNumber: number
  rarityTierName: string
  rarityOverallRank: number
}

export type Nft = {
  index: number
  name: string
  image: string
  uri: string
  attributes: Attributes
}

export type NfaAttribute = {
  id: string
  occurance: number
  category: string
  uri: string
}

export type TeamImages = {
  alt: string
} & Images

export type Team = {
  id: number
  name: string
  description: string
  isJoinable?: boolean
  users: number
  points: number
  images: TeamImages
  background: string
  textColor: string
}

export type PageMeta = {
  title: string
  description?: string
  image?: string
}
