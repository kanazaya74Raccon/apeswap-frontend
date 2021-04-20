import React from 'react'
import styled from 'styled-components'
import { Modal, Text, Button } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  amount: number
}

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`

const ConfirmModal: React.FC<ApyCalculatorModalProps> = ({ onDismiss, amount }) => {
  const TranslateString = useI18n()

  return (
    <Modal title="CONFIRM" onDismiss={onDismiss}>
      <Description fontSize="12px" color="textSubtle">
        {TranslateString(999, 'Buying Golden Banana has a 30% cost.')}
      </Description>
      <Description fontSize="12px" color="textSubtle">
        Pay {amount} for {amount * 0.7}
      </Description>
      <Button>Confirm</Button>
    </Modal>
  )
}

export default ConfirmModal
