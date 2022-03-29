import React, { useState } from 'react'
import {
  Flex,
  AddIcon,
  MinusIcon,
  useModal,
  AutoRenewIcon,
  LinkExternal,
  Text,
  useMatchBreakpoints,
} from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import { useToast } from 'state/hooks'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ListViewContent from 'components/ListViewContent'
import DepositModal from '../Modals/DepositModal'
import WithdrawModal from '../Modals/WithdrawModal'
import { ActionContainer, CenterContainer, SmallButton, StyledButton } from './styles'

interface StakeActionsProps {
  stakingTokenBalance: string
  stakedBalance: string
  lpValueUsd: number
  pid: number
}

const StakeAction: React.FC<StakeActionsProps> = ({ stakingTokenBalance, stakedBalance, lpValueUsd, pid }) => {
  const rawStakedBalance = getBalanceNumber(new BigNumber(stakedBalance))
  const dispatch = useAppDispatch()
  const { chainId, account } = useActiveWeb3React()
  const userStakedBalanceUsd = `$${(
    getBalanceNumber(new BigNumber(stakedBalance) || new BigNumber(0)) * lpValueUsd
  ).toFixed(2)}`
  const [pendingDepositTrx, setPendingDepositTrx] = useState(false)
  const [pendingWithdrawTrx, setPendingWithdrawTrx] = useState(false)
  const { toastSuccess } = useToast()
  const { isXl, isLg, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const firstStake = !new BigNumber(stakedBalance)?.gt(0)

  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)

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
        dispatch(fetchFarmUserDataAsync(chainId, account))
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
            toastSuccess(
              'Withdraw Successful',
              <LinkExternal href={getEtherscanLink(trxHash, 'transaction', chainId)}>
                <Text> View Transaction </Text>
              </LinkExternal>,
            )
          })
          .catch((e) => {
            console.error(e)
            setPendingWithdrawTrx(false)
          })
        dispatch(fetchFarmUserDataAsync(chainId, account))
        setPendingWithdrawTrx(false)
      }}
    />,
  )

  const renderStakingButtons = () => {
    if (firstStake) {
      return (
        <CenterContainer>
          <StyledButton
            onClick={onPresentDeposit}
            endIcon={pendingDepositTrx && <AutoRenewIcon spin color="currentColor" />}
            disabled={pendingDepositTrx}
          >
            DEPOSIT
          </StyledButton>
        </CenterContainer>
      )
    }
    return (
      <ActionContainer>
        {isMobile && (
          <ListViewContent
            title="Staked LP"
            value={`${rawStakedBalance.toFixed(6)} LP`}
            value2={userStakedBalanceUsd}
            value2Secondary
            width={100}
            height={50}
            lineHeight={15}
            ml={10}
          />
        )}
        <Flex>
          <SmallButton
            onClick={onPresentWithdraw}
            endIcon={pendingWithdrawTrx && <AutoRenewIcon spin color="currentColor" />}
            disabled={pendingWithdrawTrx}
            mr="6px"
          >
            <MinusIcon color="white" width="16px" height="20px" fontWeight={700} />
          </SmallButton>
          <SmallButton
            onClick={onPresentDeposit}
            endIcon={pendingDepositTrx && <AutoRenewIcon spin color="currentColor" />}
            disabled={pendingDepositTrx || !new BigNumber(stakingTokenBalance)?.gt(0)}
          >
            <AddIcon color="white" width="20px" height="20px" fontWeight={700} />
          </SmallButton>
        </Flex>
        {!isMobile && (
          <ListViewContent
            title="Staked LP"
            value={`${rawStakedBalance.toFixed(6)} LP`}
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
