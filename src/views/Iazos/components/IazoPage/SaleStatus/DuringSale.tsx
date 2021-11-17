import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { IazoStatus, IazoTimeInfo, IazoTokenInfo } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import Timer from '../../IazoCard/Timer'
import Actions from '../../Actions'
import IazoSymbols from '../../IazoSymbols'

interface BeforeSaleProps {
  timeInfo: IazoTimeInfo
  hardcap: string
  baseToken: IazoTokenInfo
  status: IazoStatus
  iazoAddress: string
}

const BeforeSaleWrapper = styled.div`
  width: 796px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Heading = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 30px;
`

const ProgressBarWrapper = styled.div`
  width: 557px;
  margin-top: 15px;
  margin-bottom: 20px;
  border-radius: 20px;
  overflow: hidden;
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
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 100px;
`

const Progress = styled(ProgressBar)<{ percentComplete: string }>`
  width: ${(props) => props.percentComplete};
  background: linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%);
`

const DuringSale: React.FC<BeforeSaleProps> = ({ timeInfo, hardcap, baseToken, status, iazoAddress }) => {
  const { symbol, decimals } = baseToken
  const { totalBaseCollected } = status
  const hardcapFormatted = getBalanceNumber(new BigNumber(hardcap), parseInt(decimals))
  const baseCollectedFormatted = getBalanceNumber(new BigNumber(totalBaseCollected), parseInt(decimals))
  const percentRaised = (baseCollectedFormatted / hardcapFormatted) * 100

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
      <Timer timeInfo={timeInfo} />
      <Actions iazoAddress={iazoAddress} baseToken={baseToken} />
      <IazoSymbolsContainer>
        <IazoSymbols iconImage="dollar" />
        <IazoSymbols iconImage="lock" />
      </IazoSymbolsContainer>
    </BeforeSaleWrapper>
  )
}

export default DuringSale
