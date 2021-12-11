import React, { useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Flex, Heading, IconButtonSquare, AddIcon, MinusIcon, useModal, Text } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useDualFarmStake } from 'hooks/useStake'
import { useMiniChefUnstake } from 'hooks/useUnstake'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'

interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  stakedBalanceUsd?: number
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  addLiquidityUrl?: string
  isApproved?: boolean
  lpSymbol?: string
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
  font-family: 'Titan One';

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
  margin-left: 110px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 30px;
    margin-left: 180px;
  }
`

const StakeAction: React.FC<FarmCardActionsProps> = ({
  stakedBalance,
  tokenBalance,
  stakedBalanceUsd,
  tokenName,
  pid,
  addLiquidityUrl,
  isApproved,
}) => {
  const TranslateString = useI18n()

  const rewardRefPos = useRef(null)
  const rewardRefNeg = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const onStake = useReward(rewardRefPos, useDualFarmStake(pid).onStake)
  const onUnstake = useReward(rewardRefNeg, useMiniChefUnstake(pid).onUnstake)

  const displayBalance = stakedBalanceUsd.toFixed(2)

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
      tokenName={tokenName}
      addLiquidityUrl={addLiquidityUrl}
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
      tokenName={tokenName}
    />,
  )

  const renderStakingButtons = () => {
    return (
      stakedBalanceUsd !== 0 && (
        <IconButtonWrapper>
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
        </IconButtonWrapper>
      )
    )
  }

  return (
    <StyledFlex justifyContent="space-between" alignItems="center" mt="5px">
      <Flex flexDirection="column" alignItems="flex-start">
        <StyledText>{TranslateString(999, 'Staked')}</StyledText>
        <StyledHeadingGreen color={stakedBalanceUsd === 0 ? 'textDisabled' : 'text'}>
          ${displayBalance}
        </StyledHeadingGreen>
      </Flex>
      {isApproved && renderStakingButtons()}
    </StyledFlex>
  )
}

export default StakeAction
