import styled from 'styled-components'
import { Button, Text } from '@apeswapfinance/uikit'

export const VestingClaimButton = styled(Button)`
  width: 220px;
  height: 44px;
  background-color: secondary;
  margin: 0 auto;
  flex-shrink: 0;
  background: #ffb300;
  padding: 0;
  :focus {
    outline: none !important;
    box-shadow: none !important;
    background: #ffb300;
  }
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
`

export const Claim = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 20px;
  }
`

export const TextWrapRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`