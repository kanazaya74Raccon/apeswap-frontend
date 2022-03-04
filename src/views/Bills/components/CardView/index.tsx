import React from 'react'
import { Text } from '@apeswapfinance/uikit'
import BillCard from './BillCard'
import { Container } from '../styles'
import { BillCardsContainer } from './styles'

const CardView: React.FC = () => {
  return (
    <Container>
      <Text margin="20px 10px">Available Treasury Bills</Text>
      <BillCardsContainer>
        <BillCard />
        <BillCard />
        <BillCard />
        <BillCard />
      </BillCardsContainer>
    </Container>
  )
}

export default React.memo(CardView)
