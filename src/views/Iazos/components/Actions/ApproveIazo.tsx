import React, { useState } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, ButtonSquare } from '@apeswapfinance/uikit'
import 'react-datepicker/dist/react-datepicker.css'
import useApproveIazo from 'views/Iazos/hooks/useApproveIazo'

interface ApproveCreateIazoProps {
  tokenAddress: string
  iazoAddress: string
  onApproveChange: (pendingTrx: boolean) => void
}

const StyledButton = styled(ButtonSquare)`
  height: 50px;
  width: 200px;
  font-size: 16px;
  font-family: Poppins;
  font-weight: 700;
`

const ApproveIazo: React.FC<ApproveCreateIazoProps> = ({ tokenAddress, iazoAddress, onApproveChange }) => {
  const [pendingTrx, setPendingTrx] = useState(false)
  const onApproveIazo = useApproveIazo(tokenAddress, iazoAddress).onApprove

  return (
    <StyledButton
      onClick={async () => {
        setPendingTrx(true)
        await onApproveIazo()
        onApproveChange(true)
        setPendingTrx(false)
      }}
      disabled={pendingTrx}
      endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
    >
      APPROVE
    </StyledButton>
  )
}

export default ApproveIazo
