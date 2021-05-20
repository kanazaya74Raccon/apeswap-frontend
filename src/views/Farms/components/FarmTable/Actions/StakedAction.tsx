import React, { useState, useCallback, useRef, useMemo } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import styled from 'styled-components'
import { Button, ButtonSquare, useModal, IconButtonSquare, AddIcon, MinusIcon } from '@apeswapfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { useFarmUser } from 'state/hooks'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import useI18n from 'hooks/useI18n'
import { useApprove } from 'hooks/useApprove'
import { getBalanceNumber } from 'utils/formatBalance'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'

import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'

const IconButtonWrapperStake = styled.div`
  display: flex;
  justify-content: flex-start;
`

const IconButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 67px;
`

const StyledIconButtonSquare = styled(IconButtonSquare)`
  width: 34px;
  height: 34px;
`

const Staked: React.FunctionComponent<FarmWithStakedValue> = ({ pid, lpSymbol, lpAddresses, addLiquidityUrl }) => {
  const TranslateString = useI18n()

  const rewardRefPos = useRef(null)
  const rewardRefNeg = useRef(null)
  const rewardRef = useRef(null)

  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const onStake = useReward(rewardRefPos, useStake(pid).onStake)
  const onUnstake = useReward(rewardRefNeg, useUnstake(pid).onUnstake)

  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)

  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpAddress)
  }, [ethereum, lpAddress])

  const { onApprove } = useApprove(lpContract)

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
      tokenName={lpSymbol}
      addLiquidityUrl={addLiquidityUrl}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={async (val) => {
        setTypeOfReward('removed')
        await onUnstake(val).catch(() => {
          setTypeOfReward('error')
          rewardRefNeg.current?.rewardMe()
        })
      }}
      tokenName={lpSymbol}
    />,
  )

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <IconButtonWrapper>
        <Button onClick={onPresentDeposit}>{TranslateString(999, 'Stake LP')}</Button>
      </IconButtonWrapper>
    ) : (
      <IconButtonWrapperStake>
        <Reward ref={rewardRefNeg} type="emoji" config={rewards[typeOfReward]}>
          <StyledIconButtonSquare onClick={onPresentWithdraw} mr="6px">
            <MinusIcon color="white" width="12px" height="12px" />
          </StyledIconButtonSquare>
        </Reward>
        <Reward ref={rewardRefPos} type="emoji" config={rewards[typeOfReward]}>
          <StyledIconButtonSquare onClick={onPresentDeposit}>
            <AddIcon color="white" width="16px" height="16px" />
          </StyledIconButtonSquare>
        </Reward>
      </IconButtonWrapperStake>
    )
  }

  if (!account) {
    return null
  }

  if (isApproved) {
    if (rawStakedBalance) {
      return <IconButtonWrapper>{renderStakingButtons()}</IconButtonWrapper>
    }

    return null
  }

  return (
    <IconButtonWrapper>
      <ButtonSquare disabled={requestedApproval} onClick={handleApprove}>
        {TranslateString(999, 'Enable')}
      </ButtonSquare>
    </IconButtonWrapper>
  )
}

export default Staked
