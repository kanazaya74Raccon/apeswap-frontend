import styled from 'styled-components'
import { Button } from '@apeswapfinance/uikit'

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.white4} !important;
  height: 40px;
  width: 135px;
  font-size: 14px;
  font-weight: 700;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 200px;
    height: 50px;
    font-size: 16px;
  }
`
export default StyledButton
