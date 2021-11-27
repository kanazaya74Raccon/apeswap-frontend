import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { IazoStatus, IazoTimeInfo, IazoTokenInfo } from 'state/types'
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
}) => {
  const { activeTime, startTime } = timeInfo
  const { symbol, decimals } = baseToken
  const currentTime = useCurrentTime() / 1000
  const endTime = parseInt(activeTime) + parseInt(startTime)
  const timeUntilStart = parseInt(startTime) - currentTime
  const timeUntilEnd = endTime - currentTime
  const tokenPriceFormatted = getBalanceNumber(new BigNumber(tokenPrice), parseInt(decimals)).toString()
  console.log("yeeee")


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
    if (timeUntilEnd > 0) {
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
      />
    )
  }
  return <SaleStatusContainer>{renderSaleStatus()}</SaleStatusContainer>
}

export default React.memo(SaleStatus)
