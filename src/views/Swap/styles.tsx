import { Flex, Button } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'

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

export const LargeStyledButton = styled(Button)`
  font-weight: 700;
  font-size: 17px;
  width: 100%;
  height: 60px;
  border-radius: 20px;
  margin-top: 10px;
  text-transform: uppercase;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
  }
`

export const ExpertButton = styled(Button)`
  position: absolute;
  font-size: 10px;
  right: -20px;
  margin-top: 1px;
  ${({ theme }) => theme.mediaQueries.md} {
    right: 8px;
    font-size: 14px;
  }
`
