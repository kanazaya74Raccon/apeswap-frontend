import React from 'react'
import styled from 'styled-components'
import { Text, Image } from '@apeswapfinance/uikit'

export interface FarmProps {
  label: string
  pid: number
  token0?: string
  token1?: string
  image?: string
}

const IconImage = styled(Image)`
  width: 24px;
  height: 24px;
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
  width: 150px;
  height: 60px;
  background: rgb(255, 179, 0, 0.4);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
`

const Farm: React.FunctionComponent<FarmProps> = ({ token0, token1, label, image }) => {
  return (
    <Container>
      <StyledBackground>
        <IconImage
          src={`/images/tokens/${image || `${token1}.svg`}`}
          alt={token1}
          width={50}
          height={50}
          marginLeft="7.5px"
        />
        <IconImage
          src={`/images/tokens/${token0}.svg`}
          alt={token0}
          width={25}
          height={25}
          marginLeft="-15px"
          marginTop="30px"
        />
        <IconImage src="/images/arrow.svg" alt="arrow" width={10} height={10} marginLeft="8px" marginRight="8px" />
        <IconImage src="/images/tokens/BANANA.svg" alt="banana" width={50} height={50} marginRight="7.5px" />
      </StyledBackground>
      <div>
        <Text fontSize="20px" fontWeight={800}>
          {label}
        </Text>
      </div>
    </Container>
  )
}

export default Farm
