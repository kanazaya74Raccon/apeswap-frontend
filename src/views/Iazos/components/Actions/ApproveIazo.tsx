import React from 'react'
import styled from 'styled-components'
import { ButtonSquare } from '@apeswapfinance/uikit'
import 'react-datepicker/dist/react-datepicker.css'
import useApproveIazo from 'views/Iazos/hooks/useApproveIazo'

interface ApproveCreateIazoProps {
  tokenAddress: string
  iazoAddress: string
}

const StyledButton = styled(ButtonSquare)`
  height: 50px;
  width: 200px;
  font-size: 16px;
  font-family: Poppins;
  font-weight: 700;
`

const ApproveIazo: React.FC<ApproveCreateIazoProps> = ({ tokenAddress, iazoAddress }) => {
  const onApproveIazo = useApproveIazo(tokenAddress, iazoAddress).onApprove

  return (
    <StyledButton
      onClick={async () => {
        await onApproveIazo()
      }}
    >
      APPROVE
    </StyledButton>
  )
}

export default ApproveIazo
