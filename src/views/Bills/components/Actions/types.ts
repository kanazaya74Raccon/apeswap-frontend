import { Token } from 'config/constants/types'

export interface BuyProps {
  userLpValue: string
  token: Token
  quoteToken: Token
  billAddress: string
  onValueChange: (val: string) => void
}

export interface ApproveProps {
  billAddress: string
  billIndex: number
  lpToken: Token
}

export interface ClaimProps {
  billAddress: string
  billId: string
  buttonSize?: number
}

export interface ActionProps extends BuyProps, ApproveProps {
  allowance: string
}
