import React, { useState } from 'react'
import useClaimAll from 'views/Bills/hooks/useClaimAll'
import { AutoRenewIcon } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import { useAppDispatch } from 'state'
import { fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from 'state/bills'
import { StyledButton } from '../styles'

const ClaimAll: React.FC<{
  userOwnedBills: { billAddress: string; billIds: string[] }[]
  ownedBillsAmount: number
  buttonSize?: number
}> = ({ userOwnedBills, ownedBillsAmount, buttonSize }) => {
  const { onClaimBill } = useClaimAll(userOwnedBills)
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { toastSuccess, toastError } = useToast()

  const handleClaim = async () => {
    setPendingTrx(true)
    await onClaimBill()
      .then((resp) => {
        resp.map((trx) =>
          toastSuccess('Claim Successful', {
            text: 'View Transaction',
            url: getEtherscanLink(trx.transactionHash, 'transaction', chainId),
          }),
        )
      })
      .catch((e) => {
        console.error(e)
        toastError(e?.data?.message || 'Something went wrong please try again')
        setPendingTrx(false)
      })
    dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
    dispatch(fetchBillsUserDataAsync(chainId, account))
    setPendingTrx(false)
  }
  return (
    <StyledButton
      onClick={handleClaim}
      endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
      disabled={pendingTrx}
      buttonSize={buttonSize}
      style={{ height: '36px' }}
    >
      Claim All ({ownedBillsAmount})
    </StyledButton>
  )
}

export default React.memo(ClaimAll)
