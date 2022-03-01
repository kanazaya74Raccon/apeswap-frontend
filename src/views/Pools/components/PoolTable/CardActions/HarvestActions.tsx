import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import { ButtonSquare } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import useReward from 'hooks/useReward'
import { useSousHarvest } from 'hooks/useHarvest'
import { useSousStake } from 'hooks/useStake'
import { useSousEmergencyWithdraw } from 'hooks/useUnstake'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'

const StyledButtonSquare = styled(ButtonSquare)`
  font-weight: 600;

  &:hover {
    background-color: #ffd54fff !important;
  }
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
  const onReward = useReward(rewardRef, useSousHarvest(sousId).onReward)
  const onApeHarder = useReward(rewardRefApeHarder, useSousStake(sousId).onStake)
  const onEmergencyWithdraw = useReward(rewardRef, useSousEmergencyWithdraw(sousId).onEmergencyWithdraw)

  const renderButton = () => {
    if (emergencyWithdraw) {
      return (
        <StyledButtonSquare
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
        </StyledButtonSquare>
      )
    }
    if (compound) {
      return (
        <StyledButtonSquare
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
        </StyledButtonSquare>
      )
    }
    return (
      <StyledButtonSquare
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
      </StyledButtonSquare>
    )
  }

  return (
    <Reward ref={rewardRef} type="emoji" config={rewards[typeOfReward]}>
      {renderButton()}
    </Reward>
  )
}

export default HarvestActions
