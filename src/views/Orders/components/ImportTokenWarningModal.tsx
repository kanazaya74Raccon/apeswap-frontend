import React from 'react'
import { Token } from '@apeswapfinance/sdk'
import { Modal, ModalProps } from '@apeswapfinance/uikit'
import ImportToken from 'components/SearchModal/ImportToken'
import { useTranslation } from 'contexts/Localization'

interface Props extends ModalProps {
  tokens: Token[]
  onCancel: () => void
}

const ImportTokenWarningModal: React.FC<Props> = ({ tokens, onDismiss, onCancel }) => {
  const { t } = useTranslation()
  return (
    <Modal
      title={t('Import Token')}
      onDismiss={() => {
        if (onDismiss) {
          onDismiss()
        }
        onCancel()
      }}
    >
      <ImportToken tokens={tokens} handleCurrencySelect={onDismiss} />
    </Modal>
  )
}

export default ImportTokenWarningModal
