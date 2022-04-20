import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

export const MainBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
export const Description = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0em 1.5em;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 5em;
    margin-right: 5em;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 12em;
    margin-right: 12em;
  } ;
`
export const StyledText = styled(Text)`
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  text-align: center;
  margin: 0.5em 0;
`
export const StyledAnchor = styled.a`
  text-align: center;
`
export const TextButton = styled.a`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.yellow};
  text-decoration: underline;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  margin: 0.5em 0;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`
export const Hiw = styled(StyledText)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  margin-top: 1em;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0;
  } ;
`
export const MainContentBody = styled.div`
  display: flex;
  padding-left: 2em;
  padding-right: 2em;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 10em;
    padding-right: 10em;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 13em;
    padding-right: 13em;
  } ;
`
export const Surround = styled.div`
  @media screen and (max-width: 280px) {
    background-position: 10%;
  }

  display: flex;
  align-self: center;
  flex-direction: column;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/banners/line-bg-white.svg)' : 'url(/images/banners/line-bg.svg)'};
  background-repeat: no-repeat;
  background-position: 7%;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    background-position: 5%;
  }
`
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  margin-top: 1em;

  &:first-child {
    margin-top: 0;
  }
`
export const RightContent = styled.div`
  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0;
    width: 80%;
  } ;
`
export const RightHeader = styled(StyledText)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  margin: 0;
`
export const RightText = styled(StyledText)`
  margin: 0;
  text-align: left;
`
export const InnerTextButton = styled(TextButton)`
  margin: 0;
  padding: 0;
  text-align: left;
`
