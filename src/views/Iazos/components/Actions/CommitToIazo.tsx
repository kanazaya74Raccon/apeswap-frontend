import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonSquare } from '@apeswapfinance/uikit'
import 'react-datepicker/dist/react-datepicker.css'
import useTokenBalance from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import { IazoTokenInfo } from 'state/types'
import useCommitToIazo from 'views/Iazos/hooks/useCommitToIazo'
import BigNumber from 'bignumber.js'
import TokenInput from '../../CreateIazo/components/CreateYourPresale/PresaleDetails/TokenInput'

interface ApproveCreateIazoProps {
  iazoAddress: string
  baseToken: IazoTokenInfo
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

const CommitToIazo: React.FC<ApproveCreateIazoProps> = ({ iazoAddress, baseToken }) => {
  const { address, symbol, decimals } = baseToken
  const [amountToCommit, setAmountToCommit] = useState(null)
  const userBalance = useTokenBalance(address)
  const userBalanceFormatted = getBalanceNumber(userBalance, parseInt(decimals))
  const onCommit = useCommitToIazo(
    iazoAddress,
    new BigNumber(amountToCommit).times(new BigNumber(10).pow(parseInt(decimals))).toString(),
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
          console.log(new BigNumber(amountToCommit).times(new BigNumber(10).pow(parseInt(decimals))).toString())
          await onCommit()
        }}
      >
        Commit
      </StyledButton>
    </Wrapper>
  )
}

export default CommitToIazo
