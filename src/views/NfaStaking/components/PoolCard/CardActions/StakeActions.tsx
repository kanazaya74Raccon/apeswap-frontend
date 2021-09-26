import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { NfaStakingPool } from 'state/types'
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
import { useNfaStake, useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import HarvestActions from './HarvestActions'

interface StakeActionsProps {
  pool: NfaStakingPool
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  tier: number
  isBnbPool?: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
  isApproved?: boolean
  firstStake?: boolean
}

const IconButtonWrapper = styled.div`
  display: flex;
`

const HarvestWrapper = styled.div`
  margin-right: 6px;
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
  margin-right: 35px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 217px;
  }
`

const StakeAction: React.FC<StakeActionsProps> = ({ pool, stakedBalance, isApproved, firstStake, tier }) => {
  const TranslateString = useI18n()

  const { sousId } = pool

  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()
  const earnings = new BigNumber(pool.userData?.pendingReward || 0)
  const isLoading = !pool.userData

  const onStake = useNfaStake(sousId).onStake
  // const onUnstake = useReward(rewardRefUnstake, useSousUnstake(sousId).onUnstake)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={new BigNumber(2)}
      onConfirm={async (val) => {
        await onStake(val)
      }}
      tokenName="nfa"
      tier={tier}
    />,
  )

  const [onPresentWithdraw] = useModal(
    // <WithdrawModal
    //   max={stakedBalance}
    //   onConfirm={async (val) => {
    //     setTypeOfReward('removed')
    //     await onUnstake(val).catch(() => {
    //       setTypeOfReward('error')
    //       rewardRefUnstake.current?.rewardMe()
    //     })
    //   }}
    //   tokenName="nfa"
    // />,
    <></>,
  )

  const renderStakingButtons = () => {
    return (
      rawStakedBalance !== 0 && (
        <IconButtonWrapper>
          {sousId === 0 && (
            <HarvestWrapper>
              <HarvestActions earnings={earnings} sousId={sousId} isLoading={isLoading} tokenDecimals={18} />
            </HarvestWrapper>
          )}
          <StyledIconButtonSquare onClick={onPresentWithdraw} mr="6px">
            <MinusIcon color="white" width="12px" height="12px" />
          </StyledIconButtonSquare>
          <StyledIconButtonSquare onClick={onPresentDeposit}>
            <AddIcon color="white" width="16px" height="16px" />
          </StyledIconButtonSquare>
        </IconButtonWrapper>
      )
    )
  }

  if (firstStake) {
    return <ButtonSquare onClick={onPresentDeposit}>{TranslateString(999, `Stake NFA`)}</ButtonSquare>
  }

  return (
    <StyledFlex justifyContent="space-between" alignItems="center" mt="5px">
      <Flex flexDirection="column" alignItems="flex-start" marginRight="6px">
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
