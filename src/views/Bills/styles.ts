import { Flex, Heading } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const Container = styled(Flex)``
export const HeadingContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

export const Header = styled.div`
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  height: 250px;
  background-position: center;
  background-image: ${({ theme }) => (theme.isDark ? 'url(/images/bills_night.svg)' : 'url(/images/bills_day.svg)')};
  background-repeat: no-repeat;
  background-size: cover;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 24px;
    padding-right: 24px;
    height: 300px;
  }
`

export const StyledHeading = styled(Heading)`
  font-size: 30px;
  max-width: 176px !important;
  color: white;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 30px;
    max-width: 240px !important;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 44px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
  }
`
