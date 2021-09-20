import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { Iazo } from 'state/types'
import Graph from '../../Graph'

interface InfoTabProps {
  iazo: Iazo
}

const InfoWrapper = styled.div`
  display: flex;
  width: 796px;
  margin-bottom: 20px;
  background: #333333;
  border-radius: 0px 0px 10px 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const TokenName = styled(Text)`
  font-size: 24px;
  padding-left: 2px;
  align-self: flex-start;
  margin-top: 40px;
  margin-bottom: 20px;
  align-self: center;
`

const GraphWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  padding-right: 30px;
`

const GraphCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const GraphCard = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  height: 38px;
  width: 135px;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 30px;
`

const InfoTab: React.FC<InfoTabProps> = ({ iazo }) => {
  const { iazoToken } = iazo
  console.log(iazo)
  return (
    <InfoWrapper>
      <TokenName>{iazoToken?.name} Tokenomics</TokenName>
      <GraphWrapper>
        <Graph size={250} />
        <GraphCardWrapper>
          <GraphCard color="#FFB300">FOR SALE</GraphCard>
          <GraphCard color="#38A611">LIQUIDITY</GraphCard>
          <GraphCard color="#7A7A7A">DEV/OTHER</GraphCard>
        </GraphCardWrapper>
      </GraphWrapper>
    </InfoWrapper>
  )
}

export default InfoTab
