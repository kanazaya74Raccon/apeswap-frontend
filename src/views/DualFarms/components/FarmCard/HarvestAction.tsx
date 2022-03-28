import React, { useState, useRef, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { getContract } from 'utils'
import erc20 from 'config/abi/erc20.json'
import { DualFarm } from 'state/types'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { AutoRenewIcon, Button, useModal } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { useMiniChefHarvest } from 'hooks/useHarvest'
import { useDualFarmApprove } from 'hooks/useApprove'
import { useDualFarmStake } from 'hooks/useStake'
import { getBalanceNumber } from 'utils/formatBalance'

import DepositModal from '../DepositModal'

const StyledButton = styled(Button)`
  font-weight: 600;
`

interface DualFarmProps {
  dualFarm?: DualFarm
}

const HarvestAction: React.FC<DualFarmProps> = ({ dualFarm }) => {
  const { pid, stakeTokenAddress, stakeTokens } = dualFarm
  const { library, account } = useActiveWeb3React()
  const { t } = useTranslation()
  const rewardRef = useRef(null)
  const { onStake } = useDualFarmStake(pid)
  const [pendingTx, setPendingTx] = useState(false)
  const [stakeTx, setStakeTx] = useState(false)
  const { onReward } = useMiniChefHarvest(pid)
  const lpSymbol = `${stakeTokens?.token0?.symbol}-${stakeTokens?.token1?.symbol}`

  const rawEarningsBalance = getBalanceNumber(dualFarm?.userData?.miniChefEarnings)

  const [requestedApproval, setRequestedApproval] = useState(false)
  const lpContract = useMemo(() => {
    return getContract(stakeTokenAddress, erc20, library, account)
  }, [stakeTokenAddress, library, account])

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
        <StyledButton
          disabled={requestedApproval}
          onClick={handleApprove}
          endIcon={requestedApproval && <AutoRenewIcon spin color="currentColor" />}
        >
          {t('ENABLE')}
        </StyledButton>
      )
    }
    if (rawStakedBalance === 0) {
      return (
        <StyledButton
          disabled={stakeTx}
          onClick={onPresentDeposit}
          endIcon={stakeTx && <AutoRenewIcon spin color="currentColor" />}
        >
          {t('STAKE LP')}
        </StyledButton>
      )
    }
    return (
      <StyledButton
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
        endIcon={pendingTx && <AutoRenewIcon spin color="currentColor" />}
      >
        {t('HARVEST')}
      </StyledButton>
    )
  }

  return renderButton()
}

export default HarvestAction
