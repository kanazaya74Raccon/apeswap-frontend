import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { IazoState, IazoStatus, IazoTimeInfo, IazoTokenInfo } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import useCurrentTime from 'hooks/useTimer'
import BigNumber from 'bignumber.js'
import Timer from '../../IazoCard/Timer'
import DuringSale from './DuringSale'
import AfterSale from './AfterSale'
import BeforeSale from './BeforeSale'
import IazoSymbols from '../../IazoSymbols'

interface SaleStatus {
  timeInfo: IazoTimeInfo
  hardcap: string
  baseToken: IazoTokenInfo
  iazoToken: IazoTokenInfo
  status: IazoStatus
  iazoAddress: string
  tokenPrice: string
  liquidityPercent: string
  maxSpend: string
  iazoState: IazoState
}

const SaleStatusContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  flex-direction: row;
  align-items: space-between;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

const SaleStatus: React.FC<SaleStatus> = ({
  timeInfo,
  hardcap,
  baseToken,
  status,
  iazoAddress,
  tokenPrice,
  iazoToken,
  liquidityPercent,
  maxSpend,
  iazoState,
}) => {
  const { activeTime, startTime } = timeInfo
  const { symbol, decimals } = baseToken
  const currentTime = useCurrentTime() / 1000
  const endTime = parseInt(activeTime) + parseInt(startTime)
  const timeUntilStart = parseInt(startTime) - currentTime
  const timeUntilEnd = endTime - currentTime
  const normalizeTokenPrice = new BigNumber(tokenPrice).times(
    new BigNumber(10).pow(new BigNumber(parseInt(iazoToken?.decimals) - 18)),
  )
  const tokenPriceFormatted = getBalanceNumber(normalizeTokenPrice, parseInt(decimals)).toString()

  const renderSaleStatus = () => {
    if (timeUntilStart > 0) {
      return (
        <BeforeSale
          timeInfo={timeInfo}
          baseTokenSymbol={symbol}
          tokenPrice={tokenPriceFormatted}
          liquidityPercent={liquidityPercent}
        />
      )
    }
    if (timeUntilEnd > 0 && iazoState !== 'HARD_CAP_MET' && iazoState !== 'FAILED') {
      return (
        <DuringSale
          timeInfo={timeInfo}
          hardcap={hardcap}
          baseToken={baseToken}
          status={status}
          iazoAddress={iazoAddress}
          tokenPrice={tokenPriceFormatted}
          liquidityPercent={liquidityPercent}
          iazoToken={iazoToken}
          maxSpend={maxSpend}
        />
      )
    }
    return (
      <AfterSale
        timeInfo={timeInfo}
        hardcap={hardcap}
        baseToken={baseToken}
        status={status}
        iazoAddress={iazoAddress}
        tokenPrice={tokenPriceFormatted}
        iazoToken={iazoToken}
        iazoState={iazoState}
      />
    )
  }
  return <SaleStatusContainer>{renderSaleStatus()}</SaleStatusContainer>
}

export default React.memo(SaleStatus)
