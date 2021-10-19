import React from 'react'
import styled from 'styled-components'
import { Text, Image } from '@apeswapfinance/uikit'

export interface PoolProps {
  token0?: string
  token1?: string
  isPair?: boolean
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
  width: 140px;
  height: 60px;
  background: rgb(255, 179, 0, 0.4);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`

const VaultHeading: React.FunctionComponent<PoolProps> = ({ token0, token1, isPair }) => {
  return (
    <Container>
      <StyledBackground>
        {isPair ? (
          <>
            <IconImage src={`/images/tokens/${token0}.svg`} alt={token0} width={50} height={50} />
            <IconImage src={`/images/tokens/${token1}.svg`} alt={token1} width={50} height={50} marginLeft="-10px" />
          </>
        ) : (
          <IconImage src={`/images/tokens/${token0}.svg`} alt={token0} width={50} height={50} marginLeft="5px" />
        )}
      </StyledBackground>
      <div>
        <Text fontSize="20px" bold>
          {isPair ? `${token0}-${token1}` : token0}
        </Text>
      </div>
    </Container>
  )
}

export default VaultHeading
