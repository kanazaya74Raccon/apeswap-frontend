import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

export const InputWrapper = styled.div`
  width: 220px;
  height: 680px;
  margin-top: 50px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 720px;
    height: 480px;
    flex-wrap: nowrap;
    margin-top: 20px;
  }
`
export const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  text-align: left;
`

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
