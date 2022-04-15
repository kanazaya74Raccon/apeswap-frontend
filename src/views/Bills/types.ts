import { Token } from 'config/constants/types'

export interface Bills {
  billType: string
  token: Token
  quoteToken: Token
  lpAddress?: string
  earnToken: Token
  price: number
  roi: number
  vestingTime: string
}
