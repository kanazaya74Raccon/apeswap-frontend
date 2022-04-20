import React, { useState } from 'react'
import { Skeleton, AutoRenewIcon } from '@apeswapfinance/uikit'
import { useDualFarmApprove } from 'hooks/useApprove'
import { updateFarmUserAllowances } from 'state/farms'
import { useAppDispatch } from 'state'
import { useERC20 } from 'hooks/useContract'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useToast } from 'state/hooks'
import { StyledButton } from './styles'

interface ApprovalActionProps {
  stakingTokenContractAddress: string
  pid: number
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ stakingTokenContractAddress, pid, isLoading = false }) => {
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const stakingTokenContract = useERC20(stakingTokenContractAddress)
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onApprove } = useDualFarmApprove(stakingTokenContract, pid)
  const { toastSuccess } = useToast()

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <StyledButton
          className="noClick"
          disabled={pendingTrx}
          onClick={async () => {
            setPendingTrx(true)
            await onApprove()
              .then((resp) => {
                const trxHash = resp !== false ? resp.transactionHash : ''
                toastSuccess('Approve Successful', {
                  text: 'View Transaction',
                  url: getEtherscanLink(trxHash, 'transaction', chainId),
                })
              })
              .catch((e) => {
                console.error(e)
                setPendingTrx(false)
              })
            setPendingTrx(false)
          }}
          endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
        >
          ENABLE
        </StyledButton>
      )}
    </>
  )
}

export default React.memo(ApprovalAction)
