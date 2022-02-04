import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex } from '@apeswapfinance/uikit'
import { StyledCard, CardWrapper } from './styles'

const Cards: React.FC = () => {
  const { chainId } = useActiveWeb3React()

  return (
    <Flex alignItems="center" justifyContent="center" style={{ width: '100%' }}>
      <CardWrapper>
        <StyledCard />
        <StyledCard />
        <StyledCard />
        <StyledCard />
      </CardWrapper>
    </Flex>
  )
}

export default Cards
