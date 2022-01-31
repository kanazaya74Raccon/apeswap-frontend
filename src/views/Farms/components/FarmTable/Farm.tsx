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
  width: 31.5px;
  height: 31.5px;
  // TODO: Add white border
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 36px;
    height: 36px;
  }
`

const PriorityIconImage = styled(IconImage)`
  z-index: 5;
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const StyledBackground = styled.div`
  width: 130px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
`

const Farm: React.FunctionComponent<FarmProps> = ({ token0, token1, label, image }) => {
  return (
    <Container>
      <StyledBackground>
        <PriorityIconImage
          src={`/images/tokens/${image || `${token1}.svg`}`}
          alt={token1}
          width={36}
          height={36}
          marginLeft="7.5px"
        />
        <IconImage
          src={`/images/tokens/${token0}.svg`}
          alt={token0}
          width={36}
          height={36}
          marginLeft="-15px"
        />
        <IconImage src="/images/arrow.svg" alt="arrow" width={10} height={10} marginLeft="8px" marginRight="8px" />
        <IconImage src="/images/tokens/BANANA.svg" alt="banana" width={50} height={50} marginRight="7.5px" />
      </StyledBackground>
      <div>
        <Text fontSize="20px" fontFamily="Titan One">
          {label}
        </Text>
      </div>
    </Container>
  )
}

export default Farm
