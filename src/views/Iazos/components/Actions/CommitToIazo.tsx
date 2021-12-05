import React, { useState } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, ButtonSquare, useMatchBreakpoints, Text } from '@apeswapfinance/uikit'
import 'react-datepicker/dist/react-datepicker.css'
import useTokenBalance from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import useTheme from 'hooks/useTheme'
import { IazoTokenInfo } from 'state/types'
import useCommitToIazo from 'views/Iazos/hooks/useCommitToIazo'
import BigNumber from 'bignumber.js'
import { ZERO_ADDRESS } from 'config'
import TokenInput from '../../CreateIazo/components/CreateYourPresale/PresaleDetails/TokenInput'

interface ApproveCreateIazoProps {
  iazoAddress: string
  baseToken: IazoTokenInfo
  maxSpendFormatted: number
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

const BoldAfterText = styled(Text)<{ boldContent?: string }>`
  font-family: poppins;
  font-weight: 400;
  font-size: 13px;
  &:after {
    font-weight: 700;
    font-size: 14px;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 17px;
    }
    content: '${(props) => props.boldContent}';
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

const CommitToIazo: React.FC<ApproveCreateIazoProps> = ({
  iazoAddress,
  baseToken,
  isNative,
  onPendingContribute,
  disabled,
  maxSpendFormatted,
}) => {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs
  const { address, symbol, decimals } = baseToken
  const [pendingTrx, setPendingTrx] = useState(false)
  const [amountToCommit, setAmountToCommit] = useState(null)
  const userBalance = useTokenBalance(isNative ? ZERO_ADDRESS : address)
  const userBalanceFormatted = getBalanceNumber(userBalance, parseInt(decimals))
  const { isDark } = useTheme()
  const { onCommit } = useCommitToIazo(
    iazoAddress,
    new BigNumber(amountToCommit).times(new BigNumber(10).pow(parseInt(decimals))).toString(),
    isNative,
  )
  return (
    <Wrapper>
      <TokenInput
        size={isMobile ? 'sm' : 'mdlg'}
        backgroundColor={isDark ? 'rgba(65, 65, 65, 1)' : 'white'}
        tokenSymbol={isNative ? 'BNB' : symbol}
        userBalance={userBalanceFormatted}
        onChange={(e) => setAmountToCommit(e.currentTarget.value)}
        max={maxSpendFormatted < userBalanceFormatted ? maxSpendFormatted : userBalanceFormatted}
        min={0}
      />
      <BoldAfterText boldContent={`${maxSpendFormatted.toString()} ${symbol}`}>Max commitment: </BoldAfterText>
      <br />
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
