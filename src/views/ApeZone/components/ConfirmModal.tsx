import React from 'react'
import { Modal, Button } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'

import { Description } from './styles'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  amount: number
}

const ConfirmModal: React.FC<ApyCalculatorModalProps> = ({ onDismiss, amount }) => {
  const { t } = useTranslation()

  return (
    <Modal title="CONFIRM" onDismiss={onDismiss}>
      <Description fontSize="12px" color="textSubtle">
        {t('Buying Golden Banana has a 30% cost.')}
      </Description>
      <Description fontSize="12px" color="textSubtle">
        {t('Pay %amount$ for %foramount%', { amount, foramount: amount * 0.7 })}
      </Description>
      <Button>{t('Confirm')}</Button>
    </Modal>
  )
}

export default ConfirmModal
