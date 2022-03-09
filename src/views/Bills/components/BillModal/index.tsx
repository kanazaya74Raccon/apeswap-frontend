import React from 'react'
import { Flex, Modal, Text, useModal } from '@apeswapfinance/uikit'
import { Bills } from 'state/types'
import BillModalView from './BillModalView'
import { StyledButton } from '../styles'

interface BillModalProps {
  buttonText: string
  bill: Bills
}

const BillModal: React.FC<BillModalProps> = ({ buttonText, bill }) => {
  const [onPresentBillsModal] = useModal(<BillModalView bill={bill} onDismiss={() => console.log('')} />)
  return <StyledButton onClick={onPresentBillsModal}>{buttonText}</StyledButton>
}

export default React.memo(BillModal)
