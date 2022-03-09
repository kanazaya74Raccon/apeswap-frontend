import styled from 'styled-components'
import { ButtonSquare, ArrowDropUpIcon, Flex, Text } from '@apeswapfinance/uikit'

export const FarmButton = styled(ButtonSquare)`
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  min-width: 129px;
  height: 44px;
`

export const NextArrow = styled(ArrowDropUpIcon)`
  transform: rotate(90deg);
`

export const Container = styled(Flex)`
  position: relative;
  transform: translateY(-40px);
`

export const TitleText = styled(Text)`
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`
