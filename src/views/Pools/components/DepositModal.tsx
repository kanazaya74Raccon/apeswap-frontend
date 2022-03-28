import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, AutoRenewIcon, LinkExternal } from '@apeswapfinance/uikit'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import UnderlinedButton from 'components/UnderlinedButton'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import { useTranslation } from '../../../contexts/Localization'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  addLiquidityUrl?: string
}

const DepositModal: React.FC<DepositModalProps> = ({ max, onConfirm, onDismiss, tokenName = '', addLiquidityUrl }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
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
    <Modal title={`${t('Deposit')} ${tokenName} ${t('Tokens')}`} onDismiss={onDismiss}>
      <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        addLiquidityUrl={addLiquidityUrl}
      />
      <ModalActions>
        <Button
          fullWidth
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
          endIcon={pendingTx && <AutoRenewIcon spin color="currentColor" />}
          style={{
            borderRadius: '10px',
          }}
        >
          {pendingTx ? t('Pending Confirmation') : t('Confirm')}
        </Button>
        <UnderlinedButton text={t('Cancel')} handleClick={onDismiss} />
      </ModalActions>
      <LinkExternal href={addLiquidityUrl} style={{ alignSelf: 'center' }}>
        {t('Get')} {tokenName}
      </LinkExternal>
    </Modal>
  )
}

export default DepositModal
