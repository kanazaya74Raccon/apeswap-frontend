import React, { useCallback, useState, useRef } from 'react'
import { Skeleton, ButtonSquare } from '@apeswapfinance/uikit'
import { useSousApprove } from 'hooks/useApprove'
import { useERC20 } from 'hooks/useContract'

interface ApprovalActionProps {
  stakingContractAddress: string
  sousId: number
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ stakingContractAddress, sousId, isLoading = false }) => {
  const stakingTokenContract = useERC20(stakingContractAddress)
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
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <ButtonSquare disabled={requestedApproval} onClick={handleApprove}>
          Enable
        </ButtonSquare>
      )}
    </>
  )
}

export default ApprovalAction
