import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { NfaStakingPool } from 'state/types'
import {
  Flex,
  Heading,
  useModal,
  Text,
  ButtonSquare,
  MinusIcon,
  AddIcon,
  IconButtonSquare,
} from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useNfaStake } from 'hooks/useStake'
import { useNfaUnstake } from 'hooks/useUnstake'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'

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
  stakedNfas?: number[]
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
  width: 100%;
  margin-left: 117px;
  margin-right: 35px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 217px;
  }
`

const StyledButtonSquare = styled(ButtonSquare)`
  font-weight: 600;
`

const StakeAction: React.FC<StakeActionsProps> = ({
  pool,
  stakedBalance,
  isApproved,
  firstStake,
  tier,
  stakedNfas,
}) => {
  const { t } = useTranslation()

  const { sousId } = pool

  const rawStakedBalance = getBalanceNumber(stakedBalance, 0)
  const displayBalance = rawStakedBalance.toLocaleString()

  const { onStake } = useNfaStake(sousId)
  const { onUnstake } = useNfaUnstake(sousId)

  const [onPresentDeposit] = useModal(
    <DepositModal
      onConfirm={async (val) => {
        await onStake(val)
      }}
      tier={tier}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      onConfirm={async (val) => {
        await onUnstake(val)
      }}
      stakedNfas={stakedNfas}
    />,
  )

  const renderStakingButtons = () => {
    return (
      rawStakedBalance !== 0 && (
        <IconButtonWrapper>
          <StyledIconButtonSquare onClick={onPresentWithdraw} mr="6px">
            <MinusIcon color="white" width="12px" height="12px" />
          </StyledIconButtonSquare>
          <StyledIconButtonSquare onClick={onPresentDeposit}>
            <AddIcon color="white" width="16px" height="16px" />
          </StyledIconButtonSquare>
          <></>
        </IconButtonWrapper>
      )
    )
  }

  if (firstStake) {
    return <StyledButtonSquare onClick={onPresentDeposit}>{t(`STAKE NFA`)}</StyledButtonSquare>
  }

  return (
    <StyledFlex justifyContent="space-between" alignItems="center" mt="5px">
      <Flex flexDirection="column" alignItems="flex-start" marginRight="6px">
        <StyledText>{t('Staked')}</StyledText>
        <StyledHeadingGreen color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>
          {displayBalance}
        </StyledHeadingGreen>
      </Flex>
      {isApproved && renderStakingButtons()}
    </StyledFlex>
  )
}

export default StakeAction
