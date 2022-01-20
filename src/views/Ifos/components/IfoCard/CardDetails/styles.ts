import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

export const StyledIfoCardDetails = styled.div`
  margin: 12px 0;
  border-radius: 5px;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 320px;
  }
`

export const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  padding: 4px 10px;
  gap: 16px;
  background: #7c7c7d0f;

  &:first-child {
    border-radius: 5px 5px 0px 0px;
  }

  &:last-child {
    border-radius: 0px 0px 5px 5px;
  }

  &:nth-child(even) {
    background: #7c7c7d08;
  }
`

export const Display = styled(Text)`
  flex: 1;
  font-size: 14px;
  font-weight: 700;
`