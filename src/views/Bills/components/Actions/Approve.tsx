import React, { useState } from 'react'
import { AutoRenewIcon } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useToast } from 'state/hooks'
import { updateUserAllowance } from 'state/bills'
import { getEtherscanLink } from 'utils'
import { useAppDispatch } from 'state'
import useApproveBill from '../../hooks/useApproveBill'
import { StyledButton } from '../styles'
import { ApproveProps } from './types'

const Approve: React.FC<ApproveProps> = ({ lpToken, billAddress, billIndex }) => {
  const { chainId, account } = useActiveWeb3React()
  const { onApprove } = useApproveBill(lpToken.address[chainId], billAddress)
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { toastSuccess } = useToast()

  const handleApprove = async () => {
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
    dispatch(updateUserAllowance(chainId, billIndex, account))
    setPendingTrx(false)
  }

  return (
    <StyledButton
      onClick={handleApprove}
      endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
      disabled={pendingTrx}
    >
      Enable
    </StyledButton>
  )
}

export default React.memo(Approve)
