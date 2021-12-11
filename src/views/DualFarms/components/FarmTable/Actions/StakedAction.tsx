import React, { useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import styled from 'styled-components'
import { Button, useModal, IconButtonSquare, AddIcon, MinusIcon } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import { DualFarm } from 'state/types'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { useDualFarmStake } from 'hooks/useStake'
import { useMiniChefUnstake } from 'hooks/useUnstake'
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

const Staked: React.FunctionComponent<DualFarm> = ({ pid, stakeTokens, userData }) => {
  const TranslateString = useI18n()

  const rewardRefPos = useRef(null)
  const rewardRefNeg = useRef(null)

  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const onStake = useReward(rewardRefPos, useDualFarmStake(pid).onStake)
  const onUnstake = useReward(rewardRefNeg, useMiniChefUnstake(pid).onUnstake)

  const { account } = useWeb3React()

  const stakedBalance = userData?.stakedBalance
  const tokenBalance = userData?.tokenBalance
  const isApproved = account && userData?.allowance && new BigNumber(userData?.allowance).isGreaterThan(0)
  const lpLabel = `${stakeTokens?.token0?.symbol}-${stakeTokens?.token1?.symbol}`

  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={new BigNumber(tokenBalance)}
      onConfirm={async (val) => {
        setTypeOfReward('rewardBanana')
        await onStake(val).catch(() => {
          setTypeOfReward('error')
          rewardRefPos.current?.rewardMe()
        })
      }}
      tokenName={lpLabel}
      addLiquidityUrl=""
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={new BigNumber(stakedBalance)}
      onConfirm={async (val) => {
        setTypeOfReward('removed')
        await onUnstake(val).catch(() => {
          setTypeOfReward('error')
          rewardRefNeg.current?.rewardMe()
        })
      }}
      tokenName={lpLabel}
    />,
  )

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <IconButtonWrapper>
        <Button onClick={onPresentDeposit} fontFamily="Titan One">
          {TranslateString(999, 'STAKE LP')}
        </Button>
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

  return null
}

export default Staked
