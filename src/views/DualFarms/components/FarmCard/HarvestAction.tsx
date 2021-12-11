import React, { useState, useRef, useMemo, useCallback } from 'react'
import { getContract } from 'utils/erc20'
import { useWeb3React } from '@web3-react/core'
import { DualFarm } from 'state/types'
import BigNumber from 'bignumber.js'
import { AutoRenewIcon, ButtonSquare, useModal } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useMiniChefHarvest } from 'hooks/useHarvest'
import { useDualFarmApprove } from 'hooks/useApprove'
import { useDualFarmStake } from 'hooks/useStake'
import { getBalanceNumber } from 'utils/formatBalance'

import DepositModal from '../DepositModal'

interface DualFarmProps {
  dualFarm?: DualFarm
}

const HarvestAction: React.FC<DualFarmProps> = ({ dualFarm }) => {
  const { pid, stakeTokenAddress, stakeTokens } = dualFarm
  const { account, library } = useWeb3React()
  const TranslateString = useI18n()
  const rewardRef = useRef(null)
  const { onStake } = useDualFarmStake(pid)
  const [pendingTx, setPendingTx] = useState(false)
  const [stakeTx, setStakeTx] = useState(false)
  const { onReward } = useMiniChefHarvest(pid)
  const lpSymbol = `${stakeTokens?.token0?.symbol}-${stakeTokens?.token1?.symbol}`

  const rawEarningsBalance = getBalanceNumber(dualFarm?.userData?.miniChefEarnings)

  const [requestedApproval, setRequestedApproval] = useState(false)
  const lpContract = useMemo(() => {
    return getContract(library, stakeTokenAddress)
  }, [library, stakeTokenAddress])

  const lpName = lpSymbol.toUpperCase()

  const { onApprove } = useDualFarmApprove(lpContract, pid)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
      rewardRef.current?.rewardMe()
    } catch (e) {
      console.warn(e)
    }
  }, [onApprove])

  const isApproved =
    account && dualFarm?.userData?.allowance && new BigNumber(dualFarm?.userData?.allowance).isGreaterThan(0)
  const rawStakedBalance = getBalanceNumber(dualFarm?.userData?.stakedBalance)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={new BigNumber(dualFarm?.userData?.tokenBalance)}
      onConfirm={async (val) => {
        setStakeTx(true)
        await onStake(val)
        setStakeTx(false)
      }}
      tokenName={lpName}
      addLiquidityUrl=""
    />,
  )

  const renderButton = () => {
    if (!isApproved) {
      return (
        <ButtonSquare
          disabled={requestedApproval}
          onClick={handleApprove}
          endIcon={requestedApproval && <AutoRenewIcon spin color="currentColor" />}
        >
          {TranslateString(999, 'ENABLE')}
        </ButtonSquare>
      )
    }
    if (rawStakedBalance === 0) {
      return (
        <ButtonSquare
          disabled={stakeTx}
          onClick={onPresentDeposit}
          endIcon={stakeTx && <AutoRenewIcon spin color="currentColor" />}
        >
          {TranslateString(999, 'STAKE LP')}
        </ButtonSquare>
      )
    }
    return (
      <ButtonSquare
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
        endIcon={pendingTx && <AutoRenewIcon spin color="currentColor" />}
      >
        {TranslateString(999, 'HARVEST')}
      </ButtonSquare>
    )
  }

  return renderButton()
}

export default HarvestAction
