import { ERC20DetailsReturned } from 'hooks/useERC20Details'

export interface SaleInformation {
  website: string
  whitepaper: string
  twitter: string
  telegram: string
  medium: string
  description: string
  tokenLogo: File
}

export interface DateObject {
  start: Date
  end: Date
}

export interface ExtendedERC20Details extends ERC20DetailsReturned {
  tokenAddress: string
  quoteToken: string
}

export interface LiquidityLockDetails {
  liquidityPercent: number
  listingPrice: string
  lockLiquidity: number
}

export interface TokenSaleDetails {
  tokensForSale: string
  pricePerToken: string
  limitPerUser: string
  softcap: string
  burnRemains: boolean
}

export interface PresaleData {
  pairCreation: ExtendedERC20Details
  datesSelected: DateObject
  presaleTokenDetails: TokenSaleDetails
  postsaleDetails: LiquidityLockDetails
  information: SaleInformation
}
