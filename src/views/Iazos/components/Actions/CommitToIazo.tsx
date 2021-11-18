import React, { useState } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, ButtonSquare } from '@apeswapfinance/uikit'
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
}

const StyledButton = styled(ButtonSquare)`
  height: 50px;
  width: 200px;
  font-size: 16px;
  font-family: Poppins;
  font-weight: 700;
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CommitToIazo: React.FC<ApproveCreateIazoProps> = ({ iazoAddress, baseToken, isNative }) => {
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
        size="mdlg"
        backgroundColor="rgba(65, 65, 65, 1)"
        tokenSymbol={symbol}
        userBalance={userBalanceFormatted}
        onChange={(e) => setAmountToCommit(e.currentTarget.value)}
      />
      <StyledButton
        onClick={async () => {
          setPendingTrx(true)
          await onCommit()
          setPendingTrx(false)
        }}
        disabled={pendingTrx}
        endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
      >
        Commit
      </StyledButton>
    </Wrapper>
  )
}

export default CommitToIazo
