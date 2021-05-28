import React from 'react'
import styled from 'styled-components'

export interface MultiplierProps {
  multiplier: string
}

const MultiplierWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: 36px;
  text-align: right;
  margin-right: 2px;
  font-weight: 700;
  font-family: Poppins;
  font-size: 12px;
`

const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 14px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 0;
    }
  }
`

const Multiplier: React.FunctionComponent<MultiplierProps> = ({ multiplier }) => {
  const displayMultiplier = multiplier ? multiplier.toString().toLowerCase() : '-'

  return (
    <Container>
      <MultiplierWrapper>{displayMultiplier}</MultiplierWrapper>
    </Container>
  )
}

export default Multiplier
