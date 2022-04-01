import React from 'react'
import { BillsM1, BillsM2, BillsM3 } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'
import { StyledText, Content, RightText, Description, TextButton, Hiw, MainContentBody, MainBody } from './styles'

const BillsBody1: React.FC = () => {
  const theme = useTheme()

  return (
    <MainBody>
      <Description>
        <StyledText>
          Treasury Bills allow users to purchase tokens at a discount in exchange for their liquidity provider (LP)
          tokens.
        </StyledText>
        <StyledText>
          Each Treasury Bill is a unique NFT that represents the purchased tokens, which vest over a certain amount of
          time.
        </StyledText>
        <TextButton>For more info, visit the Treasury Bills page in our Documentation.</TextButton>

        <Hiw>How It Works:</Hiw>
      </Description>

      <MainContentBody>
        <Content>
          <BillsM1 width={48} bgColor={theme.theme.colors.white4} color={theme.theme.colors.text} />
          <RightText>Click here to go to the liquidity provider. Select bill tokens and add liquidity.</RightText>
        </Content>

        <Content>
          <BillsM2 width={48} bgColor={theme.theme.colors.white4} color={theme.theme.colors.text} />
          <RightText>Select your preferenced bill, and click the buy button.</RightText>
        </Content>

        <Content>
          <BillsM3 width={48} bgColor={theme.theme.colors.white4} color={theme.theme.colors.text} />
          <RightText>Receive your NFT, claim vested tokens or trade the NFT.</RightText>
        </Content>
      </MainContentBody>
    </MainBody>
  )
}

export default BillsBody1
