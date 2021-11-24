import React from 'react'
import styled from 'styled-components'
import { IazoSocialInfo } from 'state/types'
import { Text } from '@apeswapfinance/uikit'
import IazoSymbols from '../../IazoSymbols'

interface InfoFooterProps {
  social: IazoSocialInfo
}

const InfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  margin-bottom: 60px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding-right: 25px;
  padding-left: 25px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
    padding-right: 50px;
    padding-left: 50px;
    justify-content: space-between;
  }
`
const StyledText = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 45px;
`

const InfoFooter: React.FC<InfoFooterProps> = ({ social }) => {
  const { website, whitepaper, telegram, twitter, medium } = social
  return (
    <>
      <StyledText> Presale info </StyledText>
      <InfoWrapper>
        <IazoSymbols iconImage="website" url={website} link />
        <IazoSymbols iconImage="whitepaper" url={whitepaper} link />
        <IazoSymbols iconImage="telegram" url={telegram} link />
        <IazoSymbols iconImage="twitter" url={twitter} link />
        <IazoSymbols iconImage="medium" url={medium} link />
      </InfoWrapper>
    </>
  )
}

export default InfoFooter
