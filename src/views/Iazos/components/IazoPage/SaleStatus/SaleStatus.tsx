import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { IazoStatus, IazoTimeInfo, IazoTokenInfo } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import useCurrentTime from 'hooks/useTimer'
import BigNumber from 'bignumber.js'
import Timer from '../../IazoCard/Timer'
import DuringSale from './DuringSale'
import BeforeSale from './BeforeSale'
import IazoSymbols from '../../IazoSymbols'

interface SaleStatus {
  timeInfo: IazoTimeInfo
  hardcap: string
  baseToken: IazoTokenInfo
  status: IazoStatus
  iazoAddress: string
}

const IazoSymbolWrapper = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  margin-left: 10px;
`

const IazoSymbolsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
`

const SaleStatusContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 796px;
  flex-direction: row;
  align-items: space-between;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: center;
`

const SaleStatus: React.FC<SaleStatus> = ({ timeInfo, hardcap, baseToken, status, iazoAddress }) => {
  const { activeTime, startTime } = timeInfo
  const currentTime = useCurrentTime() / 1000
  const endTime = parseInt(activeTime) + parseInt(startTime)
  const timeUntilStart = parseInt(startTime) - currentTime
  const timeUntilEnd = endTime - currentTime

  const renderSaleStatus = () => {
    if (timeUntilStart > 0) {
      return <BeforeSale timeInfo={timeInfo} status={status} />
    }
    if (timeUntilEnd > 0) {
      return (
        <DuringSale
          timeInfo={timeInfo}
          hardcap={hardcap}
          baseToken={baseToken}
          status={status}
          iazoAddress={iazoAddress}
        />
      )
    }
    return <></>
  }
  return <SaleStatusContainer>{renderSaleStatus()}</SaleStatusContainer>
}

export default SaleStatus
