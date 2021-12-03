import { Flex } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean }>`
  flex-shrink: 0;
  height: fit-content;
  ${({ $isChartExpanded }) => ($isChartExpanded ? 'padding: 0 40px' : 'padding: 0 40px')};

  ${({ theme }) => theme.mediaQueries.lg} {
    ${({ $isChartExpanded }) => ($isChartExpanded ? 'padding: 0 120px' : 'padding: 0 40px')};
  }
`

export const StyledInputCurrencyWrapper = styled.div`
  width: 328px;
`
