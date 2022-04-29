import React, { useState } from 'react'
import { Skeleton } from '@apeswapfinance/uikit'
import { useSousApprove } from 'hooks/useApprove'
import { useERC20 } from 'hooks/useContract'
import { useAppDispatch } from 'state'
import { updateUserAllowance } from 'state/pools'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useToast } from 'state/hooks'
import { StyledButton } from '../styles'

interface ApprovalActionProps {
  stakingTokenContractAddress: string
  sousId: number
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ stakingTokenContractAddress, sousId, isLoading = false }) => {
  const { chainId, account } = useActiveWeb3React()
  const stakingTokenContract = useERC20(stakingTokenContractAddress)
  const [pendingTrx, setPendingTrx] = useState(false)
  const dispatch = useAppDispatch()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { toastSuccess } = useToast()

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <StyledButton
          sx={{ minWidth: '227px', width: '227px', textAlign: 'center' }}
          className="noClick"
          disabled={pendingTrx}
          onClick={async () => {
            setPendingTrx(true)
            await onApprove()
              .then((resp) => {
                const trxHash = resp.transactionHash
                toastSuccess('Approve Successful', {
                  text: 'View Transaction',
                  url: getEtherscanLink(trxHash, 'transaction', chainId),
                })
              })
              .catch((e) => {
                console.error(e)
                setPendingTrx(false)
              })
            dispatch(updateUserAllowance(chainId, sousId, account))

            setPendingTrx(false)
          }}
          load={pendingTrx}
        >
          ENABLE
        </StyledButton>
      )}
    </>
  )
}

export default React.memo(ApprovalAction)
