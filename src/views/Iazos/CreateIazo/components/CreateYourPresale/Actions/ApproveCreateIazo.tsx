import React, { useState } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, ButtonSquare } from '@apeswapfinance/uikit'
import 'react-datepicker/dist/react-datepicker.css'
import useApproveIazoFactory from 'views/Iazos/hooks/useApproveIazoFactory'
import useIazoAllowance from 'views/Iazos/hooks/useIazoAllowance'
import { useIazoFactoryAddress } from 'hooks/useAddress'

interface ApproveCreateIazoProps {
  tokenAddress: string
}

const StyledButton = styled(ButtonSquare)`
  height: 50px;
  width: 200px;
  font-size: 16px;
  font-family: Poppins;
  font-weight: 700;
`

const ApproveCreateIazo: React.FC<ApproveCreateIazoProps> = ({ tokenAddress }) => {
  const iazoFactoryAddress = useIazoFactoryAddress()
  const [pendingTrx, setPendingTrx] = useState(false)
  const onApprovetokenAddress = useApproveIazoFactory(tokenAddress).onApprove
  const approved = useIazoAllowance(tokenAddress, iazoFactoryAddress, pendingTrx)?.gt(0)

  return (
    <StyledButton
      onClick={async () => {
        setPendingTrx(true)
        await onApprovetokenAddress()
        setPendingTrx(false)
      }}
      disabled={pendingTrx || approved}
      endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
    >
      {approved ? 'APPROVED' : 'APPROVE'}
    </StyledButton>
  )
}

export default ApproveCreateIazo
