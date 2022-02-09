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
  color: ${({ theme }) => theme.colors.success};
  display: flex;
  padding: 4px 10px;
  gap: 16px;
  background: ${({ theme }) => theme.colors.white4};

  &:first-child {
    border-radius: 5px 5px 0px 0px;
  }

  &:last-child {
    border-radius: 0px 0px 5px 5px;
  }

  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.white3};
  }
`

export const Display = styled(Text)`
  flex: 1;
  font-size: 14px;
  font-weight: 600;
`
