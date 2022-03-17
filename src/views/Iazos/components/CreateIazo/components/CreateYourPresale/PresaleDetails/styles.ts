import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

export const LaunchPadInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 800px;
  width: 280px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white4};
  margin-bottom: 30px;
  align-items: space-between;
  justify-content: center;
  padding: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 686px;
    height: 524px;
  }
`

export const StyledHeader = styled(Text)`
  font-size: 18px;
  line-height: 27px;
  margin-top: 15px;
  font-weight: 700;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 22px;
  }
`

export const CheckboxContainer = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`

export const FooterContainer = styled.div`
  display: flex;
  width: 450px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
`

export const StyledText = styled(Text)`
  font-size: 12px;
  font-weight: 400;
  margin-left: 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`
