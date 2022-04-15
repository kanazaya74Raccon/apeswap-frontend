import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import { Button } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import useReward from 'hooks/useReward'
import { useSousHarvest } from 'hooks/useHarvest'
import { useSousStake } from 'hooks/useStake'
import { useSousEmergencyWithdraw } from 'hooks/useUnstake'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  padding: 0px 10px;
`

interface HarvestActionsProps {
  earnings: BigNumber
  sousId: number
  earningTokenPrice?: number
  isBnbPool?: boolean
  isLoading?: boolean
  compound?: boolean
  emergencyWithdraw?: boolean
  tokenDecimals: number
}

const HarvestActions: React.FC<HarvestActionsProps> = ({
  earnings,
  tokenDecimals,
  sousId,
  compound,
  emergencyWithdraw,
}) => {
  const TranslateString = useI18n()
  const earningTokenBalance = getBalanceNumber(earnings, tokenDecimals)
  const rewardRef = useRef(null)
  const rewardRefApeHarder = useRef(null)
  const [pendingTx, setPendingTx] = useState(false)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')
  const { onHarvest } = useSousHarvest(sousId)
  const onApeHarder = useReward(rewardRefApeHarder, useSousStake(sousId).onStake)
  const onEmergencyWithdraw = useReward(rewardRef, useSousEmergencyWithdraw(sousId).onEmergencyWithdraw)

  const renderButton = () => {
    if (emergencyWithdraw) {
      return (
        <StyledButton
          disabled={earningTokenBalance === 0 || pendingTx}
          onClick={async () => {
            setPendingTx(true)
            setTypeOfReward('rewardBanana')
            await onEmergencyWithdraw().catch(() => {
              setTypeOfReward('error')
              rewardRefApeHarder.current?.rewardMe()
            })
            setPendingTx(false)
          }}
        >
          {TranslateString(999, 'WITHDRAW')}
        </StyledButton>
      )
    }
    if (compound) {
      return (
        <StyledButton
          disabled={earningTokenBalance === 0 || pendingTx}
          onClick={async () => {
            setPendingTx(true)
            setTypeOfReward('rewardBanana')
            await onApeHarder(earningTokenBalance).catch(() => {
              setTypeOfReward('error')
              rewardRefApeHarder.current?.rewardMe()
            })
            setPendingTx(false)
          }}
        >
          {TranslateString(999, 'APE HARDER')}
        </StyledButton>
      )
    }
    return (
      <StyledButton
        disabled={earningTokenBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          setTypeOfReward('rewardBanana')
          await onHarvest().catch(() => {
            setTypeOfReward('error')
            rewardRef.current?.rewardMe()
          })
          setPendingTx(false)
        }}
      >
        {TranslateString(999, 'HARVEST')}
      </StyledButton>
    )
  }

  return (
    <Reward ref={rewardRef} type="emoji" config={rewards[typeOfReward]}>
      {renderButton()}
    </Reward>
  )
}

export default HarvestActions
