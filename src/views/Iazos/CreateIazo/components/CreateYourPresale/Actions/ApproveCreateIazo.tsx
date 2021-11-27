import React, { useState } from 'react'
import styled from 'styled-components'
import useApproveIazoFactory from 'views/Iazos/hooks/useApproveIazoFactory'
import { AutoRenewIcon, ButtonSquare } from '@apeswapfinance/uikit'

interface ApproveCreateIazoProps {
  tokenAddress: string
  disabled: boolean
  approved: boolean
  onPendingApproved: (pendingTrx: boolean) => void
}

const StyledButton = styled(ButtonSquare)`
  height: 40px;
  width: 135px;
  font-size: 14px;
  font-family: Poppins;
  font-weight: 700;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 200px;
    height: 50px;
    font-size: 16px;
  }
`

const ApproveCreateIazo: React.FC<ApproveCreateIazoProps> = ({
  tokenAddress,
  disabled,
  approved,
  onPendingApproved,
}) => {
  const [pendingTrx, setPendingTrx] = useState(false)
  const onApprovetokenAddress = useApproveIazoFactory(tokenAddress).onApprove

  return (
    <StyledButton
      onClick={async () => {
        setPendingTrx(true)
        await onApprovetokenAddress()
        setPendingTrx(false)
        onPendingApproved(false)
      }}
      disabled={pendingTrx || approved || disabled}
      endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
    >
      {approved ? 'APPROVED' : 'APPROVE'}
    </StyledButton>
  )
}

export default ApproveCreateIazo
