import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import { Flex } from '@apeswapfinance/uikit'
import { CenterContainer, StyledUnlockButton } from './styles'
import ApprovalAction from './ApprovalAction'
import StakeAction from './StakeActions'

// Changed props to type string because BigNumbers cause re-renders

interface CardActionProps {
  allowance: string
  stakingTokenBalance: string
  stakedBalance: string
  lpValueUsd: number
  stakeLpAddress: string
  pid: number
}

const CardActions: React.FC<CardActionProps> = ({
  allowance,
  stakingTokenBalance,
  stakedBalance,
  lpValueUsd,
  stakeLpAddress,
  pid,
}) => {
  const { account } = useActiveWeb3React()
  const actionToRender = () => {
    if (!account) {
      return (
        <CenterContainer>
          <StyledUnlockButton />
        </CenterContainer>
      )
    }
    if (!new BigNumber(allowance)?.gt(0)) {
      return (
        <CenterContainer>
          <ApprovalAction stakingTokenContractAddress={stakeLpAddress} pid={pid} />
        </CenterContainer>
      )
    }
    return (
      <StakeAction
        stakedBalance={stakedBalance}
        stakingTokenBalance={stakingTokenBalance}
        lpValueUsd={lpValueUsd}
        pid={pid}
      />
    )
  }
  return actionToRender()
}

export default React.memo(CardActions)
