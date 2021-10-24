import React, { useState, useRef, useMemo, useCallback } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import { getContract } from 'utils/erc20'
import { useWeb3React } from '@web3-react/core'
import { useFarmUser, useFarmFromSymbol, useNetworkChainId } from 'state/hooks'
import { DualFarm } from 'state/types'
import BigNumber from 'bignumber.js'
import { ButtonSquare, useModal } from '@apeswapfinance/uikit'
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
  const rewardRef = useRef(null)
  const rewardRefPos = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')
  const onStake = useReward(rewardRefPos, useDualFarmStake(pid).onStake)
  const [pendingTx, setPendingTx] = useState(false)
  const onReward = useReward(rewardRef, useMiniChefHarvest(pid).onReward)
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
      const sucess = await onApprove()
      if (!sucess) setTypeOfReward('error')
      else setTypeOfReward('rewardBanana')
      setRequestedApproval(false)
      rewardRef.current?.rewardMe()
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
        setTypeOfReward('rewardBanana')
        await onStake(val).catch((e) => {
          console.log(e)
          setTypeOfReward('error')
          rewardRefPos.current?.rewardMe()
        })
      }}
      tokenName={lpName}
      addLiquidityUrl=""
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
