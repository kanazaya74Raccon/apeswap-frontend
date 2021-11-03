import React, { useState, useRef, useMemo, useCallback } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import { getContract } from 'utils/erc20'
import { useWeb3React } from '@web3-react/core'
import { useFarmUser, useFarmFromSymbol, useNetworkChainId } from 'state/hooks'

import { ButtonSquare, useModal } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { useApprove } from 'hooks/useApprove'
import useStake from 'hooks/useStake'
import { getBalanceNumber } from 'utils/formatBalance'

import DepositModal from '../DepositModal'

interface FarmCardActionsProps {
  earnings?: any
  pid?: number
  lpSymbol?: string
  addLiquidityUrl: string
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid, lpSymbol, addLiquidityUrl }) => {
  const { account, library } = useWeb3React()
  const TranslateString = useI18n()
  const rewardRef = useRef(null)
  const rewardRefPos = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')
  const onStake = useReward(rewardRefPos, useStake(pid).onStake)
  const [pendingTx, setPendingTx] = useState(false)
  const onReward = useReward(rewardRef, useHarvest(pid).onReward)
  const chainId = useNetworkChainId()

  const rawEarningsBalance = getBalanceNumber(earnings)

  const [requestedApproval, setRequestedApproval] = useState(false)
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)

  const { lpAddresses } = useFarmFromSymbol(lpSymbol)
  const lpAddress = lpAddresses[chainId]
  const lpContract = useMemo(() => {
    return getContract(library, lpAddress)
  }, [library, lpAddress])

  const lpName = lpSymbol.toUpperCase()

  const { onApprove } = useApprove(lpContract, pid)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const sucess = await onApprove()
      if (!sucess) setTypeOfReward('error')
      else setTypeOfReward('rewardBanana')
      setRequestedApproval(false)
      rewardRef.current?.rewardMe()
    } catch (e) {
      console.warn(e)
    }
  }, [onApprove])
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={async (val) => {
        setTypeOfReward('rewardBanana')
        await onStake(val).catch(() => {
          setTypeOfReward('error')
          rewardRefPos.current?.rewardMe()
        })
      }}
      tokenName={lpName}
      addLiquidityUrl={addLiquidityUrl}
    />,
  )

  const renderButton = () => {
    if (!isApproved) {
      return (
        <ButtonSquare disabled={requestedApproval} onClick={handleApprove}>
          {TranslateString(999, 'Enable')}
        </ButtonSquare>
      )
    }
    if (rawStakedBalance === 0) {
      return <ButtonSquare onClick={onPresentDeposit}>{TranslateString(999, 'Stake LP')}</ButtonSquare>
    }
    return (
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
    )
  }

  return (
    <Reward ref={rewardRef} type="emoji" config={rewards[typeOfReward]}>
      {renderButton()}
    </Reward>
  )
}

export default HarvestAction
