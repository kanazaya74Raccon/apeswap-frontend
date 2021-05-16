import React, { useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import { ButtonSquare } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'

interface FarmCardActionsProps {
  earnings?: any
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const rewardRef = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')
  const [pendingTx, setPendingTx] = useState(false)
  const onReward = useReward(rewardRef, useHarvest(pid).onReward)

  const rawEarningsBalance = getBalanceNumber(earnings)

  return (
    <Reward ref={rewardRef} type="emoji" config={rewards[typeOfReward]}>
      <ButtonSquare
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          setTypeOfReward('rewardBanana')
          await onReward().catch(() => {
            setTypeOfReward('error')
            rewardRef.current?.rewardMe()
          })
          setPendingTx(false)
        }}
      >
        {TranslateString(999, 'Harvest')}
      </ButtonSquare>
    </Reward>
  )
}

export default HarvestAction
