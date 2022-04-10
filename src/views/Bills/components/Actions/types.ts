import { Token } from 'config/constants/types'

export interface BuyProps {
  userLpValue: string
  token: Token
  quoteToken: Token
  billAddress: string
  onValueChange: (val: string) => void
  onBillId: (billId: string, transactionHash: string) => void
}

export interface ApproveProps {
  billAddress: string
  billIndex: number
  lpToken: Token
}

export interface ClaimProps {
  billAddress: string
  billIds: string[]
  buttonSize?: number
}

export interface TransferProps {
  billNftAddress: string
  billId: string
  toAddress: string
  disabled?: boolean
}

export interface ActionProps extends BuyProps, ApproveProps {
  allowance: string
}
