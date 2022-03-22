import React, { useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import styled from 'styled-components'
import { Button, useModal, IconButton, AddIcon, MinusIcon } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import { useFarmUser } from 'state/hooks'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import useI18n from 'hooks/useI18n'
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

const StyledIconButton = styled(IconButton)`
  width: 34px;
  height: 34px;
`
const StyledButton = styled(Button)`
  font-weight: 800;
`

const Staked: React.FunctionComponent<FarmWithStakedValue> = ({ pid, lpSymbol, addLiquidityUrl }) => {
  const TranslateString = useI18n()

  const rewardRefPos = useRef(null)
  const rewardRefNeg = useRef(null)

  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const onStake = useReward(rewardRefPos, useStake(pid).onStake)
  const onUnstake = useReward(rewardRefNeg, useUnstake(pid).onUnstake)

  const { account } = useWeb3React()
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)

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
        <StyledButton onClick={onPresentDeposit}>{TranslateString(999, 'STAKE LP')}</StyledButton>
      </IconButtonWrapper>
    ) : (
      <IconButtonWrapperStake>
        <Reward ref={rewardRefNeg} type="emoji" config={rewards[typeOfReward]}>
          <StyledIconButton onClick={onPresentWithdraw} mr="6px">
            <MinusIcon color="white" width="12px" height="12px" />
          </StyledIconButton>
        </Reward>
        <Reward ref={rewardRefPos} type="emoji" config={rewards[typeOfReward]}>
          <StyledIconButton onClick={onPresentDeposit}>
            <AddIcon color="white" width="16px" height="16px" />
          </StyledIconButton>
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

  return null
}

export default Staked
