import React, { useState } from 'react'
import useClaimBill from 'views/Bills/hooks/useClaimBill'
import { AutoRenewIcon } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import { useAppDispatch } from 'state'
import { fetchBillsUserDataAsync } from 'state/bills'
import { ClaimProps } from './types'
import { StyledButton } from '../styles'

const Claim: React.FC<ClaimProps> = ({ billAddress, billId, buttonSize }) => {
  const { onClaimBill } = useClaimBill(billAddress, billId)
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { toastSuccess } = useToast()

  const handleClaim = async () => {
    setPendingTrx(true)
    await onClaimBill()
      .then((resp) => {
        const trxHash = resp.transactionHash
        toastSuccess('Claim Successful', {
          text: 'View Transaction',
          url: getEtherscanLink(trxHash, 'transaction', chainId),
        })
      })
      .catch((e) => {
        console.error(e)
        setPendingTrx(false)
      })
    dispatch(fetchBillsUserDataAsync(chainId, account))
    setPendingTrx(false)
  }
  return (
    <StyledButton
      onClick={handleClaim}
      endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
      disabled={pendingTrx}
      buttonSize={buttonSize}
    >
      Claim
    </StyledButton>
  )
}

export default React.memo(Claim)
