import React, { useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Flex, Heading, IconButton, AddIcon, MinusIcon, useModal, Text, Button } from '@apeswapfinance/uikit'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import { Pool } from 'state/types'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import HarvestActions from './HarvestActions'

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

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  padding: 0px 10px;
`

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

const StyledIconButton = styled(IconButton)`
  width: 34px;
  height: 34px;
`

const StyledHeadingGreen = styled(Heading)`
  font-size: 14px;
  color: #38a611 !important;
  font-weight: 800;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
    color: #38a611;
  }
`

const StyledText = styled(Text)`
  font-weight: 600;
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
  pool,
  stakingTokenBalance,
  stakedBalance,
  isApproved,
  firstStake,
}) => {
  const TranslateString = useI18n()

  const { stakingToken, tokenDecimals, stakingLimit, sousId } = pool
  const { chainId } = useActiveWeb3React()

  const addLiquidityUrl = !pool?.lpStaking
    ? pool.stakingToken.symbol === 'GNANA'
      ? 'https://apeswap.finance/gnana'
      : `https://apeswap.finance/swap?outputCurrency=${pool?.stakingToken.address[chainId]}`
    : `${BASE_ADD_LIQUIDITY_URL}/${pool?.lpTokens?.token?.address[chainId]}/${pool?.lpTokens?.quoteToken?.address[chainId]}`

  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()

  const { symbol: stakingTokenName } = stakingToken

  const rewardRefStake = useRef(null)
  const rewardRefUnstake = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const onStake = useReward(rewardRefStake, useSousStake(sousId).onStake)
  const onUnstake = useReward(rewardRefUnstake, useSousUnstake(sousId).onUnstake)

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))

  const earnings = new BigNumber(pool.userData?.pendingReward || 0)
  const isLoading = !pool.userData

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
          rewardRefUnstake.current?.rewardMe()
        })
      }}
      tokenName={stakingTokenName}
    />,
  )

  const renderStakingButtons = () => {
    return (
      rawStakedBalance !== 0 && (
        <IconButtonWrapperStake>
          {sousId === 0 && (
            <HarvestWrapper className="noClick">
              <HarvestActions
                earnings={earnings}
                sousId={sousId}
                isLoading={isLoading}
                tokenDecimals={pool.tokenDecimals}
              />
            </HarvestWrapper>
          )}
          <Reward ref={rewardRefUnstake} type="emoji" config={rewards[typeOfReward]}>
            <StyledIconButton className="noClick" onClick={onPresentWithdraw} mr="6px">
              <MinusIcon className="noClick" color="white" width="12px" height="12px" />
            </StyledIconButton>
          </Reward>
          <Reward ref={rewardRefStake} type="emoji" config={rewards[typeOfReward]}>
            <StyledIconButton className="noClick" onClick={onPresentDeposit}>
              <AddIcon className="noClick" color="white" width="16px" height="16px" />
            </StyledIconButton>
          </Reward>
        </IconButtonWrapperStake>
      )
    )
  }

  if (firstStake) {
    return <StyledButton onClick={onPresentDeposit}>{TranslateString(999, `STAKE ${stakingTokenName}`)}</StyledButton>
  }

  return (
    <StyledFlex justifyContent="space-between">
      <Flex flexDirection="column" justifyContent="space-between" marginRight="6px">
        <StyledText>{TranslateString(999, 'Staked')}</StyledText>
        <StyledHeadingGreen color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>
          {rawStakedBalance > 0 && '>'}
          {displayBalance}
        </StyledHeadingGreen>
      </Flex>
      {isApproved && <IconButtonWrapper>{renderStakingButtons()}</IconButtonWrapper>}
    </StyledFlex>
  )
}

export default StakeAction
