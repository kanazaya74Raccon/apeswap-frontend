import React, { useCallback, useState } from 'react'
import { Skeleton, ButtonSquare, AutoRenewIcon } from '@apeswapfinance/uikit'
import { useNfaStakingApprove } from 'hooks/useApprove'

interface ApprovalActionProps {
  nfaStakingPoolContract: string
  sousId: number
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ nfaStakingPoolContract, sousId, isLoading = false }) => {
  const [pendingApprove, setPendingApprove] = useState(false)
  const { onApprove } = useNfaStakingApprove(nfaStakingPoolContract, sousId)

  const handleApprove = useCallback(async () => {
    try {
      await onApprove()
    } catch (e) {
      console.warn(e)
    }
  }, [onApprove])

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <ButtonSquare
          disabled={pendingApprove}
          onClick={async () => {
            setPendingApprove(true)
            await handleApprove()
            setPendingApprove(false)
          }}
          endIcon={pendingApprove && <AutoRenewIcon spin color="currentColor" />}
        >
          ENABLE
        </ButtonSquare>
      )}
    </>
  )
}

export default ApprovalAction
