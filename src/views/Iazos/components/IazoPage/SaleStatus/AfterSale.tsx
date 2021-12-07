import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { IazoState, IazoStatus, IazoTimeInfo, IazoTokenInfo } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import BigNumber from 'bignumber.js'
import useFetchUserIazoCommit, { UserCommit } from 'views/Iazos/hooks/useFetchUserIazoCommit'
import ClaimIazo from '../../Actions/ClaimIazo'
import { BoldAfterTextLarge, Heading } from '../../styles'

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

const BeforeSaleWrapper = styled.div`
  width: 796px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const ProgressBarWrapper = styled.div`
  width: 280px;
  margin-top: 15px;
  margin-bottom: 20px;
  border-radius: 20px;
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 557px;
  }
`
const ProgressBar = styled.div`
  height: 18px;
  width: 100%;
  border-radius: 20px;
  background: #c4c4c4;
`

const Progress = styled(ProgressBar)<{ percentComplete: string }>`
  width: ${(props) => props.percentComplete};
  background: linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%);
`

const AfterSale: React.FC<BeforeSaleProps> = ({ hardcap, baseToken, iazoToken, status, iazoAddress, iazoState }) => {
  const { symbol, decimals } = baseToken
  const [pendingUserInfo, setPendingUserInfo] = useState(true)
  const { account } = useWeb3React()
  const { tokensBought, deposited }: UserCommit = useFetchUserIazoCommit(iazoAddress, pendingUserInfo)
  const tokensBoughtFormatted = getBalanceNumber(new BigNumber(tokensBought), parseInt(iazoToken.decimals))
  const baseTokensDeposited = getBalanceNumber(new BigNumber(deposited), parseInt(decimals))
  const hardcapFormatted = getBalanceNumber(new BigNumber(hardcap), parseInt(decimals))


  const { totalBaseCollected } = status
  const baseCollectedFormatted = getBalanceNumber(new BigNumber(totalBaseCollected), parseInt(decimals))
  const percentRaised = (baseCollectedFormatted / parseFloat(hardcap)) * 100
  const iazoFailed = iazoState === 'FAILED'

  const onPendingClaim = useCallback((pendingTrx: boolean) => {
    setPendingUserInfo(pendingTrx)
  }, [])

  return (
    <BeforeSaleWrapper>
      <Heading>
        {baseCollectedFormatted} / {hardcapFormatted} {symbol}
      </Heading>
      <ProgressBarWrapper>
        <ProgressBar>
          <Progress percentComplete={`${percentRaised}%`} />
        </ProgressBar>
      </ProgressBarWrapper>
      {iazoFailed ? (
        <BoldAfterTextLarge>IAZO failed please claim your refund</BoldAfterTextLarge>
      ) : (
        <BoldAfterTextLarge boldContent={`${tokensBoughtFormatted.toString()} ${iazoToken.symbol}`}>
          Tokens bought:{' '}
        </BoldAfterTextLarge>
      )}
      {account ? (
        <ClaimIazo
          iazoAddress={iazoAddress}
          tokensToClaim={tokensBoughtFormatted}
          baseTokensToClaim={baseTokensDeposited}
          onPendingClaim={onPendingClaim}
          iazoState={iazoState}
        />
      ) : (
        <>
          <br />
          <UnlockButton />
          <br />
        </>
      )}
    </BeforeSaleWrapper>
  )
}

export default React.memo(AfterSale)
