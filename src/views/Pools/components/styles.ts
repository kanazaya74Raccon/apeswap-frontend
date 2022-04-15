import { ButtonSquare, ArrowDropUpIcon } from '@apeswapfinance/uikit'
import { Button, Flex, IconButton } from '@ape.swap/uikit'
import styled from '@emotion/styled'

export const StyledButton = styled(Button)`
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

export const ActionContainer = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.md} {
    width: fit-content;
  }
`
