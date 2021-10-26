import React, { useState, useRef, useMemo, useCallback } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import { getContract } from 'utils/erc20'
import { useWeb3React } from '@web3-react/core'
import { useFarmUser, useFarmFromSymbol, useNetworkChainId } from 'state/hooks'
import { DualFarm } from 'state/types'
import BigNumber from 'bignumber.js'
import { AutoRenewIcon, ButtonSquare, useModal } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest, useMiniChefHarvest } from 'hooks/useHarvest'
import { useApprove, useDualFarmApprove } from 'hooks/useApprove'
import useStake, { useDualFarmStake } from 'hooks/useStake'
import { getBalanceNumber } from 'utils/formatBalance'

import DepositModal from '../DepositModal'

interface DualFarmProps {
  dualFarm?: DualFarm
}

const HarvestAction: React.FC<DualFarmProps> = ({ dualFarm }) => {
  const { pid, stakeTokenAddress, stakeTokens } = dualFarm
  const { account, library } = useWeb3React()
  const TranslateString = useI18n()
  const onStake = useDualFarmStake(pid).onStake
  const [pendingTx, setPendingTx] = useState(false)
  const [stakeTx, setStakeTx] = useState(false)
  const onReward = useMiniChefHarvest(pid).onReward
  const chainId = useNetworkChainId()
  const lpSymbol = `${stakeTokens?.token0?.symbol}-${stakeTokens?.token1?.symbol}`

  const rawEarningsBalance = getBalanceNumber(dualFarm?.userData?.earnings)

  const [requestedApproval, setRequestedApproval] = useState(false)
  const lpContract = useMemo(() => {
    return getContract(library, stakeTokenAddress)
  }, [library, stakeTokenAddress])

  const lpName = lpSymbol.toUpperCase()

  const { onApprove } = useDualFarmApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
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
          {TranslateString(999, 'Enable')}
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
          {TranslateString(999, 'Stake LP')}
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
        {TranslateString(999, 'Harvest')}
      </ButtonSquare>
    )
  }

  return renderButton()
}

export default HarvestAction
