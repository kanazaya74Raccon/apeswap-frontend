import React from 'react'
import { StyledText, Description, TextButton, Hiw, MainBody, MainContentBody, StyledAnchor } from './styles'
import BillsDiagram from './BillsDiagram'

const BillsBody1: React.FC = () => {
  return (
    <MainBody>
      <Description>
        <StyledText>
          Treasury Bills allows users to access tokens at a discount in exchange for their liquidity provider (LP)
          tokens.
        </StyledText>
        <StyledText>
          Each Treasury Bill is a unique NFT that represents the contract and its respective reward tokens, which vest
          over a certain amount of time.
        </StyledText>
        <StyledAnchor
          href="https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/treasury-bills"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TextButton>For more info, visit the Treasury Bills page in our Documentation.</TextButton>
        </StyledAnchor>
        <Hiw>How It Works:</Hiw>
      </Description>
      <MainContentBody>
        <BillsDiagram />
      </MainContentBody>
    </MainBody>
  )
}

export default BillsBody1
