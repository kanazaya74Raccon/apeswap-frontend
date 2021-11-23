import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { IazoStatus, IazoTimeInfo, IazoTokenInfo } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import useCurrentTime from 'hooks/useTimer'
import useFetchUserIazoCommit, { UserCommit } from 'views/Iazos/hooks/useFetchUserIazoCommit'
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
}

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

const SaleStatus: React.FC<SaleStatus> = ({
  timeInfo,
  hardcap,
  baseToken,
  status,
  iazoAddress,
  tokenPrice,
  iazoToken,
}) => {
  const userCommitData: UserCommit = useFetchUserIazoCommit(iazoAddress)
  const { activeTime, startTime } = timeInfo
  const currentTime = useCurrentTime() / 1000
  const endTime = parseInt(activeTime) + parseInt(startTime)
  const timeUntilStart = parseInt(startTime) - currentTime
  const timeUntilEnd = endTime - currentTime
  console.log(userCommitData)

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
          tokenPrice={tokenPrice}
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
        tokenPrice={tokenPrice}
        userCommitData={userCommitData}
        iazoTokenDecimals={iazoToken.decimals}
      />
    )
  }
  return <SaleStatusContainer>{renderSaleStatus()}</SaleStatusContainer>
}

export default SaleStatus
