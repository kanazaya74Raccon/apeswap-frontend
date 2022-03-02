import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import { CenterContainer, StyledUnlockButton } from './styles'
import ApprovalAction from './ApprovalAction'
import StakeAction from './StakeActions'

// Changed props to type string because BigNumbers cause re-renders

interface CardActionProps {
  allowance: string
  stakingTokenBalance: string
  stakedBalance: string
  stakeTokenValueUsd: number
  stakeTokenAddress: string
  sousId: number
}

const CardActions: React.FC<CardActionProps> = ({
  allowance,
  stakingTokenBalance,
  stakedBalance,
  stakeTokenValueUsd,
  stakeTokenAddress,
  sousId,
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
          <ApprovalAction stakingTokenContractAddress={stakeTokenAddress} sousId={sousId} />
        </CenterContainer>
      )
    }
    return (
      <StakeAction
        stakedBalance={stakedBalance}
        stakingTokenBalance={stakingTokenBalance}
        stakeTokenValueUsd={stakeTokenValueUsd}
        sousId={sousId}
      />
    )
  }
  return actionToRender()
}

export default React.memo(CardActions)
