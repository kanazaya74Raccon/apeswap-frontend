import React from 'react'
import { useMatchBreakpoints } from '@apeswapfinance/uikit'
import { IazoTimeInfo } from 'state/types'
import getTimePeriods from 'utils/getTimePeriods'
import { useTranslation } from 'contexts/Localization'
import Timer from '../../IazoCard/Timer'
import IazoSymbols from '../../IazoSymbols'
import { Wrapper, IazoSymbolsContainer } from './styles'

interface BeforeSaleProps {
  timeInfo: IazoTimeInfo
  baseTokenSymbol: string
  tokenPrice: string
  liquidityPercent: string
}

const BeforeSale: React.FC<BeforeSaleProps> = ({ timeInfo, baseTokenSymbol, tokenPrice, liquidityPercent }) => {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs
  const { lockPeriod } = timeInfo
  const daysLocked = getTimePeriods(parseInt(lockPeriod), true)
  const { t } = useTranslation()
  const liquidityPercentFormatted = parseInt(liquidityPercent) / 10
  return (
    <Wrapper>
      <Timer fontSize={isMobile ? '16px' : '24px'} timeInfo={timeInfo} />
      <IazoSymbolsContainer>
        <IazoSymbols iconImage="dollar" title={`${tokenPrice} ${baseTokenSymbol}`} description={t('Presale price')} />
        <IazoSymbols
          iconImage="lock"
          title={`${liquidityPercentFormatted}%`}
          description={t('Locked for %days% days', { days: daysLocked.days })}
        />
      </IazoSymbolsContainer>
    </Wrapper>
  )
}

export default React.memo(BeforeSale)
