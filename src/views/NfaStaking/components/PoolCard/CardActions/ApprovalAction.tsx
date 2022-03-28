import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Skeleton, Button, AutoRenewIcon } from '@apeswapfinance/uikit'
import { useNfaStakingApprove } from 'hooks/useApprove'
import { useTranslation } from 'contexts/Localization'

const StyledButton = styled(Button)`
  font-weight: 600;
`

interface ApprovalActionProps {
  nfaStakingPoolContract: string
  sousId: number
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ nfaStakingPoolContract, sousId, isLoading = false }) => {
  const [pendingApprove, setPendingApprove] = useState(false)
  const { onApprove } = useNfaStakingApprove(nfaStakingPoolContract, sousId)
  const { t } = useTranslation()

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
        <StyledButton
          disabled={pendingApprove}
          onClick={async () => {
            setPendingApprove(true)
            await handleApprove()
            setPendingApprove(false)
          }}
          endIcon={pendingApprove && <AutoRenewIcon spin color="currentColor" />}
        >
          {t('ENABLE')}
        </StyledButton>
      )}
    </>
  )
}

export default ApprovalAction
