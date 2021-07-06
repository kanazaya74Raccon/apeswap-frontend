import React from 'react'
import styled from 'styled-components'
import { Text, Image } from '@apeswapfinance/uikit'

export interface PoolProps {
  stakeToken?: string
  earnToken?: string
  earnTokenImage?: string
}

const IconImage = styled(Image)`
  width: 24px;
  height: 24px;
  align: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 57px;
    height: 57px;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const StyledBackground = styled.div`
  width: 160px;
  height: 60px;
  background: rgb(255, 179, 0, 0.4);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
`

const PoolHeading: React.FunctionComponent<PoolProps> = ({ stakeToken, earnToken, earnTokenImage }) => {
  return (
    <Container>
      <StyledBackground>
        <IconImage src={`/images/tokens/${stakeToken}.svg`} alt={stakeToken} width={57} height={57} marginLeft='5px' />
        <IconImage src="/images/arrow.svg" alt="arrow" width={20} height={20}/>
        <IconImage src={`/images/tokens/${earnTokenImage || `${earnToken}.svg`}`} alt={earnToken} width={57} height={57} marginRight='5px'/>
      </StyledBackground>
      <div>
        <Text fontSize="20px" bold>
          {earnToken}
        </Text>
      </div>
    </Container>
  )
}

export default PoolHeading
