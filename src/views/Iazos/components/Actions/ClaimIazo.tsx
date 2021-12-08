import React, { useState } from 'react'
import { AutoRenewIcon } from '@apeswapfinance/uikit'
import useClaimIazo from 'views/Iazos/hooks/useClaimIazo'
import { IazoState } from 'state/types'
import StyledButton from './styles'

interface ApproveCreateIazoProps {
  tokenAddress?: string
  iazoAddress?: string
  tokensToClaim: number
  baseTokensToClaim?: number
  iazoState: IazoState
  onPendingClaim: (pendingTrx: boolean) => void
}

const ClaimIazo: React.FC<ApproveCreateIazoProps> = ({
  iazoAddress,
  onPendingClaim,
  tokensToClaim,
  iazoState,
  baseTokensToClaim,
}) => {
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onClaim } = useClaimIazo(iazoAddress)
  const iazoFailed = iazoState === 'FAILED'

  const renderButton = () => {
    if (iazoFailed && tokensToClaim > 0) {
      return baseTokensToClaim > 0 ? (
        <StyledButton
          onClick={async () => {
            setPendingTrx(true)
            await onClaim()
            onPendingClaim(false)
            setPendingTrx(false)
          }}
          disabled={pendingTrx}
          endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
        >
          REFUND
        </StyledButton>
      ) : (
        <StyledButton disabled> REFUNDED</StyledButton>
      )
    }
    if (baseTokensToClaim > 0) {
      return tokensToClaim > 0 ? (
        <StyledButton
          onClick={async () => {
            setPendingTrx(true)
            await onClaim()
            onPendingClaim(false)
            setPendingTrx(false)
          }}
          disabled={pendingTrx}
          endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
        >
          CLAIM
        </StyledButton>
      ) : (
        <StyledButton disabled> CLAIMED</StyledButton>
      )
    }
    return <></>
  }

  return renderButton()
}

export default ClaimIazo
