import React from 'react'
import { useModal } from '@apeswapfinance/uikit'
import { Bills } from 'state/types'
import BuyBillModalView from './BuyBillModalView'
import { StyledButton } from '../styles'
import UserBillModalView from './UserBillModalView'

interface BillModalProps {
  buttonText: string
  bill: Bills
  id?: number
  billId?: string
  buttonSize?: number
  buyFlag?: boolean
}

const BillModal: React.FC<BillModalProps> = ({ buttonText, bill, id, buttonSize, buyFlag, billId }) => {
  const [onPresentBuyBillsModal] = useModal(
    <BuyBillModalView bill={bill} onDismiss={null} />,
    true,
    true,
    `billsModal${id}`,
  )
  const [onPresentUserBillModal] = useModal(
    <UserBillModalView bill={bill} billId={billId} onDismiss={null} />,
    true,
    true,
    `billsModal${bill.billNftAddress}-${billId}`,
  )
  return (
    <StyledButton onClick={buyFlag ? onPresentBuyBillsModal : onPresentUserBillModal} buttonSize={buttonSize}>
      {buttonText}
    </StyledButton>
  )
}

export default React.memo(BillModal)
