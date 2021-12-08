import React, { useState } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, ButtonSquare } from '@apeswapfinance/uikit'
import 'react-datepicker/dist/react-datepicker.css'
import useClaimIazo from 'views/Iazos/hooks/useClaimIazo'
import { IazoState } from 'state/types'

interface ApproveCreateIazoProps {
  tokenAddress?: string
  iazoAddress?: string
  tokensToClaim: number
  baseTokensToClaim?: number
  iazoState: IazoState
  onPendingClaim: (pendingTrx: boolean) => void
}

const StyledButton = styled(ButtonSquare)`
  height: 50px;
  width: 150px;
  font-size: 14px;
  font-family: Poppins;
  font-weight: 700;
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 200px;
    font-size: 16px;
  }
`

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
