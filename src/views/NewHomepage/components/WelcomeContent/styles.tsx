import { Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  align-self: center;
  justify-content: space-between;
  text-align: center;
  max-width: 1412px;
  width: 95vw;
  height: 400px;
  margin-bottom: 175px;
  top: 100px;
  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: left;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0px 100px 0px 100px;
    width: 100vw;
  }
`

export const HeadingText = styled(Text)`
  font-size: 35px;
  color: white;
  line-height: 60px;
  font-weight: 700;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 40px;
    line-height: 50px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    font-size: 60px;
    line-height: 70px;
  }
`
