import styled from 'styled-components'
import { ButtonSquare } from '@apeswapfinance/uikit'

const StyledButton = styled(ButtonSquare)`
  height: 40px;
  width: 135px;
  font-size: 14px;
  font-family: Poppins;
  font-weight: 700;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 200px;
    height: 50px;
    font-size: 16px;
  }
`
export default StyledButton
