import { Flex, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const ListViewContentContainer = styled(Flex)<{ width?: number }>`
    flex-direction: column;
    align-items: flex-start:
    justify-content: flex-start;
    height: 100%;
    width: ${({ width }) => width || 100}px;
`

export const TitleText = styled(Text)`
  opacity: 0.6;
  font-size: 12px;
`

export const IconImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`
