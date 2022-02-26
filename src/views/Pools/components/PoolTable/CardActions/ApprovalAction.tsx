import React, { useCallback, useState, useRef } from 'react'
import styled from 'styled-components'
import { Skeleton, ButtonSquare } from '@apeswapfinance/uikit'
import { useSousApprove } from 'hooks/useApprove'
import { useERC20 } from 'hooks/useContract'

interface ApprovalActionProps {
  stakingTokenContractAddress: string
  sousId: number
  isLoading?: boolean
}

const StyledButtonSquare = styled(ButtonSquare)`
  font-weight: 600;

  &:hover {
    background-color: #ffd54fff !important;
  }
`

const ApprovalAction: React.FC<ApprovalActionProps> = ({ stakingTokenContractAddress, sousId, isLoading = false }) => {
  const stakingTokenContract = useERC20(stakingTokenContractAddress)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const rewardRefReward = useRef(null)
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      } else {
        rewardRefReward.current?.rewardMe()
      }
    } catch (e) {
      rewardRefReward.current?.rewardMe()
      console.warn(e)
    }
  }, [onApprove, setRequestedApproval])

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <StyledButtonSquare disabled={requestedApproval} onClick={handleApprove}>
          ENABLE
        </StyledButtonSquare>
      )}
    </>
  )
}

export default ApprovalAction
