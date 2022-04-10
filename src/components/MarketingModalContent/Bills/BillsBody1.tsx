import React from 'react'
import useTheme from 'hooks/useTheme'
import { StyledText, Description, TextButton, Hiw, MainBody, MainContentBody } from './styles'
import BillsDiagram from './BillsDiagram'

const BillsBody1: React.FC = () => {
  return (
    <MainBody>
      <Description>
        <StyledText>
          Treasury Bills allow users to access tokens at a discount in exchange for their liquidity provider (LP)
          tokens.
        </StyledText>
        <StyledText>
          Each Treasury Bill is a unique NFT that represents the tokens, which vest over a certain amount of time.
        </StyledText>
        <TextButton>For more info, visit the Treasury Bills page in our Documentation.</TextButton>

        <Hiw>How It Works:</Hiw>
      </Description>
      <MainContentBody>
        <BillsDiagram />
      </MainContentBody>
    </MainBody>
  )
}

export default BillsBody1
