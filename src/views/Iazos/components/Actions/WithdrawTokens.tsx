import React, { useState } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, ButtonSquare } from '@apeswapfinance/uikit'
import 'react-datepicker/dist/react-datepicker.css'
import useWithdrawOfferTokens from 'views/Iazos/hooks/useWithdrawOfferTokens'
import { IazoState } from 'state/types'
import useTokenBalance, { useAccountTokenBalance } from 'hooks/useTokenBalance'

interface ApproveCreateIazoProps {
  tokenAddress?: string
  iazoAddress?: string
  tokensToClaim: number
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

const WithdrawTokens: React.FC<ApproveCreateIazoProps> = ({ iazoAddress, onPendingClaim, tokenAddress, iazoState }) => {
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onWithdraw } = useWithdrawOfferTokens(iazoAddress)
  const contractBalance = useAccountTokenBalance(iazoAddress, tokenAddress)?.toNumber()
  //   const iazoFailed = iazoState === 'FAILED'

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
