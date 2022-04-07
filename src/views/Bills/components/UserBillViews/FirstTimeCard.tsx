import { Text } from '@apeswapfinance/uikit'
import BillsDiagram from 'components/MarketingModalContent/Bills/BillsDiagram'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React from 'react'
import {
  BillDiagramContainer,
  BillGifContainer,
  BillGifImage,
  DescriptionContainer,
  FirstTimeCardContainer,
} from './styles'

const FirstTimeCard: React.FC = () => {
  return (
    <FirstTimeCardContainer>
      <BillGifContainer>
        <BillGifImage />
      </BillGifContainer>
      <DescriptionContainer>
        <Text bold mb="0px" fontSize="22px">
          Information
        </Text>
        <Text fontSize="12px" style={{ lineHeight: '15px' }}>
          Treasury Bills allow users to purchase tokens at a discount in exchange for their liquidity provider (LP)
          tokens. Each Treasury Bill is a unique NFT that represents the purchased tokens, which vest over a certain
          amount of time.
          <br /> <br />
          For more info, visit the Treasury Bills page in our Documentation. <br /> <br />
          <Text fontSize="12px" bold>
            HOW IT WORKS:
          </Text>
        </Text>
        <BillDiagramContainer>
          <BillsDiagram />
        </BillDiagramContainer>
      </DescriptionContainer>
    </FirstTimeCardContainer>
  )
}

export default React.memo(FirstTimeCard)
