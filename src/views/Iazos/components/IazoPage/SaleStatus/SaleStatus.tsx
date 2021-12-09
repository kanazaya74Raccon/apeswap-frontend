import React from 'react'
import { IazoState, IazoStatus, IazoTimeInfo, IazoTokenInfo } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import useCurrentTime from 'hooks/useTimer'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import DuringSale from './DuringSale'
import AfterSale from './AfterSale'
import BeforeSale from './BeforeSale'
import CreatorAfter from './CreatorAfter'
import { SaleStatusContainer } from './styles'

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
  iazoOwner: string
}

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
  iazoOwner,
}) => {
  const { account } = useWeb3React()
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
    if (timeUntilStart > 0 && iazoState !== 'FAILED') {
      return (
        <BeforeSale
          timeInfo={timeInfo}
          baseTokenSymbol={symbol}
          tokenPrice={tokenPriceFormatted}
          liquidityPercent={liquidityPercent}
        />
      )
    }
    if (timeUntilEnd < 0 || iazoState === 'HARD_CAP_MET' || iazoState === 'FAILED') {
      if (account === iazoOwner) {
        return (
          <CreatorAfter
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
  return <SaleStatusContainer>{renderSaleStatus()}</SaleStatusContainer>
}

export default React.memo(SaleStatus)
