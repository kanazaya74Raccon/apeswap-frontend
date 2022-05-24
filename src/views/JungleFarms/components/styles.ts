import { ArrowDropUpIcon } from '@apeswapfinance/uikit'
import { Button, Flex } from '@ape.swap/uikit'
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
  flex-direction: row;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

export const ActionContainer = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.md} {
    width: fit-content;
  }
`
