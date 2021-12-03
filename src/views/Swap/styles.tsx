import { Flex } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean }>`
  flex-shrink: 0;
  height: fit-content;
  width: 680px;
  border: 1px solid red;
`

export const StyledInputCurrencyWrapper = styled.div`
  width: 680px;
  border: 1px solid red;
`
