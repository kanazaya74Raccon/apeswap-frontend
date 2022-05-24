import React, { useState } from 'react'
import { AutoRenewIcon } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTransferBill from 'views/Bills/hooks/useTransferBill'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import { useAppDispatch } from 'state'
import { fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from 'state/bills'
import { useTranslation } from 'contexts/Localization'
import { StyledButton } from '../styles'
import { TransferProps } from './types'

const Transfer: React.FC<TransferProps> = ({ billNftAddress, billId, toAddress, disabled }) => {
  const { onTransfer } = useTransferBill(billNftAddress, billId, toAddress)
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()

  const handleTransfer = async () => {
    setPendingTrx(true)
    await onTransfer()
      .then((resp) => {
        const trxHash = resp.transactionHash
        toastSuccess(t('Transfer Successful'), {
          text: t('View Transaction'),
          url: getEtherscanLink(trxHash, 'transaction', chainId),
        })
      })
      .catch((e) => {
        console.error(e)
        toastError(e?.data?.message || t('Something went wrong please try again'))
        setPendingTrx(false)
      })
    dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
    dispatch(fetchBillsUserDataAsync(chainId, account))
    setPendingTrx(false)
  }
  return (
    <StyledButton
      onClick={handleTransfer}
      endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
      disabled={pendingTrx || disabled}
    >
      {t('CONFIRM')}
    </StyledButton>
  )
}

export default React.memo(Transfer)
