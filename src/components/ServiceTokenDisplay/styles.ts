import { ArrowDropUpSmallIcon } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const TokenContainer = styled.div<{ size?: number; image?: string; ml?: number; mr?: number; zIndex?: number }>`
  width: ${({ size }) => size || 35}px;
  height: ${({ size }) => size || 35}px;
  margin-left: ${({ ml }) => ml}px;
  margin-right: ${({ mr }) => mr}px;
  z-index: ${({ zIndex }) => zIndex};
  border-radius: ${({ size }) => (size || 35) / 2}px;
  background-image: ${({ image }) => `url(${image})`};
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid white;
`

export const EarnIcon = styled(ArrowDropUpSmallIcon)`
  transform: rotate(90deg);
`
