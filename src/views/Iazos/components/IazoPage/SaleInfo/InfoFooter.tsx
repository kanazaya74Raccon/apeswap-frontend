import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import IazoSymbols from '../../IazoSymbols'

const InfoWrapper = styled.div`
  display: flex;
  width: 796px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding-right: 50px;
  padding-left: 50px;
`
const StyledText = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 20px;
`

const InfoFooter: React.FC = () => {
  return (
    <>
      <StyledText> Presale info </StyledText>
      <InfoWrapper>
        <IazoSymbols iconImage="website" />
        <IazoSymbols iconImage="whitepaper" />
        <IazoSymbols iconImage="telegram" />
        <IazoSymbols iconImage="twitter" />
        <IazoSymbols iconImage="medium" />
      </InfoWrapper>
    </>
  )
}

export default InfoFooter
