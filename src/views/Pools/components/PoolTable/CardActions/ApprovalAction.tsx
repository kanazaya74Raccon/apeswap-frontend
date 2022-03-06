import React, { useCallback, useState, useRef } from 'react'
import styled from 'styled-components'
import { Skeleton, ButtonSquare } from '@apeswapfinance/uikit'
import { useSousApprove } from 'hooks/useApprove'
import { useERC20 } from 'hooks/useContract'
import { useTranslation } from 'contexts/Localization'

interface ApprovalActionProps {
  stakingTokenContractAddress: string
  sousId: number
  isLoading?: boolean
}

const StyledButtonSquare = styled(ButtonSquare)`
  font-weight: 600;
`

const ApprovalAction: React.FC<ApprovalActionProps> = ({ stakingTokenContractAddress, sousId, isLoading = false }) => {
  const stakingTokenContract = useERC20(stakingTokenContractAddress)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const rewardRefReward = useRef(null)
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { t } = useTranslation()

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
          {t('ENABLE')}
        </StyledButtonSquare>
      )}
    </>
  )
}

export default ApprovalAction
