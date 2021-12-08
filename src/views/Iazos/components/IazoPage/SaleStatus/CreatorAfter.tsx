import React, { useState, useCallback } from 'react'
import { IazoState, IazoStatus, IazoTimeInfo, IazoTokenInfo } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import BigNumber from 'bignumber.js'
import useFetchUserIazoCommit, { UserCommit } from 'views/Iazos/hooks/useFetchUserIazoCommit'
import ClaimIazo from '../../Actions/ClaimIazo'
import WithdrawTokens from '../../Actions/WithdrawTokens'
import { BoldAfterTextLarge, Heading } from '../../styles'
import { Wrapper, ProgressBarWrapper, ProgressBar, Progress } from './styles'

interface BeforeSaleProps {
  timeInfo: IazoTimeInfo
  hardcap: string
  baseToken: IazoTokenInfo
  iazoToken: IazoTokenInfo
  status: IazoStatus
  iazoAddress: string
  tokenPrice: string
  iazoState: IazoState
}

const CreatorAfter: React.FC<BeforeSaleProps> = ({ hardcap, baseToken, iazoToken, status, iazoAddress, iazoState }) => {
  const { symbol, decimals } = baseToken
  const [pendingUserInfo, setPendingUserInfo] = useState(true)
  const { account } = useWeb3React()
  const { tokensBought, deposited }: UserCommit = useFetchUserIazoCommit(iazoAddress, pendingUserInfo)
  const tokensBoughtFormatted = getBalanceNumber(new BigNumber(tokensBought), parseInt(iazoToken.decimals))
  const hardcapFormatted = getBalanceNumber(new BigNumber(hardcap), parseInt(decimals))

  const { totalBaseCollected } = status
  const baseCollectedFormatted = getBalanceNumber(new BigNumber(totalBaseCollected), parseInt(decimals))
  const percentRaised = (baseCollectedFormatted / hardcapFormatted) * 100
  const iazoFailed = iazoState === 'FAILED'

  const onPendingClaim = useCallback((pendingTrx: boolean) => {
    setPendingUserInfo(pendingTrx)
  }, [])

  return (
    <Wrapper>
      <Heading>
        {baseCollectedFormatted} / {hardcapFormatted} {symbol}
      </Heading>
      <ProgressBarWrapper>
        <ProgressBar>
          <Progress percentComplete={`${percentRaised}%`} />
        </ProgressBar>
      </ProgressBarWrapper>
      {iazoFailed
        ? parseInt(tokensBought) > 0 && <BoldAfterTextLarge>IAZO failed please claim your refund</BoldAfterTextLarge>
        : parseInt(deposited) > 0 && (
            <BoldAfterTextLarge boldContent={`${tokensBoughtFormatted.toString()} ${iazoToken.symbol}`}>
              Tokens bought:{' '}
            </BoldAfterTextLarge>
          )}
      {account ? (
        <>
          <ClaimIazo
            iazoAddress={iazoAddress}
            tokensToClaim={tokensBoughtFormatted}
            onPendingClaim={onPendingClaim}
            iazoState={iazoState}
            baseTokensToClaim={tokensBoughtFormatted}
          />

          <br />
          {iazoFailed && (
            <>
              <BoldAfterTextLarge>IAZO Failed. Please withdraw all tokens. </BoldAfterTextLarge>
              <WithdrawTokens
                iazoAddress={iazoAddress}
                tokensToClaim={tokensBoughtFormatted}
                onPendingClaim={onPendingClaim}
                iazoState={iazoState}
                tokenAddress={iazoToken?.address}
              />
            </>
          )}
        </>
      ) : (
        <>
          <br />
          <UnlockButton />
          <br />
        </>
      )}
    </Wrapper>
  )
}

export default React.memo(CreatorAfter)
