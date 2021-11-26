import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Text, Button } from '@apeswapfinance/uikit'
import { Title } from 'views/DualFarms/components/FarmTable/Actions/styles'

interface IazoSymbolProps {
  iconImage: 'monkey' | 'lock' | 'dollar' | 'twitter' | 'medium' | 'website' | 'whitepaper' | 'telegram'
  title?: string
  description?: string
  link?: boolean
  url?: string
}

const icons = {
  monkey: 'url(/images/monkey-icon.svg)',
  lock: 'url(/images/lock.svg)',
  dollar: 'url(/images/dollar.svg)',
  twitter: 'url(/images/twitter.svg)',
  medium: 'url(/images/medium.svg)',
  website: 'url(/images/website.svg)',
  whitepaper: 'url(/images/whitepaper.svg)',
  telegram: 'url(/images/telegram.svg)',
}

const circleAnimation = keyframes`
    0%{stroke-dasharray: 0, 100}
`

const OuterCircle = styled.circle`
  animation: ${circleAnimation} 2s;
`

const IazoSymbolSvg = styled.svg`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const FullIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
`

const SvgContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`

const Icon = styled.div<{ iconImage: string }>`
  position: absolute;
  background-image: ${(props) => icons[props.iconImage]};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 45px;
  width: 45px;
  z-index: 2;
`

const StyledLink = styled.a`
  font-family: Poppins;
  color: rgba(255, 179, 0, 1);
  text-decoration: underline;
  margin-top: 5px;
`

const IazoSymbols: React.FC<IazoSymbolProps> = ({ iconImage, title, description, link, url }) => {
  const strokeWidth = 1
  const cx = 7.5
  const cy = 7.5
  const r = 6
  return (
    <FullIconContainer>
      <SvgContainer>
        <Icon iconImage={iconImage} />
        <IazoSymbolSvg viewBox="0 0 15 15">
          <circle cx={cx} cy={cy} r={r} fill="transparent" stroke="rgba(96, 96, 96, 1)" strokeWidth={strokeWidth} />
          <OuterCircle
            cx={cx}
            cy={cy}
            r={r}
            fill="transparent"
            stroke="rgba(255, 179, 0, 1)"
            strokeDasharray="38, 100"
            strokeWidth={strokeWidth}
            transform={`rotate(-90, ${cx}, ${cy})`}
          />
        </IazoSymbolSvg>
      </SvgContainer>
      <Text fontFamily="poppins" fontSize="24px" bold>
        {title}
      </Text>
      <Text fontFamily="poppins" fontSize="16px">
        {description}
      </Text>
      {link && (
        <StyledLink href={url} target="_blank" rel="noopener noreferrer">
          {iconImage}
        </StyledLink>
      )}
    </FullIconContainer>
  )
}

export default IazoSymbols
