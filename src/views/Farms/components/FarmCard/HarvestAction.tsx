import React, { useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const rewardRef = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')
  const [pendingTx, setPendingTx] = useState(false)
  const onReward = useReward(rewardRef, useHarvest(pid).onReward)

  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance.toLocaleString()

  return (
    <Reward ref={rewardRef} type="emoji" config={rewards[typeOfReward]}>
      <Flex mb="8px" justifyContent="space-between" alignItems="center">
        <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
        <Button
          disabled={rawEarningsBalance === 0 || pendingTx}
          onClick={async () => {
            setPendingTx(true)
            setTypeOfReward('rewardBanana')
            await onReward()
            .catch(() => {
              setTypeOfReward('error')
              rewardRef.current?.rewardMe()
            })
            setPendingTx(false)
          }}
        >
          {TranslateString(999, 'Harvest')}
        </Button>
      </Flex>
    </Reward>
  )
}

export default HarvestAction
