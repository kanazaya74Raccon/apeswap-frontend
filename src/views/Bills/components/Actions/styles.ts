import { Button, Flex, Input, Text } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'

export const GetLPButton = styled(Button)`
  height: 50px;
  width: 100%;
  border: 3px solid ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.yellow};
  :hover {
    border: 3px solid yellow;
  }
  @media screen and (min-width: 1180px) {
    height: 69px;
    width: auto;
  }
`

export const BuyButton = styled(Button)`
  width: 100%;
  height: 50px;
  font-weight: 700;
  @media screen and (min-width: 1180px) {
    width: 170px;
    height: 69px;
  }
`

export const StyledInput = styled(Input)`
  height: 69px;
  width: 100%;
  border: none;
  padding: 0px 80px 22.5px 67px;
  font-size: 14px;
  font-weight: 700;
  @media screen and (min-width: 1180px) {
    width: 197px;
    height: 69px;
    padding: 0px 50px 22.5px 67px;
  }
`

export const MaxButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  z-index: 1;
  border-radius: 6px;
`
