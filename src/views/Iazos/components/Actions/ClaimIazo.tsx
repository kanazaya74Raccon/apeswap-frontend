import React, { useState } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, ButtonSquare } from '@apeswapfinance/uikit'
import 'react-datepicker/dist/react-datepicker.css'
import useApproveIazo from 'views/Iazos/hooks/useApproveIazo'
import useClaimIazo from 'views/Iazos/hooks/useClaimIazo'

interface ApproveCreateIazoProps {
  tokenAddress?: string
  iazoAddress?: string
  tokensToClaim: number
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

const ClaimIazo: React.FC<ApproveCreateIazoProps> = ({ tokenAddress, iazoAddress, onPendingClaim, tokensToClaim }) => {
  const [pendingTrx, setPendingTrx] = useState(false)
  const onClaim = useClaimIazo(iazoAddress).onClaim

  return (
    <>
      {tokensToClaim > 0 ? (
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
        <StyledButton disabled>CLAIMED</StyledButton>
      )}
    </>
  )
}

export default ClaimIazo
