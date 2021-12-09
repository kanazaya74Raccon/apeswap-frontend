import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

export const DateContainer = styled.div`
  width: 300px;
  border-radius: 10px;
  background: ${(props) => (props.theme.isDark ? '#333333' : '#E5E5E5')};
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`
export const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  line-height: 27px;
  font-weight: 700;
  margin-top: 25px;
`

export const StyledText = styled(Text)`
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0.05em;
  text-align: left;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 22px;
  }
`

export const StyledSubText = styled(Text)`
  font-family: Poppins;
  font-size: 12px;
  line-height: 24px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  aling-items: flex-start;
  height 80px;
  width: 400px;
  margin-left: 35px;
`

export const DateButtonContainer = styled.div`
  position: absolute;
  right: 50px;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
`

export const DateSelectionContainer = styled.div`
  position: relative;
  display: flex;
  height: 135px;
  background: ${(props) => (props.theme.isDark ? '#444444' : 'white')};
  width: 280px;
  border-radius: 10px;
  margin-top: 15px;
  align-items: center;
  margin-bottom: 20px;
  z-index: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 686px;
  }
`
