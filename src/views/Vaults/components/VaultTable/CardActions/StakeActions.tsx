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
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousStake, useVaultStake } from 'hooks/useStake'
import { useSousUnstake, useVaultUnstake } from 'hooks/useUnstake'
import { Pool, Vault } from 'state/types'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import HarvestActions from './HarvestActions'

interface StakeActionsProps {
  vault: Vault
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  isBnbPool?: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
  isApproved?: boolean
  firstStake?: boolean
}

const IconButtonWrapperStake = styled.div`
  display: flex;
  justify-content: flex-start;
`

const HarvestWrapper = styled.div`
  margin-right: 6px;
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
  right: 45px;
  width: 225px;
  margin-left: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 30px;
  }
`

const StakeAction: React.FC<StakeActionsProps> = ({
  vault,
  stakingTokenBalance,
  stakedBalance,
  isApproved,
  firstStake,
}) => {
  const TranslateString = useI18n()

  const { stakeTokenAddress, pid, token0, token1 } = vault

  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()

  const rewardRefStake = useRef(null)
  const rewardRefUnstake = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const onStake = useReward(rewardRefStake, useVaultStake(pid).onStake)
  const onUnstake = useReward(rewardRefUnstake, useVaultUnstake(pid).onUnstake)

  const convertedLimit = new BigNumber(0)

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
      tokenName={`${token0.symbol}-${token1.symbol}`}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={async (val) => {
        setTypeOfReward('removed')
        await onUnstake(val).catch(() => {
          setTypeOfReward('error')
          rewardRefUnstake.current?.rewardMe()
        })
      }}
      tokenName={`${token0.symbol}-${token1.symbol}`}
    />,
  )

  const renderStakingButtons = () => {
    return (
      rawStakedBalance !== 0 && (
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
    )
  }

  if (firstStake) {
    return (
      <ButtonSquare onClick={onPresentDeposit}>
        {TranslateString(999, `Stake ${token0.symbol}-${token1.symbol}`)}
      </ButtonSquare>
    )
  }

  return (
    <StyledFlex justifyContent="space-between">
      <Flex flexDirection="column" justifyContent="space-between" marginRight="6px">
        <StyledText fontFamily="poppins">{TranslateString(999, 'Staked')}</StyledText>
        <StyledHeadingGreen color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>
          {displayBalance}
        </StyledHeadingGreen>
      </Flex>
      {isApproved && <IconButtonWrapper>{renderStakingButtons()}</IconButtonWrapper>}
    </StyledFlex>
  )
}

export default StakeAction
