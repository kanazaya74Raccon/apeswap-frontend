import React from 'react'
import { useModal } from '@apeswapfinance/uikit'
import { Bills } from 'state/types'
import BuyBillModalView from './BuyBillModalView'
import { StyledButton } from '../styles'
import UserBillModalView from './UserBillModalView'
import { BillsImage } from '../UserBillViews/styles'

interface BillModalProps {
  bill: Bills
  buttonText?: string
  id?: number
  billId?: string
  buttonSize?: number
  buyFlag?: boolean
  billCardImage?: string
  disabled?: boolean
}

const BillModal: React.FC<BillModalProps> = ({
  buttonText,
  bill,
  id,
  buttonSize,
  buyFlag,
  billId,
  billCardImage,
  disabled,
}) => {
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
  return !billCardImage ? (
    <StyledButton
      onClick={buyFlag ? onPresentBuyBillsModal : onPresentUserBillModal}
      buttonSize={buttonSize}
      disabled={disabled}
    >
      {buttonText}
    </StyledButton>
  ) : (
    <BillsImage image={billCardImage} onClick={onPresentUserBillModal} style={{ cursor: 'pointer' }} />
  )
}

export default React.memo(BillModal)
