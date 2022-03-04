import styled from 'styled-components'
import { ButtonSquare, ArrowDropUpIcon, Flex } from '@apeswapfinance/uikit'

export const StyledButton = styled(ButtonSquare)`
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  min-width: 100px;
  height: 44px;
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 190px;
  }
`

export const NextArrow = styled(ArrowDropUpIcon)`
  transform: rotate(90deg);
`

export const Container = styled(Flex)`
  position: relative;
  transform: translateY(-40px);
  flex-direction: column;
`
