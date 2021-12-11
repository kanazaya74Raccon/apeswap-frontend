import React, { useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import { ButtonSquare } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import useReward from 'hooks/useReward'
import { useNfaStakingHarvest } from 'hooks/useHarvest'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'

interface HarvestActionsProps {
  earnings: BigNumber
  sousId: number
  earningTokenPrice?: number
  isBnbPool?: boolean
  isLoading?: boolean
  emergencyWithdraw?: boolean
  tokenDecimals: number
}

const HarvestActions: React.FC<HarvestActionsProps> = ({ earnings, tokenDecimals, sousId }) => {
  const TranslateString = useI18n()
  const earningTokenBalance = getBalanceNumber(earnings, tokenDecimals)
  const rewardRef = useRef(null)
  const [pendingTx, setPendingTx] = useState(false)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')
  const onReward = useReward(rewardRef, useNfaStakingHarvest(sousId).onReward)

  const renderButton = () => {
    return (
      <ButtonSquare
        disabled={earningTokenBalance === 0 || pendingTx}
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
        {TranslateString(999, 'HARVEST')}
      </ButtonSquare>
    )
  }

  return (
    <Reward ref={rewardRef} type="emoji" config={rewards[typeOfReward]}>
      {renderButton()}
    </Reward>
  )
}

export default HarvestActions
