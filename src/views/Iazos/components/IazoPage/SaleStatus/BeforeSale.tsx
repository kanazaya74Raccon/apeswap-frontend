import React from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@apeswapfinance/uikit'
import { IazoTimeInfo } from 'state/types'
import getTimePeriods from 'utils/getTimePeriods'
import Timer from '../../IazoCard/Timer'
import IazoSymbols from '../../IazoSymbols'

interface BeforeSaleProps {
  timeInfo: IazoTimeInfo
  baseTokenSymbol: string
  tokenPrice: string
  liquidityPercent: string
}

const BeforeSaleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const IazoSymbolsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 50px;
  padding-left: 7.5px;
`

const BeforeSale: React.FC<BeforeSaleProps> = ({ timeInfo, baseTokenSymbol, tokenPrice, liquidityPercent }) => {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs
  const { lockPeriod } = timeInfo
  const daysLocked = getTimePeriods(parseInt(lockPeriod), true)
  const liquidityPercentFormatted = parseInt(liquidityPercent) / 10
  console.log('render bender')
  return (
    <BeforeSaleWrapper>
      <Timer fontSize={isMobile ? '16px' : '24px'} timeInfo={timeInfo} />
      <IazoSymbolsContainer>
        <IazoSymbols iconImage="dollar" title={`${tokenPrice} ${baseTokenSymbol}`} description="Presale price" />
        <IazoSymbols
          iconImage="lock"
          title={`${liquidityPercentFormatted}%`}
          description={`Locked for ${daysLocked.days} days`}
        />
      </IazoSymbolsContainer>
    </BeforeSaleWrapper>
  )
}

export default React.memo(BeforeSale)
