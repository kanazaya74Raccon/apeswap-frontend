import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, AutoRenewIcon } from '@apeswapfinance/uikit'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import { getFullDisplayBalance } from 'utils/formatBalance'
import UnderlinedButton from 'components/UnderlinedButton'
import { useTranslation } from 'contexts/Localization'

interface WithdrawModalProps {
  max: string
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, max, tokenName = '' }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(new BigNumber(max))
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title={`Unstake ${tokenName}`} onDismiss={onDismiss}>
      <ModalInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
        inputTitle={t('Unstake')}
      />
      <ModalActions>
        <Button
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            try {
              await onConfirm(val)
              onDismiss()
            } catch (e) {
              console.error('Transaction Failed')
            } finally {
              setPendingTx(false)
            }
          }}
          fullWidth
          endIcon={pendingTx && <AutoRenewIcon spin color="currentColor" />}
          style={{
            borderRadius: '10px',
          }}
        >
          {pendingTx ? t('Pending Confirmation') : t('Confirm')}
        </Button>
        <UnderlinedButton text={t('Cancel')} handleClick={onDismiss} />
      </ModalActions>
    </Modal>
  )
}

export default React.memo(WithdrawModal)
