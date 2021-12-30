import { Flex, ButtonSquare } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const StyledSwapContainer = styled(Flex)`
  flex-shrink: 0;
  height: fit-content;
  width: 360px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 680px;
  }
`

export const StyledInputCurrencyWrapper = styled.div`
  width: 360px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 680px;
  }
`

export const LargeStyledButton = styled(ButtonSquare)`
  font-weight: 700;
  font-size: 20px;
  width: 100%;
  height: 60px;
  border-radius: 20px;
  margin-top: 10px;
`

