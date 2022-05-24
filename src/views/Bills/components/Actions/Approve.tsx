import React, { useState } from 'react'
import { AutoRenewIcon } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useToast } from 'state/hooks'
import { updateUserAllowance } from 'state/bills'
import { getEtherscanLink } from 'utils'
import { useAppDispatch } from 'state'
import { useTranslation } from 'contexts/Localization'
import useApproveBill from '../../hooks/useApproveBill'
import { StyledButton } from '../styles'
import { ApproveProps } from './types'

const Approve: React.FC<ApproveProps> = ({ lpToken, billAddress, billIndex }) => {
  const { chainId, account } = useActiveWeb3React()
  const { onApprove } = useApproveBill(lpToken.address[chainId], billAddress)
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()

  const handleApprove = async () => {
    setPendingTrx(true)
    await onApprove()
      .then((resp) => {
        const trxHash = resp.transactionHash
        toastSuccess(t('Approve Successful'), {
          text: t('View Transaction'),
          url: getEtherscanLink(trxHash, 'transaction', chainId),
        })
      })
      .catch((e) => {
        console.error(e)
        toastError(e?.data?.message || t('Something went wrong please try again'))
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
      {t('Enable')}
    </StyledButton>
  )
}

export default React.memo(Approve)
