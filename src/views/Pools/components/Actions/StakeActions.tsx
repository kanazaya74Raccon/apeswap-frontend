import React, { useState } from 'react'
import { Flex, AddIcon, MinusIcon, useModal } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousStake } from 'hooks/useStake'
import { fetchPoolsUserDataAsync } from 'state/pools'
import { useSousUnstake } from 'hooks/useUnstake'
import useIsMobile from 'hooks/useIsMobile'
import { useToast } from 'state/hooks'
import { useAppDispatch } from 'state'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ListViewContent from 'components/ListViewContent'
import DepositModal from '../Modals/DepositModal'
import WithdrawModal from '../Modals/WithdrawModal'
import { ActionContainer, CenterContainer, SmallButtonSquare, StyledButtonSquare } from './styles'

interface StakeActionsProps {
  stakingTokenBalance: string
  stakedTokenSymbol: string
  stakedBalance: string
  stakeTokenValueUsd: number
  sousId: number
}

const StakeAction: React.FC<StakeActionsProps> = ({
  stakingTokenBalance,
  stakedTokenSymbol,
  stakedBalance,
  stakeTokenValueUsd,
  sousId,
}) => {
  const rawStakedBalance = getBalanceNumber(new BigNumber(stakedBalance))
  const dispatch = useAppDispatch()
  const { chainId, account } = useActiveWeb3React()
  const userStakedBalanceUsd = `$${(
    getBalanceNumber(new BigNumber(stakedBalance) || new BigNumber(0)) * stakeTokenValueUsd
  ).toFixed(2)}`
  const [pendingDepositTrx, setPendingDepositTrx] = useState(false)
  const [pendingWithdrawTrx, setPendingWithdrawTrx] = useState(false)

  const { toastSuccess } = useToast()
  const isMobile = useIsMobile()
  const firstStake = !new BigNumber(stakedBalance)?.gt(0)

  const { onStake } = useSousStake(sousId)
  const { onUnstake } = useSousUnstake(sousId)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingTokenBalance}
      onConfirm={async (val) => {
        setPendingDepositTrx(true)
        await onStake(val)
          .then((resp) => {
            const trxHash = resp.transactionHash
            toastSuccess('Deposit Successful', {
              text: 'View Transaction',
              url: getEtherscanLink(trxHash, 'transaction', chainId),
            })
          })
          .catch((e) => {
            console.error(e)
            setPendingDepositTrx(false)
          })
        dispatch(fetchPoolsUserDataAsync(chainId, account))
        setPendingDepositTrx(false)
      }}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={async (val) => {
        setPendingWithdrawTrx(true)
        await onUnstake(val)
          .then((resp) => {
            const trxHash = resp.transactionHash
            toastSuccess('Withdraw Successful', {
              text: 'View Transaction',
              url: getEtherscanLink(trxHash, 'transaction', chainId),
            })
          })
          .catch((e) => {
            console.error(e)
            setPendingWithdrawTrx(false)
          })
        dispatch(fetchPoolsUserDataAsync(chainId, account))
        setPendingWithdrawTrx(false)
      }}
    />,
  )

  const renderStakingButtons = () => {
    if (firstStake) {
      return (
        <CenterContainer>
          <StyledButtonSquare onClick={onPresentDeposit} load={pendingDepositTrx} disabled={pendingDepositTrx}>
            DEPOSIT
          </StyledButtonSquare>
        </CenterContainer>
      )
    }
    return (
      <ActionContainer>
        {isMobile && (
          <ListViewContent
            title={`Staked ${stakedTokenSymbol}`}
            value={rawStakedBalance.toFixed(2)}
            value2={userStakedBalanceUsd}
            value2Secondary
            width={100}
            height={50}
            lineHeight={15}
            ml={10}
          />
        )}
        <Flex>
          <SmallButtonSquare
            onClick={onPresentWithdraw}
            load={pendingWithdrawTrx}
            disabled={pendingWithdrawTrx}
            mr="6px"
            size="sm"
          >
            <MinusIcon color="white" width="20px" height="20px" fontWeight={700} />
          </SmallButtonSquare>
          <SmallButtonSquare
            onClick={onPresentDeposit}
            load={pendingDepositTrx}
            disabled={pendingDepositTrx || !new BigNumber(stakingTokenBalance)?.gt(0)}
            size="sm"
          >
            <AddIcon color="white" width="25px" height="25px" fontWeight={700} />
          </SmallButtonSquare>
        </Flex>
        {!isMobile && (
          <ListViewContent
            title={`Staked ${stakedTokenSymbol}`}
            value={`${rawStakedBalance.toFixed(2)}`}
            value2={userStakedBalanceUsd}
            value2Secondary
            width={100}
            height={50}
            lineHeight={15}
            ml={10}
          />
        )}
      </ActionContainer>
    )
  }

  return renderStakingButtons()
}

export default React.memo(StakeAction)
