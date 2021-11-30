import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import { IazoStatus, IazoTimeInfo, IazoTokenInfo } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import UnlockButton from 'components/UnlockButton'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import getTimePeriods from 'utils/getTimePeriods'
import { useTokenPriceFromAddress } from 'state/hooks'
import useFetchUserIazoCommit, { UserCommit } from 'views/Iazos/hooks/useFetchUserIazoCommit'
import Timer from '../../IazoCard/Timer'
import Actions from '../../Actions'
import IazoSymbols from '../../IazoSymbols'

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

const BeforeSaleWrapper = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

const Heading = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 25px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 30px;
  }
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

const IazoSymbolsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    align-items: flex-start;
    justify-content: space-between;
  }
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

const Progress = styled(ProgressBar)<{ percentComplete: string }>`
  width: ${(props) => props.percentComplete};
  background: linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%);
`

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
  const { symbol, decimals, address } = baseToken
  const { totalBaseCollected, numBuyers } = status
  const { lockPeriod } = timeInfo
  const { account } = useWeb3React()
  const [pendingUserInfo, setPendingUserInfo] = useState(true)
  const { deposited, tokensBought }: UserCommit = useFetchUserIazoCommit(iazoAddress, pendingUserInfo)
  const tokensDepositedFormatted = getBalanceNumber(new BigNumber(deposited), parseInt(decimals))
  const tokensBoughtFormatted = getBalanceNumber(new BigNumber(tokensBought), parseInt(iazoToken.decimals))
  const baseCollectedFormatted = getBalanceNumber(new BigNumber(totalBaseCollected), parseInt(decimals))
  const maxSpendFormatted = getBalanceNumber(new BigNumber(maxSpend), parseInt(decimals))
  const percentRaised = (baseCollectedFormatted / parseFloat(hardcap)) * 100
  const baseTokenPrice = useTokenPriceFromAddress(address)
  const tokenPriceFormatted =
    baseTokenPrice && (getBalanceNumber(new BigNumber(tokenPrice), parseInt(decimals)) * baseTokenPrice).toString()
  const daysLocked = getTimePeriods(parseInt(lockPeriod), true)
  const liquidityPercentFormatted = parseInt(liquidityPercent) / 10

  const onPendingContribute = useCallback((pendingTrx: boolean) => {
    setPendingUserInfo(pendingTrx)
  }, [])

  return (
    <BeforeSaleWrapper>
      <Heading>
        {baseCollectedFormatted} / {hardcap} {symbol}
      </Heading>
      <ProgressBarWrapper>
        <ProgressBar>
          <Progress percentComplete={`${percentRaised}%`} />
        </ProgressBar>
      </ProgressBarWrapper>
      <Timer timeInfo={timeInfo} />
      {tokensDepositedFormatted > 0 && (
        <>
          <br />
          <BoldAfterText boldContent={`${tokensBoughtFormatted.toString()} ${iazoToken.symbol}`}>
            Tokens bought:{' '}
          </BoldAfterText>
          <BoldAfterText boldContent={`${tokensDepositedFormatted.toString()} ${symbol}`}>
            Amount contributed:{' '}
          </BoldAfterText>
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
        <IazoSymbols iconImage="dollar" title={tokenPrice} description="Presale price" />
        <IazoSymbols
          iconImage="lock"
          title={`${liquidityPercentFormatted}%`}
          description={`Locked for ${daysLocked.days} days`}
        />
        <IazoSymbols iconImage="monkey" title={numBuyers} description="Participants" />
      </IazoSymbolsContainer>
    </BeforeSaleWrapper>
  )
}

export default React.memo(DuringSale)
