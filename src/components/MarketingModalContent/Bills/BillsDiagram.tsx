import React from 'react'
import { BillsM1, BillsM2, BillsM3 } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'
import { Content, RightText, InnerTextButton, Surround, RightHeader, RightContent } from './styles'

const BillsDiagram: React.FC = () => {
  const theme = useTheme()

  return (
    <Surround>
      <Content>
        <BillsM1 width={50} bgColor={theme.theme.colors.white4} color={theme.theme.colors.text} />
        <RightContent>
          <RightHeader>Get LP</RightHeader>
          <RightText>
            <InnerTextButton href="https://apeswap.finance/add">Click here</InnerTextButton> to go to the liquidity
            provider. Select bill tokens and add liquidity.
          </RightText>
        </RightContent>
      </Content>

      <Content>
        <BillsM2 width={50} bgColor={theme.theme.colors.white4} color={theme.theme.colors.text} />
        <RightContent>
          <RightHeader>Select and Buy</RightHeader>
          <RightText>Select your preferenced bill, and click the buy button.</RightText>
        </RightContent>
      </Content>

      <Content>
        <BillsM3 width={50} bgColor={theme.theme.colors.white4} color={theme.theme.colors.text} />
        <RightContent>
          <RightHeader>Receive and Claim</RightHeader>
          <RightText>Receive your NFT, claim vested tokens or trade the NFT.</RightText>
        </RightContent>
      </Content>
    </Surround>
  )
}

export default BillsDiagram
