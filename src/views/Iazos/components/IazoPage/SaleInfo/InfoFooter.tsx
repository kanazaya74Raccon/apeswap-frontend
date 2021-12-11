import React from 'react'
import { IazoSocialInfo } from 'state/types'
import IazoSymbols from '../../IazoSymbols'
import { InfoFooterWrapper, StyledText } from './styles'

interface InfoFooterProps {
  social: IazoSocialInfo
}

const InfoFooter: React.FC<InfoFooterProps> = ({ social }) => {
  const { website, whitepaper, telegram, twitter, medium } = social
  return (
    <>
      <StyledText> Presale info </StyledText>
      <InfoFooterWrapper>
        <IazoSymbols iconImage="website" url={website} link />
        <IazoSymbols iconImage="whitepaper" url={whitepaper} link />
        <IazoSymbols iconImage="telegram" url={telegram} link />
        <IazoSymbols iconImage="twitter" url={twitter} link />
        <IazoSymbols iconImage="medium" url={medium} link />
      </InfoFooterWrapper>
    </>
  )
}

export default InfoFooter
