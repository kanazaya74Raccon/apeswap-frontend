import styled from 'styled-components'
import { Button, Text, Flex, Input } from '@apeswapfinance/uikit'

export const Label = styled(Text)`
  font-size: 12px;
  font-weight: 500;
`

export const Box = styled(Flex)`
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 12px;
`

export const ContributeButton = styled(Button)`
  margin-left: 16px;
`

export const ContributeInput = styled(Input)`
  background-color: ${({ theme }) => (theme.isDark ? '#424242' : '#e5e5e5')};
`
