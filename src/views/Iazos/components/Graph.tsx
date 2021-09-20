import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

interface GraphProps {
  size: number
}

const rotate = keyframes`
100% { transform: rotate(360deg); }
`

const GraphWrapper = styled.div<{ size: string; liquidity: number; forSale: number }>`
  display: flex;
  justify-content: center;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: 3px solid #dddddd;
  border-radius: 100%;
  transform: rotate(230deg);
  overflow: hidden;
  background-image: conic-gradient(
    #38a611 calc(${(props) => props.liquidity * 3.6}deg),
    #ffb300 0 calc(${(props) => props.forSale * 3.6}deg),
    #7a7a7a 0
  );
  //   animation: ${rotate} 3s;
`

const MiddleBorder = styled.div<{ size: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: 3px solid #dddddd;
  background: rgba(51, 51, 51, 1);
  box-sizing: border-box;
  border-radius: 100%;
  align-self: center;
  align-content: center;
  z-index: 1;
`

const Graph: React.FC<GraphProps> = ({ size }) => {
  return (
    <GraphWrapper size={`${size}px`} liquidity={20} forSale={80}>
      <MiddleBorder size={`${size * 0.815}px`} />
    </GraphWrapper>
  )
}

export default Graph
