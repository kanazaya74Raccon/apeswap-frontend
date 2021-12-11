import React, { useState, useCallback } from 'react'
import { Skeleton } from '@apeswapfinance/uikit'
import { IazoStatus, IazoTimeInfo, IazoTokenInfo } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import UnlockButton from 'components/UnlockButton'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import getTimePeriods from 'utils/getTimePeriods'
import useFetchUserIazoCommit, { UserCommit } from 'views/Iazos/hooks/useFetchUserIazoCommit'
import Timer from '../../IazoCard/Timer'
import Actions from '../../Actions'
import IazoSymbols from '../../IazoSymbols'
import { BoldAfterTextLarge, Heading } from '../../styles'
import { Wrapper, ProgressBarWrapper, ProgressBar, IazoSymbolsContainer, Progress } from './styles'

interface BeforeSaleProps {
  timeInfo: IazoTimeInfo
  hardcap: string
  baseToken: IazoTokenInfo
  iazoToken: IazoTokenInfo
  status: IazoStatus
  iazoAddress: string
  tokenPrice: string
  liquidityPercent: string
  maxSpend: string
}

const DuringSale: React.FC<BeforeSaleProps> = ({
  timeInfo,
  hardcap,
  baseToken,
  status,
  iazoAddress,
  iazoToken,
  tokenPrice,
  liquidityPercent,
  maxSpend,
}) => {
  const { symbol, decimals } = baseToken
  const { totalBaseCollected, numBuyers } = status
  const { lockPeriod } = timeInfo
  const { account } = useWeb3React()
  const [pendingUserInfo, setPendingUserInfo] = useState(true)
  const { deposited, tokensBought }: UserCommit = useFetchUserIazoCommit(iazoAddress, pendingUserInfo)
  const tokensDepositedFormatted = getBalanceNumber(new BigNumber(deposited), parseInt(decimals))
  const tokensBoughtFormatted = getBalanceNumber(new BigNumber(tokensBought), parseInt(iazoToken.decimals))
  const baseCollectedFormatted = getBalanceNumber(new BigNumber(totalBaseCollected), parseInt(decimals))
  const hardcapFormatted = getBalanceNumber(new BigNumber(hardcap), parseInt(decimals))
  const maxSpendFormatted = getBalanceNumber(new BigNumber(maxSpend), parseInt(decimals))
  const percentRaised = (baseCollectedFormatted / hardcapFormatted) * 100
  const daysLocked = getTimePeriods(parseInt(lockPeriod), true)
  const liquidityPercentFormatted = parseInt(liquidityPercent) / 10

  const onPendingContribute = useCallback((pendingTrx: boolean) => {
    setPendingUserInfo(pendingTrx)
  }, [])

  return (
    <Wrapper>
      <Heading>
        {baseCollectedFormatted.toString() === 'NaN' ? (
          <Skeleton width="200px" height="30px" />
        ) : (
          `${baseCollectedFormatted} / ${hardcapFormatted} ${symbol}`
        )}
      </Heading>
      <ProgressBarWrapper>
        <ProgressBar>
          <Progress percentComplete={`${percentRaised.toString() === 'NaN' ? 0 : percentRaised}%`} />
        </ProgressBar>
      </ProgressBarWrapper>
      <Timer timeInfo={timeInfo} />
      {tokensDepositedFormatted > 0 && (
        <>
          <br />
          <BoldAfterTextLarge boldContent={`${tokensBoughtFormatted.toString()} ${iazoToken.symbol}`}>
            Tokens bought:{' '}
          </BoldAfterTextLarge>
          <BoldAfterTextLarge boldContent={`${tokensDepositedFormatted.toString()} ${symbol}`}>
            Amount contributed:{' '}
          </BoldAfterTextLarge>
        </>
      )}
      {account ? (
        <Actions
          iazoAddress={iazoAddress}
          baseToken={baseToken}
          onPendingContribute={onPendingContribute}
          disabled={percentRaised >= 100 || tokensDepositedFormatted === maxSpendFormatted}
          maxSpendFormatted={maxSpendFormatted}
        />
      ) : (
        <>
          <br />
          <UnlockButton />
          <br />
        </>
      )}
      <IazoSymbolsContainer>
        <IazoSymbols iconImage="dollar" title={`${tokenPrice} ${symbol}`} description="Presale price" />
        <IazoSymbols
          iconImage="lock"
          title={`${liquidityPercentFormatted}%`}
          description={`Locked for ${daysLocked.days} days`}
        />
        <IazoSymbols iconImage="monkey" title={numBuyers} description="Participants" />
      </IazoSymbolsContainer>
    </Wrapper>
  )
}

export default React.memo(DuringSale)
