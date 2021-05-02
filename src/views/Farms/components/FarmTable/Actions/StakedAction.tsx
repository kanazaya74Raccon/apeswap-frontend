import React, { useState, useCallback, useRef, useMemo } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import styled from 'styled-components'
import { Button, Flex, Heading, useModal, IconButton, AddIcon, MinusIcon } from '@apeswapfinance/uikit'
import UnlockButton from 'components/UnlockButton'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { useFarmUser, useStats } from 'state/hooks'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import useI18n from 'hooks/useI18n'
import { useApprove } from 'hooks/useApprove'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { getBalanceNumber } from 'utils/formatBalance'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'

import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import { ActionContainer, ActionTitles, ActionContent, Earned, StakedStyle, Title, Subtle } from './styles'

const IconButtonWrapper = styled.div`
  display: flex;
  margin-top: 10px;
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
  const displayBalance = rawStakedBalance.toLocaleString()

  const yourStats = useStats()
  const farmStats = yourStats?.stats?.farms
  const filteredFarmStats = farmStats?.find((item) => item.pid === pid)
  const totalValuePersonalFormated = filteredFarmStats
    ? `$${Number(filteredFarmStats.stakedTvl).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

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
      <Button onClick={onPresentDeposit}>{TranslateString(999, 'Stake LP')}</Button>
    ) : (
      <IconButtonWrapper>
        <Reward ref={rewardRefNeg} type="emoji" config={rewards[typeOfReward]}>
          <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
            <MinusIcon color="primary" width="14px" height="14px" />
          </IconButton>
        </Reward>
        <Reward ref={rewardRefPos} type="emoji" config={rewards[typeOfReward]}>
          <IconButton variant="tertiary" onClick={onPresentDeposit}>
            <AddIcon color="primary" width="20px" height="20px" />
          </IconButton>
        </Reward>
      </IconButtonWrapper>
    )
  }

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Subtle>{TranslateString(999, 'START FARMING')}</Subtle>
        </ActionTitles>
        <ActionContent>
          <UnlockButton width="100%" />
        </ActionContent>
      </ActionContainer>
    )
  }

  if (isApproved) {
    if (rawStakedBalance) {
      return (
        <ActionContainer>
          <ActionTitles>
            <Title>{lpSymbol} </Title>
            <Subtle>{TranslateString(999, 'STAKED')}</Subtle>
          </ActionTitles>
          <ActionContent>
            <div>
              <Earned>{displayBalance}</Earned>
              <StakedStyle>~{totalValuePersonalFormated}USD</StakedStyle>
            </div>
            <Flex justifyContent="space-between" alignItems="center">
              {renderStakingButtons()}
            </Flex>
          </ActionContent>
        </ActionContainer>
      )
    }

    return (
      <ActionContainer>
        <ActionTitles>
          <Subtle>{TranslateString(999, 'STAKE')} </Subtle>
          <Title>{lpSymbol}</Title>
        </ActionTitles>
        <ActionContent>
          <Button onClick={onPresentDeposit} variant="secondary">
            {TranslateString(999, 'Stake LP')}
          </Button>
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Subtle>{TranslateString(999, 'ENABLE FARM')}</Subtle>
      </ActionTitles>
      <ActionContent>
        <Button disabled={requestedApproval} onClick={handleApprove} variant="secondary">
          {TranslateString(999, 'Enable')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default Staked
