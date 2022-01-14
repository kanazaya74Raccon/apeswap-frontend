import React from 'react'
import styled, { keyframes } from 'styled-components'

const Spinner: React.FC = () => {
  return (
    <Container>
      <svg>
        <Spin
          r={60}
          cx={150}
          cy={75}
          fill="transparent"
          stroke="rgba(255, 179, 0, 1)"
          strokeWidth={3.5}
          strokeDashoffset={50}
          strokeDasharray={95}
        />
      </svg>
    </Container>
  )
}

const rotate = keyframes`
    0%{transform: rotate(360deg)};
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 100%;
`

const Spin = styled.circle`
  animation: 3s ${rotate} infinite;
  transform-origin: 50% 50%;
`

export default Spinner
