import { Flex, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const ListViewContentContainer = styled(Flex)<{ width?: number }>`
    flex-direction: column;
    align-items: flex-start:
    border: 1px solid green;
    justify-content: flex-start;
    height: 100%;
    max-width: ${({ width }) => width || 100}px;
    width: 100%;
`

export const TitleText = styled(Text)`
  opacity: 0.6;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.lg} {
  }
`

export const ValueText = styled(Text)`
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 16px;
  }
`

export const IconImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`
