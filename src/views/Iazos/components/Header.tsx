import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

const HeaderWrapper = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  height: 251px;
  width: 100%;
  padding-top: 36px;
  background-image: ${(props) =>
    props.theme.isDark ? 'url(/images/iazo-banner-dark.svg)' : 'url(/images/iazo-banner-light.svg)'};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 300px;
  }
`

const HeadingText = styled(Text)`
  position: absolute;
  text-align: center;
  letter-spacing: 0.05em;
  color: #fafafa;
  width: 366px;
  height: 125px;
  font-family: Titan One;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 57px;
  text-align: center;
  letter-spacing: 0.05em;
  top: 5px;
  ${({ theme }) => theme.mediaQueries.xl} {
    top: 80px;
    margin-right: 525px;
    width: 585px;
    height: 80px;
    font-size: 60px;
    line-height: 20px;
  }
`

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <HeadingText>Self-Serve IAO</HeadingText>
    </HeaderWrapper>
  )
}

export default Header
