import { ButtonSquare, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  align-self: center;
  justify-content: space-between;
  text-align: center;
  max-width: 1412px;
  width: 95vw;
  height: 300px;
  margin-bottom: 100px;
  top: 100px;
  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: left;
    height: 300px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    height: 400px;
    margin-bottom: 175px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 95vw;
    padding-top: 50px;
  }
`

export const HeadingText = styled(Text)`
  font-size: 35px;
  line-height: 40px;
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

export const BuyBanana = styled(ButtonSquare)`
  font-size: 16px;
  font-weight: 700;
  height: 44px;
  width: 100%;
  line-height: 5px;
  background-color: ${({ theme }) => (theme.isDark ? theme.colors.yellow : theme.colors.text)};
  ${({ theme }) => theme.mediaQueries.md} {
    width: 204px;
  }
  :hover {
    background-color: ${({ theme }) => (theme.isDark ? theme.colors.yellow : theme.colors.text)} !important;
    opacity: 0.7;
  }
`

export const LearnMore = styled(ButtonSquare)`
  font-size: 16px;
  font-weight: 700;
  height: 44px;
  line-height: 5px;
  width: 100%;
  margin-top: 10px;
  border: 3px solid ${({ theme }) => (theme.isDark ? theme.colors.yellow : theme.colors.text)};
  color: ${({ theme }) => (theme.isDark ? theme.colors.yellow : theme.colors.text)};
  background-color: rgb(0, 0, 0, 0);
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 204px;
    margin-top: 0px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 204px;
    margin-top: 0px;
  }
  :hover {
    background-color: rgb(0, 0, 0, 0) !important;
    border: 3px solid ${({ theme }) => (theme.isDark ? theme.colors.yellow : theme.colors.text)} !important;
    color: ${({ theme }) => (theme.isDark ? theme.colors.yellow : theme.colors.text)} !important;
    opacity: 0.7;
  }
`
