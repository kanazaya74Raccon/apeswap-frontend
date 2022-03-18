import { ArrowDropUpSmallIcon, Skeleton } from '@apeswapfinance/uikit'
import Logo from 'components/Logo/Logo'
import styled from 'styled-components'

export const TokenContainer = styled(Logo)<{
  size?: number
  image?: string
  ml?: number
  mr?: number
  zIndex?: number
}>`
  width: ${({ size }) => size || 30}px;
  height: ${({ size }) => size || 30}px;
  margin-left: ${({ ml }) => ml}px;
  margin-right: ${({ mr }) => mr}px;
  z-index: ${({ zIndex }) => zIndex};
  border-radius: ${({ size }) => (size || 35) / 2}px;
  border: 1px solid white;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: ${({ size }) => size || 35}px;
    height: ${({ size }) => size || 35}px;
  }
`

export const EarnIcon = styled(ArrowDropUpSmallIcon)`
  transform: rotate(90deg);
  fill: white;
`

export const IconSkeleton = styled(Skeleton)<{ size?: number; ml?: number; mr?: number; zIndex?: number }>`
  width: ${({ size }) => size || 30}px;
  height: ${({ size }) => size || 30}px;
  margin-left: ${({ ml }) => ml}px;
  margin-right: ${({ mr }) => mr}px;
  z-index: ${({ zIndex }) => zIndex};
  border-radius: ${({ size }) => (size || 35) / 2}px;
  border: 1px solid white;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: ${({ size }) => size || 35}px;
    height: ${({ size }) => size || 35}px;
  }
`
