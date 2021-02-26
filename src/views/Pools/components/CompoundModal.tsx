import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import React, { useMemo, useState, useRef } from 'react'
import Reward from 'react-rewards'
import { Button, Modal } from '@apeswapfinance/uikit'
import ModalActions from 'components/ModalActions'
import Balance from 'components/Balance'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'

interface DepositModalProps {
  earnings: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
}

const CompoundModal: React.FC<DepositModalProps> = ({ earnings, onConfirm, onDismiss, tokenName = '' }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(earnings)
  }, [earnings])

  const rewardRef = useRef(null)
  const config = {
    fakingRequest: false,
    angle: 90,
    decay: 0.91,
    spread: 100,
    startVelocity: 20,
    elementCount: 15,
    elementSize: 20,
    lifetime: 200,
    zIndex: 10,
    springAnimation: true,
    rewardPunish: 'reward',
    type: 'emoji',
    emoji: ['🍌', '🙈', '🍌', '🙉', '🍌', '🙊'],
  }

  return (
    <Modal
      title={`${TranslateString(999, 'Compound')} ${TranslateString(330, `${tokenName} Earned`)}`}
      onDismiss={onDismiss}
    >
      <Reward ref={rewardRef} type="emoji" config={config}>
        <BalanceRow>
          <Balance value={Number(fullBalance)} />
        </BalanceRow>
        <ModalActions>
          <Button fullWidth variant="secondary" onClick={onDismiss}>
            {TranslateString(462, 'Cancel')}
          </Button>
          <Button
            id="compound-banana"
            fullWidth
            disabled={pendingTx}
            onClick={async () => {
              setPendingTx(true)
              await onConfirm(fullBalance)
              // rewardRef.current?.rewardMe();
              setPendingTx(false)
              /* eslint-disable no-debugger */
              // debugger;
              /* eslint-enable no-debugger */
              rewardRef.current?.rewardMe()
              setTimeout(() => {
                onDismiss()
              }, 1000)
            }}
          >
            {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
          </Button>
        </ModalActions>
      </Reward>
    </Modal>
  )
}

export default CompoundModal

const BalanceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`
