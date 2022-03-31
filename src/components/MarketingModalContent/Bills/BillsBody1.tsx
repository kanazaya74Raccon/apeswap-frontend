import React from 'react'
import ModalContent from './BillsModalContent'
import { StyledText, RightContent, StyledLendingM1Icon, Description, TextButton } from './styles'

const BillsBody1: React.FC = () => {
  return (
    <div style={{ background: 'red', height: '100%' }}>
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
      </Description>

      <ModalContent Icon={<StyledLendingM1Icon width={100} height={100} />}>
        <RightContent>
          <StyledText>Click here to go the liquidity provider. Select bill tokens and add liquidity.</StyledText>
        </RightContent>
      </ModalContent>
      <ModalContent Icon={<StyledLendingM1Icon width={100} height={100} />}>
        <RightContent>
          <StyledText>Select your preferenced bill, and click the buy button.</StyledText>
        </RightContent>
      </ModalContent>
      <ModalContent Icon={<StyledLendingM1Icon width={100} height={100} />}>
        <RightContent>
          <StyledText>Receive your NFT, claim vested tokens or trade the NFT.</StyledText>
        </RightContent>
      </ModalContent>
    </div>
  )
}

export default BillsBody1
