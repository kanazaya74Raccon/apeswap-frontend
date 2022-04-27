import styled, { keyframes } from 'styled-components'
import { Heading } from '@apeswapfinance/uikit'

const float = keyframes`
  0% {transform: translate3d(0px, 0px, 0px);}
  50% {transform: translate3d(50px, 0px, 0px);}
  100% {transform: translate3d(0px, 0px, 0px);}
`
const floatSM = keyframes`
  0% {transform: translate3d(0px, 0px, 0px);}
  50% {transform: translate3d(10px, 0px, 0px);}
  100% {transform: translate3d(0px, 0px, 0px);}
`

export const HeadingContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

export const Header = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/pool-background-night.svg)' : 'url(/images/pool-background-day.svg)'};
  background-repeat: no-repeat;
  background-size: cover;
  height: 250px;
  background-position: center;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 300px;
    padding-left: 24px;
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 10px;
    padding-right: 10px;
    height: 300px;
  }
`

export const StyledHeading = styled(Heading)`
  font-size: 32px;
  max-width: 176px !important;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 36px;
    max-width: 240px !important;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 44px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
  }
`

export const PoolMonkey = styled.div`
  background-image: ${({ theme }) => (theme.isDark ? 'url(/images/pool-ape-night.svg)' : 'url(/images/pool-ape.svg)')};
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
`

export const MonkeyWrapper = styled.div`
  position: absolute;
  width: 225px;
  height: 275px;
  margin-left: auto;
  margin-right: auto;
  bottom: 0px;
  right: 0px;
  animation: 5s ${floatSM} linear infinite;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 24px;
    padding-right: 24px;
    animation: 10s ${float} linear infinite;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 575px;
    height: 800px;
    top: ${({ theme }) => (theme.isDark ? '-120px' : '-80px')};
    right: 0;
    animation: 10s ${float} linear infinite;
  }
`
