import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

export const StyledProgress = styled.div`
  margin-bottom: 16px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  align-items: center;
  width: 100%;
  

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 320px;
  }
`

export const ProgressBar = styled.div`
  width: 100%;
`

export const Label = styled(Text)`
  font-weight: 700;
`