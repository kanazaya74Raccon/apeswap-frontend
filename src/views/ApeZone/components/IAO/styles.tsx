import styled from 'styled-components'
import { Card, Flex, BaseLayout } from '@apeswapfinance/uikit'

export const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

export const StyledHeroHeading = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 99px;
  padding-top: 49px;
  padding-left: 53px;
  padding-right: 53px;
`

export const StyledHeroSection = styled.div`
  background-color: #a16552;
`

export const StyledFlex = styled(Flex)`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 28px;
  margin-top: -100px;
  padding-left: 20px;
  padding-right: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: -90px;
    padding-left: 53px;
    padding-right: 53px;
  }
`

export const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin: 32px 0px;
  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

export const StyledCard = styled(Card)`
  padding: 24px;
`

export const StyledTextContainer = styled.div`
  margin-top: 28px;
  margin-bottom: 28px;
`

export const StyledGoldenMonkey = styled.img`
  width: 100%;
  height: 200px;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.mediaQueries.lg} {
    height: 300px;
  }
`
