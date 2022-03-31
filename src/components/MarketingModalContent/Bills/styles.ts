import styled from 'styled-components'
import { Text, LendingM1Icon } from '@apeswapfinance/uikit'

export const Description = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0em 1.5em;
  line-height: 14px;
`
export const ModalBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const StyledText = styled(Text)`
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  text-align: center;
  margin: 0.5em 0;
`
export const TextButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.yellow};
  text-decoration: underline;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  margin: 0.5em 0;

  &:hover {
    cursor: pointer;
  }
`
export const RightContent = styled.div``

export const StyledLendingM1Icon = styled(LendingM1Icon)`
  ${({ theme }) => theme.mediaQueries.md} {
  }
`
