import styled from 'styled-components'
import { ButtonSquare, Text } from '@apeswapfinance/uikit'

const StyledButton = styled(ButtonSquare)`
  height: 50px;
  width: 150px;
  font-size: 14px;
  font-family: Poppins;
  font-weight: 700;
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 200px;
    font-size: 16px;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const BoldAfterText = styled(Text)<{ boldContent?: string }>`
  font-family: poppins;
  font-weight: 400;
  font-size: 13px;
  &:after {
    font-weight: 700;
    font-size: 14px;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 17px;
    }
    content: '${(props) => props.boldContent}';
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 50px;
`

export default StyledButton
