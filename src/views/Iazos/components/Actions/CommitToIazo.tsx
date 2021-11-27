import React, { useState } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, ButtonSquare, useMatchBreakpoints } from '@apeswapfinance/uikit'
import 'react-datepicker/dist/react-datepicker.css'
import useTokenBalance from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import { IazoTokenInfo } from 'state/types'
import useCommitToIazo from 'views/Iazos/hooks/useCommitToIazo'
import BigNumber from 'bignumber.js'
import { ZERO_ADDRESS } from 'config'
import TokenInput from '../../CreateIazo/components/CreateYourPresale/PresaleDetails/TokenInput'

interface ApproveCreateIazoProps {
  iazoAddress: string
  baseToken: IazoTokenInfo
  isNative: boolean
  disabled?: boolean
  onPendingContribute: (pendingTrx: boolean) => void
}

const StyledButton = styled(ButtonSquare)`
  height: 50px;
  width: 150px;
  font-size: 14px;
  font-family: Poppins;
  font-weight: 700;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 200px;
    font-size: 16px;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CommitToIazo: React.FC<ApproveCreateIazoProps> = ({
  iazoAddress,
  baseToken,
  isNative,
  onPendingContribute,
  disabled,
}) => {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs
  const { address, symbol, decimals } = baseToken
  const [pendingTrx, setPendingTrx] = useState(false)
  const [amountToCommit, setAmountToCommit] = useState(null)
  const userBalance = useTokenBalance(isNative ? ZERO_ADDRESS : address)
  const userBalanceFormatted = getBalanceNumber(userBalance, parseInt(decimals))
  const onCommit = useCommitToIazo(
    iazoAddress,
    new BigNumber(amountToCommit).times(new BigNumber(10).pow(parseInt(decimals))).toString(),
    isNative,
  ).onCommit
  return (
    <Wrapper>
      <TokenInput
        size={isMobile ? 'sm' : 'mdlg'}
        backgroundColor="rgba(65, 65, 65, 1)"
        tokenSymbol={symbol}
        userBalance={userBalanceFormatted}
        onChange={(e) => setAmountToCommit(e.currentTarget.value)}
        max={userBalanceFormatted}
        min={0}
      />
      <StyledButton
        onClick={async () => {
          setPendingTrx(true)
          await onCommit()
          onPendingContribute(false)
          setPendingTrx(false)
        }}
        disabled={pendingTrx || disabled}
        endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
      >
        Commit
      </StyledButton>
    </Wrapper>
  )
}

export default CommitToIazo
