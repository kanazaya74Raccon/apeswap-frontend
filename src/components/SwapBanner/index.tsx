import React from 'react'
import styled from 'styled-components'

const SwapBanner: React.FC = () => {
  return <StyledBanner />
}

const StyledBanner = styled.div`
  height: 120px;
  width: 360px;
  border-radius: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 680px;
  }  
  margin-bottom: 20px;
  background: url(images/harambenakamoto_single.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
`

export default SwapBanner
