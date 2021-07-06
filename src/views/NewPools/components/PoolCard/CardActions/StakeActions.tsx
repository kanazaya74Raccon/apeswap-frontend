import React, { useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Flex, Heading, IconButtonSquare, AddIcon, MinusIcon, useModal, Text, ButtonSquare } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import { Pool } from 'state/types'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'

interface StakeActionsProps {
  pool: Pool
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  isBnbPool?: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
  isApproved?: boolean
  firstStake?: boolean
}

const IconButtonWrapper = styled.div`
  display: flex;
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
  width: 100%;
  margin-left: 117px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 30px;
  }
`

const StakeAction: React.FC<StakeActionsProps> = ({
  pool,
  stakingTokenBalance,
  stakedBalance,
  isApproved,
  firstStake,
  isBnbPool,
  isStaked,
  isLoading = false,
}) => {
  const TranslateString = useI18n()

  const { stakingTokenName, tokenDecimals, stakingLimit, sousId } = pool

  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()

  const rewardRefStake = useRef(null)
  const rewardRefUnstake = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const onStake = useReward(rewardRefStake, useSousStake(sousId).onStake)
  const onUnstake = useReward(rewardRefUnstake, useSousUnstake(sousId).onUnstake)

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={async (val) => {
        setTypeOfReward('rewardBanana')
        await onStake(val).catch(() => {
          setTypeOfReward('error')
          rewardRefStake.current?.rewardMe()
        })
      }}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
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
      tokenName={stakingTokenName}
    />,
  )

  const renderStakingButtons = () => {
    return (
      rawStakedBalance !== 0 && (
        <IconButtonWrapper>
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
        </IconButtonWrapper>
      )
    )
  }

  if (firstStake) {
    return <ButtonSquare onClick={onPresentDeposit}>{TranslateString(999, `Stake ${stakingTokenName}`)}</ButtonSquare>
  }

  return (
    <StyledFlex justifyContent="space-between" alignItems="center" mt="5px">
      <Flex flexDirection="column" alignItems="flex-start">
        <StyledText fontFamily="poppins">{TranslateString(999, 'Staked')}</StyledText>
        <StyledHeadingGreen color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>
          {displayBalance}
        </StyledHeadingGreen>
      </Flex>
      {isApproved && renderStakingButtons()}
    </StyledFlex>
  )
}

export default StakeAction
