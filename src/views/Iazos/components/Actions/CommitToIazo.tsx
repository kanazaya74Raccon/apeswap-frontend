import React, { useState } from 'react'
import { AutoRenewIcon, useMatchBreakpoints } from '@apeswapfinance/uikit'
import useTokenBalance from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import useTheme from 'hooks/useTheme'
import { IazoTokenInfo } from 'state/types'
import useCommitToIazo from 'views/Iazos/hooks/useCommitToIazo'
import BigNumber from 'bignumber.js'
import { ZERO_ADDRESS } from 'config'
import TokenInput from '../CreateIazo/components/CreateYourPresale/PresaleDetails/TokenInput'
import StyledButton, { Wrapper, BoldAfterText } from './styles'

interface ApproveCreateIazoProps {
  iazoAddress: string
  baseToken: IazoTokenInfo
  maxSpendFormatted: number
  isNative: boolean
  disabled?: boolean
  onPendingContribute: (pendingTrx: boolean) => void
}

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
