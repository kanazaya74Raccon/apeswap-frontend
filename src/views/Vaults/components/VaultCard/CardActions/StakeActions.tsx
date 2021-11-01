import React, { useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import {
  Flex,
  Heading,
  IconButtonSquare,
  AddIcon,
  MinusIcon,
  useModal,
  Text,
  ButtonSquare,
} from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useSousStake, useVaultStake } from 'hooks/useStake'
import { useSousUnstake, useVaultUnstake, useVaultUnstakeAll } from 'hooks/useUnstake'
import { Pool, Vault } from 'state/types'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'

interface StakeActionsProps {
  vault: Vault
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  isBnbPool?: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
  isApproved?: boolean
  firstStake?: boolean
  isHeader?: boolean
}

const IconButtonWrapperStake = styled.div`
  display: flex;
  justify-content: flex-start;
`

const IconButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledIconButtonSquare = styled(IconButtonSquare)`
  width: 34px;
  height: 34px;
`

const StyledHeadingGreen = styled(Heading)`
  font-size: 14px;
  color: #38a611;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
    color: #38a611;
  }
`

const StyledText = styled(Text)`
  font-weight: bold;
  font-size: 12px;
`

const StyledFlex = styled(Flex)`
  position: absolute;
  right: 40px;
  width: 210px;
  top: 25px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 5px;
    top: 75px;
  }
`

const StakeAction: React.FC<StakeActionsProps> = ({
  vault,
  stakingTokenBalance,
  stakedBalance,
  isApproved,
  firstStake,
  isHeader,
}) => {
  const TranslateString = useI18n()

  const { stakeTokenAddress, pid, token0, token1 } = vault

  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()

  const rewardRefStake = useRef(null)
  const rewardRefUnstake = useRef(null)
  const rewardRefUnstakeAll = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const onStake = useReward(rewardRefStake, useVaultStake(pid).onStake)
  const onUnstake = useReward(rewardRefUnstake, useVaultUnstake(pid).onUnstake)
  const onUnstakeAll = useReward(rewardRefUnstakeAll, useVaultUnstakeAll(pid).onUnstakeAll)

  const convertedLimit = new BigNumber(stakingTokenBalance)

  const lpLabel = vault.isPair ? `${vault.token0.symbol}-${vault.token1.symbol}` : vault.token0.symbol

  const isLoading = !vault.userData

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={async (val) => {
        setTypeOfReward('rewardBanana')
        await onStake(val).catch(() => {
          setTypeOfReward('error')
          rewardRefStake.current?.rewardMe()
        })
      }}
      tokenName={lpLabel}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={async (val) => {
        const maxWithdraw = val === getFullDisplayBalance(stakedBalance)
        setTypeOfReward('removed')
        if (maxWithdraw) {
          await onUnstakeAll().catch(() => {
            setTypeOfReward('error')
            rewardRefUnstakeAll.current?.rewardMe()
          })
        } else {
          await onUnstake(val).catch(() => {
            setTypeOfReward('error')
            rewardRefUnstake.current?.rewardMe()
          })
        }
      }}
      tokenName={lpLabel}
    />,
  )

  const renderStakingButtons = () => {
    return (
      <IconButtonWrapperStake>
        <Reward ref={rewardRefUnstake} type="emoji" config={rewards[typeOfReward]}>
          <StyledIconButtonSquare onClick={onPresentWithdraw} mr="6px">
            <MinusIcon color="white" width="12px" height="12px" />
          </StyledIconButtonSquare>
        </Reward>
        <Reward ref={rewardRefStake} type="emoji" config={rewards[typeOfReward]}>
          <StyledIconButtonSquare onClick={onPresentDeposit}>
            <AddIcon color="white" width="16px" height="16px" />
          </StyledIconButtonSquare>
        </Reward>
      </IconButtonWrapperStake>
    )
  }

  return (
    <StyledFlex justifyContent="flex-end">
      {isApproved && <IconButtonWrapper>{renderStakingButtons()}</IconButtonWrapper>}
    </StyledFlex>
  )
}

export default StakeAction
