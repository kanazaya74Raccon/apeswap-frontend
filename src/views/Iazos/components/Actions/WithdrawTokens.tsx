import React, { useState } from 'react'
import { AutoRenewIcon } from '@apeswapfinance/uikit'
import useWithdrawOfferTokens from 'views/Iazos/hooks/useWithdrawOfferTokens'
import { IazoState } from 'state/types'
import { useAccountTokenBalance } from 'hooks/useTokenBalance'
import StyledButton from './styles'

interface ApproveCreateIazoProps {
  tokenAddress?: string
  iazoAddress?: string
  tokensToClaim: number
  iazoState?: IazoState
  onPendingClaim: (pendingTrx: boolean) => void
}

const WithdrawTokens: React.FC<ApproveCreateIazoProps> = ({ iazoAddress, onPendingClaim, tokenAddress }) => {
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onWithdraw } = useWithdrawOfferTokens(iazoAddress)
  const contractBalance = useAccountTokenBalance(iazoAddress, tokenAddress)?.toNumber()

  return contractBalance > 0 ? (
    <StyledButton
      onClick={async () => {
        setPendingTrx(true)
        await onWithdraw()
        onPendingClaim(false)
        setPendingTrx(false)
      }}
      disabled={pendingTrx}
      endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
    >
      Withdraw Tokens
    </StyledButton>
  ) : (
    <StyledButton disabled>Tokens Withdrawn</StyledButton>
  )
}

export default React.memo(WithdrawTokens)
